import mongoose from "mongoose";

const delivery_status_Schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Status = mongoose.model("delivery-status", delivery_status_Schema);

export default Status;
