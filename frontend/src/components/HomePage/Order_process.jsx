import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "../../css/HomePage/Order_process.css";
import "../../css/HomePage/product.css";

export default function Order_process() {
  const location = useLocation();
  const product = location.state;

  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(product.price * quantity);
  const [paymentType, setPaymentType] = useState("");
  const [availableStock, setAvailableStock] = useState(product.stock);
  
  // Card details state and validation
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardError, setCardError] = useState("");
  const [cardValid, setCardValid] = useState(false);
  const [expiryValid, setExpiryValid] = useState(false);
  const [cvvValid, setCvvValid] = useState(false);

  useEffect(() => {
    // Recalculate the total price when quantity changes
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);

    // Ensure the quantity doesn't exceed available stock
    if (newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    // Ensure the available stock doesn't exceed the total stock
    setAvailableStock(product.stock);
  }, [product.stock]);

  const validateCardDetails = () => {
    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3}$/;

    let valid = true;

    if (!cardNumber.match(cardNumberRegex)) {
      setCardError("Invalid card number. Please enter a 16-digit card number.");
      setCardValid(false);
      valid = false;
    } else {
      setCardError("");
      setCardValid(true);
    }

    if (!expiryDate.match(expiryDateRegex)) {
      setCardError("Invalid expiry date. Format should be MM/YY.");
      setExpiryValid(false);
      valid = false;
    } else {
      setCardError("");
      setExpiryValid(true);
    }

    if (!cvv.match(cvvRegex)) {
      setCardError("Invalid CVV. Please enter a 3-digit CVV.");
      setCvvValid(false);
      valid = false;
    } else {
      setCardError("");
      setCvvValid(true);
    }

    return valid;
  };

  const handleConfirmOrder = () => {
    if (paymentType === "card") {
      const isValid = validateCardDetails();
      if (isValid) {
        alert("Order Confirmed!");
      } else {
        alert("Please fix the errors before confirming.");
      }
    } else {
      alert("Order Confirmed!");
    }
  };

  return (
    <>
      <div className="prd-head"></div>
      <div id="left">
        <img className="prd-img" src={product.img_url} alt={product.prd_name} />
      </div>

      <div id="order-container">
        <motion.div
          id="order-box"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 id="order-title">Order Process</h2>
          {step === 1 && (
            <div id="step1">
              <p className="prd-category">Category: {product.category}</p>
              <p className="prd-stock">Stock: {availableStock}</p>

              <div id="form">
                <div id="left_input">
                  <input
                    type="text"
                    value={"Item Name: " + product.prd_name}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    disabled
                  />
                  <input
                    type="text"
                    value={"Item Brand: " + product.prd_brand}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    disabled
                  />
                  <input
                    id="item-price"
                    type="text"
                    value={"Item Price: Rs. " + product.price + " /="}
                    onChange={(e) => setItemPrice(Number(e.target.value))}
                    disabled
                  />
                </div>

                <div id="right_input">
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    max={availableStock}
                  />
                  <input
                    id="total-price"
                    type="text"
                    value={"Total Price: Rs. " + totalPrice + " /="}
                    disabled
                  />
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div id="step2">
              <label id="payment-label">Payment Type:</label>
              <select
                id="payment-type"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="">Select Payment Type</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          )}
          {step === 3 && paymentType === "card" && (
            <div id="card-details-form">
              <label id="card-number-label">Card Number:</label>
              <input
                id="card-number"
                type="text"
                placeholder="Enter Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={cardValid ? "valid" : "invalid"}
              />
              <label id="expiry-label">Expiry Date:</label>
              <input
                id="expiry-date"
                type="date"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className={expiryValid ? "valid" : "invalid"}
              />
              <label id="cvv-label">CVV:</label>
              <input
                id="cvv"
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={cvvValid ? "valid" : "invalid"}
              />
              {cardError && (
                <motion.p
                  className="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {cardError}
                </motion.p>
              )}
            </div>
          )}
          <div id="button-container">
            {step > 1 && (
              <button id="prev-button" onClick={prevStep}>
                Back
              </button>
            )}
            {step < 3 ? (
              <button id="next-button" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button id="confirm-button" onClick={handleConfirmOrder}>
                Confirm Order
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
