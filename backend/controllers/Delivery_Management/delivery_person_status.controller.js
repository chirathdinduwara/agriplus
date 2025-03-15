import DeliveryStatus from "../../models/Delivery_Management/delivery_person_status.model.js";

export const updateDeliveryStatus = async (req, res) => {
  const { email, status } = req.body;

  if (!email || !status) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please provide both email and status",
      });
  }

  const validStatuses = ["package ready", "inprogress", "complete order"];
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid status value" });
  }

  try {
    // Create or update the status
    const updatedStatus = await DeliveryStatus.findOneAndUpdate(
      { email },
      { status },
      { new: true, upsert: true } 
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Delivery status updated successfully",
        updatedStatus,
      });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
