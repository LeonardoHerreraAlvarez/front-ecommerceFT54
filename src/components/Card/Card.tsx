import { IProduct } from "@/types";
import React from "react";

const Card: React.FC<IProduct> = ({ image, name, price }) => {
  return (
    <div className="max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex">
      <div className="w-1/2 h-full">
        <img
          className="w-full h-full object-cover rounded-l-lg"
          src={image}
          alt={`${name} product image`}
        />
      </div>

      <div className="w-1/2 p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
            {name}
          </h1>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
        </div>

        <button
          className="w-2/3 mx-auto mt-3 text-white bg-[#1A2238] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-semibold rounded text-base px-4 py-1.5 text-center dark:bg-gray dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          See details
        </button>
      </div>
    </div>
  );
};

export default Card;
