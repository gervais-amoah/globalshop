import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loader from "../components/loader/Loader";
import {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../slices/productsApiSlice";
import { toast } from "react-toastify";

function ProductListScreen() {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery();

  const [createProduct, { isLoading: loadingCreating, error: errorCreation }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete, error: errorDelete }] =
    useDeleteProductMutation();

  // FUNCTIONS
  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete the product ?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted");
      } catch (err) {
        console.error(err);
        toast.error(err.data?.message || err.error || err.message);
      }
    }
  }
  async function handleCreation() {
    if (window.confirm("Do you want to create a new product ?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        console.error(err);
        toast.error(err.data?.message || err.error || err.message);
      }
    }
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

        <Col className="text-end p-3">
          {loadingCreating ? (
            <>Creating sample product...</>
          ) : (
            <Button className="btn-sm btn-add" onClick={handleCreation}>
              <FaPlus style={{ margin: "0 0 3px 6px" }} />
              New Product
            </Button>
          )}
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
              <td>{product._id.substring(0, 20)}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button className="btn-sm mx-2" variant="warning">
                    <FaEdit color="white" />
                  </Button>
                </LinkContainer>
                {/* TODO Add small loader here */}
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
