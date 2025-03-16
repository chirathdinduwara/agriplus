import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    full_name: {
        type: String,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Delivery_Status = mongoose.model('Delivery_Status', statusSchema);
export default Delivery_Status;
