import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    priceInCents: "",
    initialStock: "",
    origin: "",
    category: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPEG and PNG files are allowed.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB.");
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
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("priceInCents", formData.priceInCents);
    data.append("initialStock", formData.initialStock);
    data.append("origin", formData.origin);
    data.append("category", formData.category);
    data.append("image", formData.image);

    try {
      const response = await fetch(
        `${process.env.VITE_API_URL}/produt/create`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      const result = await response.json();
      alert("Product created successfully!");
      setFormData({
        name: "",
        priceInCents: "",
        initialStock: "",
        origin: "",
        category: "",
        image: null,
      });
      setImagePreview(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating product. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Product Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="name"> Price:</label>
        <input
          type="number"
          name="priceInCents"
          placeholder="Price in Cents"
          value={formData.priceInCents}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="name"> Stock:</label>
        <input
          type="number"
          name="initialStock"
          placeholder="Initial Stock"
          value={formData.initialStock}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="name"> Origin:</label>
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={formData.origin}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="name">Category:</label>
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="name">Image:</label>
        {imagePreview && (
          <div>
            <h3>Image Preview:</h3>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <br />
        <button type="submit" disabled={isLoading || !formData.image}>
          {isLoading ? "Loading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
