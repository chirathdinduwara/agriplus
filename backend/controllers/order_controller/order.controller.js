import Order from "../../models/order_model/order.model.js";

export const createOrder = async (req, res) => {
  const {
    name,
    Shipping_addrs,
    prd_name,
    prd_brand,
    item_price,
    cetegory,
    quantity,
    tot_price,
    payment_type,
  } = req.body;

  // if (
  //   !name ||
  //   !Shipping_addrs ||
  //   !prd_name ||
  //   !prd_brand ||
  //   !item_price ||
  //   !cetegory ||
  //   !quantity ||
  //   !tot_price ||
  //   !payment_type
  // ) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Please Provide All Fields" });
  // }

  try {
    const newOrder = new Order({
      name,
      Shipping_addrs,
      prd_name,
      prd_brand,
      item_price,
      cetegory,
      quantity,
      tot_price,
      payment_type,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ success: true, message: "Order added successfully" });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
