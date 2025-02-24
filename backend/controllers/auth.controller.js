import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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