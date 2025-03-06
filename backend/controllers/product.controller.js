import Product from "../models/product.model.js";

export const createProduct = async (req,res) => {
    const { prd_name, prd_brand, price, stock, cetegory, img_url } = req.body;

    if (!prd_name || !prd_brand || !price || !stock || !cetegory || !img_url) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
      }
    
      try {
        
        const newProduct = new Product({ prd_name, prd_brand, price, stock, cetegory, img_url });
    
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully" });
    
      } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}