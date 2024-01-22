import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{type: String, required: true},
    code:{type: String, required:true},
    expireIn:{type:Number, required:true},
},{timestamps:true});

export default mongoose.model('otp',otpSchema);