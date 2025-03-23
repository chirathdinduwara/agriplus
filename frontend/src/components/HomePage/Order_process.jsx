import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../../css/HomePage/Order_process.css";
import "../../css/HomePage/product.css";
import Delivery from "../../assets/images/graphics/delivery.jpg";

export default function OrderProcess() {
  const location = useLocation();
  const product = location.state;

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [paymentType, setPaymentType] = useState("");
  const totalPrice = product.price * quantity;

  const nextStep = () => step < 3 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmOrder = () => {
    alert("Order Confirmed!");
  };

  const handlePaymentTypeChange = (e) => {
    const value = e.target.value;
    setPaymentType(value);
    if (value === "cash") {
      setStep(3);
    } else {
      setStep(2);
    }
  };

  return (
    <>
      <div className="prd-head"></div>
      <div id="main-container">
        <motion.div
          id="column_left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 && (
            <div>
              <p id="p_addr">Name</p>
              <input name="name" id="q_input" type="text" />
              <br />
              <br />
              <p id="p_addr">Shipping Address</p>
              <textarea
                name="shipping_addr"
                id="shipping_addr"
                maxLength={200}
              ></textarea>
              <p id="p_qty">Item Quantity</p>
              <input
                id="q_input"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={product.stock}
              />
              <p id="p_details">Payment Type</p>
              <select
                id="drop_down"
                value={paymentType}
                onChange={handlePaymentTypeChange}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          )}

          {step === 2 && paymentType === "card" && (
            <div>
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Expiry Date (MM/YY)" />
              <input type="text" placeholder="CVV" />
            </div>
          )}

          {step === 3 && (paymentType === "card" || paymentType === "cash") && (
            <>
              <h2 id="thank_msg">Your Order is Ready to deliver</h2>
              <img id="thank_img" src={Delivery} alt="thanks" />
            </>
          )}

          <div>
            {step > 1 && (
              <button id="back_btn" onClick={prevStep}>
                Back
              </button>
            )}
            {step > 1 && step < 3 && (
              <button id="next_btn" onClick={nextStep}>
                Next
              </button>
            )}
            {step === 3 && (
              <button id="confirm_btn" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            )}
          </div>
        </motion.div>

        <div id="column_right">
          <h3>Order Summary</h3>
          <br />
          <hr />
          <br />
          <div id="sub_container">
            <div id="left_section">
              <img id="prd_img" src={product.img_url} alt={product.prd_name} />
            </div>
            <div id="right_section">
              <p id="p_details">
                <strong>Item Name:</strong> {product.prd_name}
              </p>
              <p id="p_details">
                <strong>Item Brand:</strong> {product.prd_brand}
              </p>
              <p id="p_details">
                <strong>Category:</strong> {product.category}
              </p>
              <p id="p_details">
                <strong>Stock:</strong> {product.stock}
              </p>
              <p id="p_details_price">
                <strong>Item Price:</strong> {`Rs. ${product.price}`}
              </p>
              <hr />
              <input
                type="text"
                value={`Total Price: Rs. ${totalPrice}`}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
