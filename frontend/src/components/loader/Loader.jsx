import React from "react";
import loadingImg from "./loading.gif";

function Loader() {
  return (
    <div className="loader">
      <img src={loadingImg} alt="Loading Animation" />
    </div>
  );
}

export default Loader;
