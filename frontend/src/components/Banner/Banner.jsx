import React from "react";
import "./Banner.css"; // Create a CSS file for your custom styles

const Banner = () => {
  return (
    <div class="banner">
      <div class="overlay"></div>
      <div class="banner-content">
        <h1 className="banner-title">Welcome to Our Company</h1>
        <p className="banner-subtitle">
          We are a leading company in providing excellent services.
        </p>
      </div>
    </div>
  );
};

export default Banner;
