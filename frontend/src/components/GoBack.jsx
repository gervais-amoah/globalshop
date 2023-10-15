import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function GoBack({ to = "/" }) {
  return (
    <Link className="btn btn-light my-3" to={to}>
      <FaArrowLeft /> Go Back
    </Link>
  );
}
