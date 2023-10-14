import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/loader/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import SmallLoader from "../../components/loader/SmallLoader";

export default function ProductEditScreen() {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: isUpdating, error: errorUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isUploading, error: uploadError }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, product?.name]);

  // FUNCTIONS

  async function handleSubmit(evt) {
    evt.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      brand,
      category,
      countInStock,
      description,
      image,
    };
    try {
      await updateProduct(updatedProduct);
      toast.success("Product updated");
      navigate("/admin/productlist");
    } catch (err) {
      console.error(err);
      if (errorUpdate) toast.error("Error while updating");
      toast.error(err.data?.message || err.message || err.error);
    }
  }

  async function handleUploadFile(evt) {
    const formData = new FormData();

    formData.append("image", evt.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      console.error(err);
      if (uploadError) toast.error("Error while uploading");
      toast.error(err.data?.message || err.message || err.error);
    }
  }

  // RENDERING

  if (isLoading) return <Loader />;

  if (error) {
    console.error(error);
    return (
      <Message variant="danger">
        {error.data?.message || error.error || error.message}
      </Message>
    );
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="my-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price" className="my-4">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          {/* IMAGE HERE */}
          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage}
            />
            <Form.Control
              type="file"
              label="Choose file"
              onChange={handleUploadFile}
            />
          </Form.Group>
          {isUploading && <SmallLoader />}

          <Form.Group controlId="brand" className="my-4">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="countInStock" className="my-4">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter name"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category" className="my-4">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description" className="my-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {isUpdating ? (
            <SmallLoader />
          ) : (
            <Button type="submit" variant="primary" className="my-2">
              Save
            </Button>
          )}
        </Form>
      </FormContainer>
    </>
  );
}
