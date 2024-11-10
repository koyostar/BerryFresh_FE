import React from "react";

const ProductCard = ({ product, onAddToCart, toProperCase }) => {
  return (
    <div className="bg-amber-100 p-4 border-4 border-white rounded-lg font-bold">
      <div className="flex justify-center items-center">
        <img src={product.image} alt={product.name} className="m-2 h-48 w-48" />
      </div>
      <h3 className="">{toProperCase(product.name)}</h3>
      <p className="text-sm font-normal text-gray-400 mb-2">
        Origin: {product.origin}
      </p>
      <p>${product.price.toFixed(2)}</p>
      <button
        className="bg-amber-500 text-white shadow-md rounded-md p-2 m-2 hover:bg-slate-200  hover:text-black"
        disabled={product.status === "Sold Out"}
        onClick={() => onAddToCart(product)}
      >
        {product.status === "Sold Out" ? "Sold Out" : "Add to Cart"}
      </button>
      <p className="text-sm text-gray-500 mb-2">
        Stock: {product.currentStock}
      </p>
      {product.status === "Sold Out" ? (
        <span className="text-red-500 ">Sold Out</span>
      ) : product.status === "Running Low" ? (
        <p className="text-sm text-yellow-500">Running Low</p>
      ) : (
        <p className="text-sm text-green-500">In Stock</p>
      )}
    </div>
  );
};

export default ProductCard;
