import mongoose from 'mongoose';
import Product from '../models/product.model.js';



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in getProducts:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
    }

export const createProduct = async (req, res) => {
  const product = req.body;
  console.log("📦 Incoming product:", product); // <--- Add this!

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: 'Product data is required' });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    console.log("✅ Product saved to DB:", newProduct); // <--- Add this!
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("❌ Error in createProduct:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }

    
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
 if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
        console.error("Error in updateProduct:", error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("Delete request for ID:", id); // Add this
   if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
