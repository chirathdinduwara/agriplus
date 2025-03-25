import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DelPerson from "../../models/delivery_model/delPerson.model.js";

export const delPersonLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const delPerson = await DelPerson.findOne({ email });
      if (!delPerson) return res.status(400).json({ success: false, message: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, delPerson.password);
      if (!isMatch) return res.status(400).json({ success: false, message: "Invalid email or password" });
  
      const token = jwt.sign({ id: delPerson._id, name: delPerson.full_name, email: delPerson.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ success: true, token });
  
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  export const registerDelPerson = async (req, res) => {
    const { email, full_name, address, phone, password } = req.body;
  
    if (!email || !full_name || !address || !phone || !password) {
      return res.status(400).json({ success: false, message: "Please Provide All Fields" });
    }
  
    try {
      let userExists = await DelPerson.findOne({ email });
      if (userExists) return res.status(200).json({ success: false, message: "User already exists!" });
  
      if (password.length < 8) {
        return res.status(200).json({ success: false, message: "Please enter at least 8 characters as password!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new DelPerson({ email, full_name, address, phone, password: hashedPassword });
  
      await newUser.save();
      res.status(201).json({ success: true, message: "User registered successfully" });
  
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  export const getDelPersons = async (req, res) => {
    try {
      const delPerson = await DelPerson.find();
      res.status(200).json({ success: true, delPerson });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
  export const deleteDelPerson = async (req, res) => {
    const { id } = req.params;
    try {
      await DelPerson.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "User Deleted" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Delete Failed!" });
    }
  };