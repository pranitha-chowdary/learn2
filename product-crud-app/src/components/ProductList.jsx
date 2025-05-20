import React, { useState, useEffect } from "react";
import axios from "axios";




const ProductList = ({ setEditingProduct, refresh }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("❌ Error fetching products:", err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("🗑️ Product deleted!");
    } catch (err) {
      console.error("❌ Error deleting product:", err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  return (
    <div>
      <h2>📦 Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: "10px" }}>
            <strong>{p.name}</strong> - ₹{p.price}
            <br />
            <img src={p.image} alt={p.name} width="100" />
            <br />
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
            <button onClick={() => setEditingProduct(p)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductList;
