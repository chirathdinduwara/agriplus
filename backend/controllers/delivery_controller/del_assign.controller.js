import AssignedDels from "../../models/delivery_model/assigndel.model.js";

export const assignDelivery = async (req, res) => {
  const {
    owner_name,
    owner_addrs,
    owner_product,
    owner_category,
    total_price,
    delPersonEmail,
    delPersonName,
    delStatus
  } = req.body;

  if (
    !owner_name ||
    !owner_addrs ||
    !owner_product ||
    !owner_category ||
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
      owner_category,
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
    await Delivery.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Delivery Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete Failed!" });
  }
};
