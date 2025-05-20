import React, { useState } from 'react';
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import 'normalize.css';

function App() {
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const [refresh, setRefresh] = useState(false); // To trigger reload

  return (
    <div>
      <h1>🛒 Product CRUD App</h1>
      <ProductForm
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        onSaved={() => setRefresh(!refresh)}
      />
      <hr />
      <ProductList
        setEditingProduct={setEditingProduct}
        refresh={refresh}
      />
    </div>
  );
}

export default App;
