import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaEye, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/loader/Loader";

function UserListScreen() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  function handleDelete(id) {}

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
      <h1>Orders</h1>
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
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                {" "}
                <a href={`mailto:${user.email}`}>{user.email}</a>{" "}
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
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button className="btn-sm mx-2" variant="warning">
                    <FaEdit color="white" />
                  </Button>
                </LinkContainer>
                {/* TODO Add small loader here */}

                {!user.isAdmin && (
                  <Button
                    className="btn-sm"
                    variant={user.isAdmin ? "secondary" : "danger"}
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserListScreen;
