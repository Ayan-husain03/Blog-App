import React, { useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm block text-left my-2 font-medium"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`block w-full my-2  border-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm focus:ring-opacity-50 p-2 ${className}`}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
