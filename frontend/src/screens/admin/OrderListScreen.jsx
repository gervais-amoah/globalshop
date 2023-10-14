import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/loader/Loader";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import { shortenString } from "../../utils/tableUtils";

function OrderListScreen() {
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();

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
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id}>
              <td>{shortenString(order._id)}</td>
              <td>{order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
              </td>
              <td>
                <LinkContainer to={`/order/${order._id}`}>
                  <Button className="btn-sm" variant="light">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default OrderListScreen;
