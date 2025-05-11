import Dm from "../../../models/Delivery/Dm_model/Dm.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const DmLogin = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find user by email
    const user = await Dm.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.full_name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      success: true,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const registerDm = async (req, res) => {
  const { email, full_name, phone, password } = req.body;

  // Validate required fields
  if (!email || !full_name || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    const userExists = await Dm.findOne({ email });
    if (userExists) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists!" });
    }

    if (password.length < 8) {
      return res
        .status(200)
        .json({
          success: false,
          message: "Please enter at least 8 characters as password!",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDm = new Dm({
      email,
      full_name,
      phone,
      password: hashedPassword,
    });

    await newDm.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
