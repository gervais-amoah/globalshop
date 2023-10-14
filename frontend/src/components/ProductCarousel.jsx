import React from "react";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import SmallLoader from "./loader/SmallLoader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductCarousel() {
  const { data: topProducts, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <SmallLoader />;
  if (error)
    return (
      <Message>{error.error || error.message || error.data.message}</Message>
    );

  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {topProducts.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
