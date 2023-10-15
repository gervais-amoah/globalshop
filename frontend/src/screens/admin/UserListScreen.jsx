import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import Loader from "../../components/loader/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";

import SmallLoader from "../../components/loader/SmallLoader";
import { shortenString } from "../../utils/tableUtils";

function UserListScreen() {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: isDeleting, error: errorDelete }] =
    useDeleteUserMutation();

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete the user?")) {
      try {
        const res = await deleteUser(id);
        refetch();
        toast.success(res?.data?.message);
      } catch (err) {
        toast.error(
          err.message ||
            err.error ||
            err.data?.error ||
            errorDelete.error?.data?.message
        );
      }
    }
  }

  if (error) {
    console.error(error);

    return (
      <Message variant="danger">
        {error.data?.message || error.error || error.message}
      </Message>
    );
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="title">Users</h1>
      <div className="table-container centered">
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE NUMBER</th>
              <th>JOINED</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{shortenString(user._id)}</td>
                <td>{shortenString(user.name)}</td>
                <td>
                  {" "}
                  <a href={`mailto:${user.email}`} className="table-contact">
                    {user.email}
                  </a>{" "}
                </td>
                <td>{user.phoneNumber ?? "Not provided"}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "darkgreen" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {isDeleting ? (
                    <SmallLoader />
                  ) : (
                    <>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button className="btn-sm mx-2" variant="warning">
                          <FaEdit color="white" />
                        </Button>
                      </LinkContainer>

                      {!user.isAdmin && (
                        <Button
                          className="btn-sm"
                          variant={user.isAdmin ? "secondary" : "danger"}
                          onClick={() => handleDelete(user._id)}
                        >
                          <FaTrash />
                        </Button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default UserListScreen;
