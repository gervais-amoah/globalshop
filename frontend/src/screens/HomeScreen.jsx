import React from "react";
import { Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import Product from "../components/Product";
import Loader from "../components/loader/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

function HomeScreen() {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <Message variant="danger">{error?.data?.message || error?.error}</Message>
    );

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light my-3">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      <h1>Latest Products</h1>
      <Row>
        {!data.products.length ? (
          <p>No Product</p>
        ) : (
          data.products?.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
      <Paginate pages={data.pages} page={data.page} keyword={keyword} />
    </>
  );
}

export default HomeScreen;
