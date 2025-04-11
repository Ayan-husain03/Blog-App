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
        {label && <label htmlFor={id} className="block mb-2 pl-2 text-gray-700">{label}</label>}
        <input
            type={type}
            id={id}
            className={`${className} px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            ref={ref}
            placeholder={placeholder}
            {...props}
        />
  </div>;
});

export default Input;
