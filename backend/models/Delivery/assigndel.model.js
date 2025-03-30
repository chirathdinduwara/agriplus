import mongoose from "mongoose";

const assignedDelsSchema = mongoose.Schema({
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

const AssignedDels = mongoose.model("AssignedDel", assignedDelsSchema);
export default AssignedDels;
