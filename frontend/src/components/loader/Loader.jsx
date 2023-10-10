import React from "react";
import loadingImg from "./loading.gif";

function Loader() {
  return (
    <div className="loader-wrap">
      <div className="loader">
        <img src={loadingImg} alt="Loading Animation" />
      </div>
    </div>
  );
}

export default Loader;
