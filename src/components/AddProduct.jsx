import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = ({ handleCloseModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    initialStock: "",
    origin: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ["Daily", "Seasonal"];

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\$?\d{0,3}(\.\d{0,2})?$/.test(value)) {
      setFormData({
        ...formData,
        price: value.replace(/^\$/, ""),
      });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPEG and PNG files are allowed.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        return;
      }
      setFormData({
        ...formData,
        image: file,
      });

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/create`,
        data
      );
      toast.success("Product created successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setFormData({
        name: "",
        price: "",
        initialStock: "",
        origin: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error creating product. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleCloseModal}
        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className=" p-2">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 p-2">
            <label htmlFor="name"> Price:</label>
            <input
              type="text"
              name="price"
              placeholder="$00.00"
              value={`$${formData.price}`}
              onChange={handlePriceChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="name"> Stock:</label>
            <input
              type="number"
              name="initialStock"
              placeholder="Stock"
              value={formData.initialStock}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 p-2">
            <label htmlFor="name"> Origin:</label>
            <input
              type="text"
              name="origin"
              placeholder="Origin"
              value={formData.origin}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            />
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="name">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className=" p-2">
          <label htmlFor="name">Image:</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading || !formData.image}
            className="w-1/2 bg-blue-500 text-white font-bold mt-4 mr-2 py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 transition"
          >
            {loading ? "Loading..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={handleCloseModal}
            className="w-1/2 bg-gray-500 text-white font-bold mt-4 ml-2 py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
        {imagePreview && (
          <div>
            <h3>Image Preview:</h3>
            <div className="flex justify-center items-center">
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
