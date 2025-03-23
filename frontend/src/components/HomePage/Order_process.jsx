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

  // Automatically move to step 3 when Cash is selected
  const handlePaymentTypeChange = (e) => {
    const value = e.target.value;
    setPaymentType(value);
    if (value === "cash") {
      setStep(3); // Skip to step 3 if payment is cash
    } else {
      setStep(2); // Go to step 2 for card payment
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

//   const location = useLocation();
//   const product = location.state;

//   const [step, setStep] = useState(1);
//   const [quantity, setQuantity] = useState(1);
//   const [paymentType, setPaymentType] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [cardError, setCardError] = useState("");

//   const totalPrice = product.price * quantity;

//   const nextStep = () => step < 3 && setStep(step + 1);
//   const prevStep = () => step > 1 && setStep(step - 1);

//   const handleQuantityChange = (e) => {
//     const newQuantity = Number(e.target.value);
//     if (newQuantity > 0 && newQuantity <= product.stock) {
//       setQuantity(newQuantity);
//     }
//   };

//   const validateCardDetails = () => {
//     const cardNumberRegex = /^[0-9]{16}$/;
//     const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
//     const cvvRegex = /^[0-9]{3}$/;

//     if (!cardNumber.match(cardNumberRegex)) {
//       setCardError("Invalid card number. Please enter a 16-digit number.");
//       return false;
//     }
//     if (!expiryDate.match(expiryDateRegex)) {
//       setCardError("Invalid expiry date. Use MM/YY format.");
//       return false;
//     }
//     if (!cvv.match(cvvRegex)) {
//       setCardError("Invalid CVV. Please enter a 3-digit number.");
//       return false;
//     }
//     setCardError("");
//     return true;
//   };

//   const handleConfirmOrder = () => {
//     if (paymentType === "card" && !validateCardDetails()) {
//       alert("Please fix the errors before confirming.");
//     } else {
//       alert("Order Confirmed!");
//     }
//   };

//   return (
//     <div id="order-container">
//       <motion.div
//         id="order-box"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 id="order-title">Order Process</h2>
//         {step === 1 && (
//           <div>
//             <p>Category: {product.category}</p>
//             <p>Stock: {product.stock}</p>
//             <input
//               type="text"
//               value={`Item Name: ${product.prd_name}`}
//               disabled
//             />
//             <input
//               type="text"
//               value={`Item Price: Rs. ${product.price}`}
//               disabled
//             />
//             <input
//               type="number"
//               value={quantity}
//               onChange={handleQuantityChange}
//               min={1}
//               max={product.stock}
//             />
//             <input
//               type="text"
//               value={`Total Price: Rs. ${totalPrice}`}
//               disabled
//             />
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <label>Payment Type:</label>
//             <select
//               value={paymentType}
//               onChange={(e) => setPaymentType(e.target.value)}
//             >
//               <option value="">Select Payment Type</option>
//               <option value="cash">Cash</option>
//               <option value="card">Card</option>
//             </select>
//           </div>
//         )}

//         {step === 3 && paymentType === "card" && (
//           <div>
//             <input
//               type="text"
//               placeholder="Card Number"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Expiry Date (MM/YY)"
//               value={expiryDate}
//               onChange={(e) => setExpiryDate(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="CVV"
//               value={cvv}
//               onChange={(e) => setCvv(e.target.value)}
//             />
//             {cardError && <p className="error">{cardError}</p>}
//           </div>
//         )}

//         <div>
//           {step > 1 && <button onClick={prevStep}>Back</button>}
//           {step < 3 ? (
//             <button onClick={nextStep}>Next</button>
//           ) : (
//             <button onClick={handleConfirmOrder}>Confirm Order</button>
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// }
