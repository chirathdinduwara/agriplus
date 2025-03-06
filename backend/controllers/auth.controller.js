import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

//customer
export const registerUser = async (req,res) => {
    const { email, full_name, address, phone, password } = req.body;

    if (!email || !full_name || !address || !phone || !password) {
        return res.status(400).json({ success: false, message: "Please Provide All Fields" });
      }
    
      try {
        let userExists = await User.findOne({ email });
        if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });
    
        if (password.length < 8) {
          return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, full_name, address, phone, password: hashedPassword });
    
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    
      } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
}

//admin
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id, name: admin.full_name, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, token });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const registerAdmin = async (req,res) => {
  const { email, full_name, phone, password } = req.body;

  if (!email || !full_name || !phone || !password) {
      return res.status(400).json({ success: false, message: "Please Provide All Fields" });
    }
  
    try {
      let userExists = await Admin.findOne({ email });
      if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });
  
      if (password.length < 8) {
        return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new Admin({ email, full_name, phone, password: hashedPassword });
  
      await newAdmin.save();
      res.status(201).json({ success: true, message: "User registered successfully" });
  
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
}