import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../models/user_model/admin.model.js";
import User from "../../models/user_model/user.model.js";
import Staff from "../../models/user_model/staff.model.js";
import UserActivity from "../../models/user_model/user_activity.model.js";
import moment from "moment";

//customer
export const registerUser = async (req, res) => {
  const { email, full_name, address, phone, password } = req.body;

  if (!email || !full_name || !address || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(200)
        .json({ success: false, message: "User already exists!" });

    if (phone.length < 10) {
      return res
        .status(200)
        .json({ success: false, message: "Phone number contain 10 numbers!" });
    }

    if (password.length < 8) {
      return res.status(200).json({
        success: false,
        message: "Please enter at least 8 characters as password!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      full_name,
      address,
      phone,
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

// export const userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid email or password" });

//     const token = jwt.sign(
//       { id: user._id, name: user.full_name, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ success: true, token });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.full_name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize

    const existingActiveSession = await UserActivity.findOne({
      user: user._id,
      date: today,
      logoutAt: null,
    });

    if (!existingActiveSession) {
      await UserActivity.create({
        user: user._id,
        date: today,
        loginAt: new Date(),
      });
    }

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const userLogout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const activity = await UserActivity.findOne({
      user: userId,
      date: today,
      logoutAt: null,
    }).sort({ loginAt: -1 });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message:
          "No active login session found for logout. You may already be logged out.",
      });
    }

    activity.logoutAt = new Date();
    await activity.save();

    res.status(200).json({ success: true, message: "Logout time recorded" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllUserActivities = async (req, res) => {
  try {
    const activities = await UserActivity.find().populate(
      "user",
      "full_name email"
    );
    res.status(200).json({ success: true, activities });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const clearAllUserActivities = async (req, res) => {
  try {
    await UserActivity.deleteMany({});
    res
      .status(200)
      .json({ success: true, message: "All user activities cleared" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to clear user activities" });
  }
};

export const deleteActivitiesByEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const result = await UserActivity.deleteMany({ user: user._id });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} activity logs for ${email}`,
    });
  } catch (err) {
    console.error("Error deleting activities:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, address, phone, password } = req.body;

  try {
    let updatedData = { full_name, email, address, phone };

    // Hash the password only if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      updatedData.password = await bcrypt.hash(password, salt); // Hash password
    }

    // Update user data
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//admin
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: admin._id, name: admin.full_name, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const registerAdmin = async (req, res) => {
  const { email, full_name, phone, password } = req.body;

  if (!email || !full_name || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await Admin.findOne({ email });
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
    const newAdmin = new Admin({
      email,
      full_name,
      phone,
      password: hashedPassword,
    });

    await newAdmin.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//Staff
export const staffLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ email });
    if (!staff)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign(
      { id: staff._id, name: staff.full_name, email: staff.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const registerStaff = async (req, res) => {
  const { email, full_name, phone, password } = req.body;

  if (!email || !full_name || !phone || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide All Fields" });
  }

  try {
    let userExists = await Staff.findOne({ email });
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
    const newStaff = new Staff({
      email,
      full_name,
      phone,
      password: hashedPassword,
    });

    await newStaff.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const allStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, password } = req.body;

  try {
    let updatedData = { full_name, email, phone };

    // Hash the password only if it's provided
    if (password) {
      const salt = await bcrypt.genSalt(10); // Generate salt
      updatedData.password = await bcrypt.hash(password, salt); // Hash password
    }

    // Update user data
    const user = await Staff.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getStaff = async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id);
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
