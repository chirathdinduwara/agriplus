import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DelPerson from "../../models/delivery_model/del_person.model.js";
import AssignedDels from "../../models/delivery_model/assigndel.model.js";

export const registerDelPerson = async (req, res) => {
  const { email, full_name, address, phone, password, vehicleNumber } =
    req.body;

  if (
    !email ||
    !full_name ||
    !address ||
    !phone ||
    !password ||
    !vehicleNumber
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await DelPerson.findOne({ email });
    if (userExists)
      return res
        .status(200)
        .json({ success: false, message: "User already exists!" });

    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Please enter at least 8 characters as password!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new DelPerson({
      email,
      full_name,
      address,
      phone,
      vehicleNumber,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const delPersonLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const delPerson = await DelPerson.findOne({ email });
    if (!delPerson)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, delPerson.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: delPerson._id, name: delPerson.full_name, email: delPerson.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
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

//asign deliveries
export const assignDelivery = async (req, res) => {
  const {
    owner_name,
    owner_addrs,
    owner_product,
    total_price,
    delPersonEmail,
    delPersonName,
    delStatus,
  } = req.body;

  if (
    !owner_name ||
    !owner_addrs ||
    !owner_product ||
    !total_price ||
    !delPersonEmail ||
    !delPersonName
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    const assignDelivery = new AssignedDels({
      owner_name,
      owner_addrs,
      owner_product,
      total_price,
      delPersonEmail,
      delPersonName,
      delStatus: "Assigned",
    });
    await assignDelivery.save();
    res.status(201).json({ success: true, message: "Assigned successfully" });
  } catch (err) {
    console.error("Error while assigning delivery:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAssignDeliveries = async (req, res) => {
  try {
    const delivery = await AssignedDels.find(); // Fetch all delivery from the database
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateAssignDeliveries = async (req, res) => {
  const { id } = req.params;
  const { delStatus } = req.body;

  try {
    const delivery = await AssignedDels.findByIdAndUpdate(
      id,
      { delStatus }, // Only update the delStatus field
      { new: true } // Return the updated delivery
    );
    if (!delivery) {
      return res
        .status(404)
        .json({ success: false, message: "Delivery not found" });
    }
    res.status(200).json({ success: true, delivery });
  } catch (err) {
    console.error("Error updating delivery:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteAssignDelivery = async (req, res) => {
  const { id } = req.params;
  try {
    await AssignedDels.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Delivery Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};
