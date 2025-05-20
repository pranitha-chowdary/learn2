import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ editingProduct, setEditingProduct, onSaved }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.image) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (product._id) {
        // Update
        await axios.put(`http://localhost:3000/api/products/${product._id}`, product);
        alert("✅ Product updated!");
      } else {
        // Create
        await axios.post("http://localhost:3000/api/products", product);
        alert("✅ Product created!");
      }

      setProduct({ name: "", price: "", image: "" });
      setEditingProduct(null);
      onSaved(); // trigger refresh
    } catch (err) {
      console.error("❌ Error saving product:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product._id ? "✏️ Edit Product" : "➕ Add Product"}</h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <br />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <br />
      <input
        type="text"
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <br />
      <button type="submit">{product._id ? "Update" : "Create"}</button>
    </form>
  );
};

export default ProductForm;
