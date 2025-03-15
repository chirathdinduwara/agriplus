import mongoose from "mongoose";

const delivery_status_Schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ["package ready", "inprogress", "complete order"],
  },
});

const Status = mongoose.model("delivery-status", delivery_status_Schema);

export default Status;
