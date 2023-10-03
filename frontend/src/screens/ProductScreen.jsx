import React from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

import Rating from "../components/Rating";

function ProductScreen() {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading) return <h2>Losding...</h2>;
  if (isError) return <div>{error?.data?.message || error?.error}</div>;
  if (!product) return <p>Opps, the product does not exist (anymore?)</p>;

  return (
    <>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {/* Qty Select */}
              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      {product.countInStock}
                      {/* <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control> */}
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  // onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
