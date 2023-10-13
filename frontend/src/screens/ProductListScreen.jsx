import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import { useGetAllProductsQuery } from "../slices/productsApiSlice";

function ProductListScreen() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();

  // FUNCTIONS
  function handleDelete(id) {
    console.log("delete", id);
  }

  // RENDERING

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
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>

        <Col className="text-end">
          <Button className="btn-sm m-3 btn-add">
            <FaPlus style={{ margin: "0 0 3px 6px;" }} />
            New Product
          </Button>
        </Col>
      </Row>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}`}>
                  <Button className="btn-sm mx-2" variant="warning">
                    <FaEdit color="white" />
                  </Button>
                </LinkContainer>
                <Button
                  className="btn-sm"
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default ProductListScreen;
