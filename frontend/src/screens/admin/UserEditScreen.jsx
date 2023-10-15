import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import GoBack from "../../components/GoBack";
import Message from "../../components/Message";
import Loader from "../../components/loader/Loader";
import SmallLoader from "../../components/loader/SmallLoader";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserDetailsMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        userId,
        name,
        email,
        isAdmin,
        phoneNumber,
      });

      if (res.error) {
        if (res.error.status === 500) {
          console.error(res.error);
          toast.error("Something went wrong. Maybe the email already exists.");
          throw new Error(res.data.message);
        }

        console.error(res.error);
        toast.error(res.error);
        toast.error(res.error);
        throw new Error(res.error);
      }

      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <GoBack to="/admin/userlist" />
      <FormContainer>
        <h1>Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            {isUpdating ? (
              <SmallLoader />
            ) : (
              <Button type="submit" variant="primary">
                Update
              </Button>
            )}
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
