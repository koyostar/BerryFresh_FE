import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { SyncLoader } from "react-spinners";

const Shop = ({ onAddToCart, toProperCase }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/all`
        );

        const sortedProducts = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setProducts(sortedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <SyncLoader />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              toProperCase={toProperCase}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
