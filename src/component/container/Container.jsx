import React from "react";

function Container({ children, className = "" }) {
  return (
    <div className={`w-full max-auto text-white ${className}`}>{children}</div>
  );
}

export default Container;
