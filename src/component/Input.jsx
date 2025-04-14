import React from "react";
import { useId } from "react";

const Input = React.forwardRef(({
    label,
    type = "text",
    placeholder = "",
    className = "",
    ...props
}, ref) => {
  const id = useId();
    return <div className="w-full">
        {label && <label htmlFor={id} className="block font-semibold mb-2 text-left pl-2 text-gray-700">{label}</label>}
        <input
            type={type}
            id={id}
            className={`${className} px-4 w-full py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ref={ref}
            placeholder={placeholder}
            {...props}
        />
  </div>;
});

export default Input;
