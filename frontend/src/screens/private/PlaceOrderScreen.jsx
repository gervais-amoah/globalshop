import React, { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../../components/CheckoutSteps";
import Message from "../../components/Message";
import SmallLoader from "../../components/loader/SmallLoader";
import { clearCartItems } from "../../slices/cartSlice";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";

// FAKE ADDRESS
const fakeAddress = {
  address: ":",
  city: "Lomé",
  postalCode: "0000",
  country: "TOGO",
};

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [createOrder, { isLoading: isPlacingOrder, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress?.address, navigate]);

  // TODO SET THE ADDRESS AND PAYMENT METHOD
  async function handlePlaceOrder(evt) {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: fakeAddress, // cart.shippingAddress,
        paymentMethod: "-", // cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      if (error) toast.error("Something went wrong. Try again later");
      console.error(err);
      toast.error(err);
    }
  }

  return (
    <>
      <CheckoutSteps step1 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2 className="small-title">Shipping</h2>
              <p>
                <strong>Address: </strong>
                Togo
                {/* {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country} */}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="small-title">Payment</h2>
              <strong>Method: </strong> {"-"}
              {/* {cart.paymentMethod} */}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 className="small-title">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={item._id || index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          <span className="text-grey">
                            {item.qty} x ${item.price} ={" "}
                          </span>
                          ${Number(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">
                    {JSON.stringify(error.data?.message)}
                  </Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                {isPlacingOrder ? (
                  <SmallLoader />
                ) : (
                  <Button
                    type="button"
                    className="btn-block"
                    onClick={handlePlaceOrder}
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default PlaceOrderScreen;
