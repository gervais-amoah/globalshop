import React from "react";
import { Helmet } from "react-helmet-async";

function Meta({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
}

Meta.defaultProps = {
  title: "Welcome to GlobalShop",
  description:
    "We provide the best products for cheap and from anywhere to anywhere",
  keywords:
    "electronics, buy electronics, chep electronics, industrial machinery",
};

export default Meta;
