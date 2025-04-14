import React from "react";

function Logo({ className = "", width = 100, ...props}) {
  return (
    <div>
      <img
        src="\icon\BlogVerse.png"
        alt="Logo"
        width={width}
        className={` mx-auto  ${className} ${props}`}
      />
    </div>
  );
}

export default Logo;
