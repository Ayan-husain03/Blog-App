import React from "react";

function CardLoader() {
  return (
    <>
      <div className="relative animate-pulse">
        <div className="w-full h-60 bg-gray-200 rounded-t-xl"></div>
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
          <div className="h-7 w-7 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-b-lg">
        <div className="h-10 w-1/2 bg-gray-200 mb-2"></div>
        <div className="h-4 w-1/4 bg-gray-200 mb-4"></div>
        <div className="h-1 w-full bg-gray-200 my-4"></div>
        <div className="h-4 w-full bg-gray-200 mb-1"></div>
        <div className="h-4 w-2/3 bg-gray-200 mb-1"></div>
        <div className="h-4 w-1/2 bg-gray-200 mb-1"></div>
        <div className="h-4 w-3/4 bg-gray-200"></div>
      </div>
    </>
  );
}

export default CardLoader;
