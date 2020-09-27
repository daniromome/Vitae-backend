import { Schema, model } from "mongoose";

const inquirySchema = new Schema({
    name: String,
    email: String,
    inquiry: String
});

const inquiryModel = model('inquiry', inquirySchema);

export default inquiryModel;