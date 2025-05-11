import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  loginAt: { type: Date },
  logoutAt: { type: Date },
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);
export default UserActivity;
