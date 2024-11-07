import React from "react";

const ProductCard = ({ product, onAddToCart, toProperCase }) => {
  return (
    <div className="bg-black p-4 rounded-lg">
      <div className="">
        <img src={product.image} alt={product.name} className="m-2 h-48 w-48" />
      </div>
      <h3 className="font-bold">{toProperCase(product.name)}</h3>
      <p className="text-sm text-gray-500 mb-2">Origin: {product.origin}</p>
      <p>${product.price}</p>
      <button
        className="bg-slate-600 rounded-md p-2 m-2 hover:bg-slate-200  hover:text-black"
        disabled={product.status === "Sold Out"}
        onClick={() => onAddToCart(product)}
      >
        {product.status === "Sold Out" ? "Sold Out" : "Add to Cart"}
      </button>
      <p className="text-sm text-gray-500 mb-2">
        Stock: {product.currentStock}
      </p>
      {product.status === "Sold Out" ? (
        <span className="text-red-500 font-bold">Sold Out</span>
      ) : product.status === "Running Low" ? (
        <p className="text-sm text-yellow-500">Running Low</p>
      ) : (
        <p className="text-sm text-green-500">In Stock</p>
      )}
    </div>
  );
};

export default ProductCard;
