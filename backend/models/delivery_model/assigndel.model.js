import mongoose from "mongoose";

const assignedDels = mongoose.Schema({
  owner_email: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  owner_addrs: {
    type: String,
    required: true,
  },
  owner_product: {
    type: String,
    required: true,
  },
  owner_category: {
    type: String,
    required: true,
  },
  total_price: {
    type: String,
    required: true,
  },
  delPersonEmail: {
    type: String,
    required: true,
  },
  delPersonName: {
    type: String,
    required: true,
  },
  delStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
});

const AssignedDels = mongoose.model("AssignedDels", assignedDels);
export default AssignedDels;
