import React from "react";
import loadingImg from "./small_loading.gif";

function SmallLoader() {
  return (
    <div className="loader__small">
      <img src={loadingImg} alt="Loading..." />
    </div>
  );
}

export default SmallLoader;
