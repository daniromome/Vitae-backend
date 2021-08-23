import { Schema, model } from 'mongoose'

const inquirySchema = new Schema({
  name: String,
  email: String,
  inquiry: String
})

const InquiryModel = model('inquiry', inquirySchema)

export default InquiryModel
