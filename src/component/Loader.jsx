import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center">
      <HashLoader color="#000" />
    </div>
  );
}

export default Loader;
