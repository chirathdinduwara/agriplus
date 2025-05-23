
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true 
    },
    full_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;