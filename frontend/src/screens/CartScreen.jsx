import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems, itemsQty = 0 } = cart;

  function addToCartHandler(item, qty) {
    dispatch(addToCart({ ...item, qty, override: true }));
  }

  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }

  function checkoutHandler() {
    navigate("/login?redirect=/placeorder");
  }

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }} className="subtitle">
          Sopping Cart
        </h1>
        {itemsQty > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${item._id}`} className="underlined">
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Message>
            Your cart is empty.{" "}
            <Link to="/" className="underlined">
              Continue shopping
            </Link>
          </Message>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({itemsQty}) item{itemsQty > 2 ? "s" : ""}
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={!itemsQty}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
