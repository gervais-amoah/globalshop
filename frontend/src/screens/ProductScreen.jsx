import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../slices/cartSlice";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";

import Message from "../components/Message";
import Rating from "../components/Rating";
import Loader from "../components/loader/Loader";
import SmallLoader from "../components/loader/SmallLoader";

function ProductScreen() {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: isReviewing }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // FUCTIONS

  function addToCartHandler() {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Product added", { closeOnClick: true, autoClose: 2000 });
  }

  async function handleAddReview(evt) {
    evt.preventDefault();

    try {
      const res = await createReview({ productId, rating, comment });
      const errorMessage =
        res.data?.message ||
        res.error?.message ||
        res.error?.data?.message ||
        "Something went wrong. Please try again later";

      if (res.status === 400 || res.error) {
        console.error(errorMessage);
        toast.error(errorMessage);
      } else {
        refetch();
        toast.success("Product reviewed");
      }

      setRating(1);
      setComment("");
    } catch (err) {
      console.error(err.message || err);
      toast.error(err.message || err);
    }
  }

  // RENDERING

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Message variant="danger">{error?.data?.message || error?.error}</Message>
    );
  if (!product)
    return <Message>Opps, the product does not exist (anymore?)</Message>;

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
                      {/* {product.countInStock} */}
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {product.reviews.length === 0 && <Message>No Review</Message>}
          <ListGroup variant="flush">
            {product.reviews?.map((review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <h2>Add Your Review</h2>

              {userInfo ? (
                <Form onSubmit={handleAddReview}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-2">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>

                  {isReviewing ? (
                    <SmallLoader />
                  ) : (
                    <Button
                      type="submit"
                      disabled={isReviewing}
                      variant="primary"
                    >
                      Add review
                    </Button>
                  )}
                </Form>
              ) : (
                <Message>
                  Please{" "}
                  <Link className="underlined" to="/login">
                    sign in
                  </Link>{" "}
                  to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default ProductScreen;
