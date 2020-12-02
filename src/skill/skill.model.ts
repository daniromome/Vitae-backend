import { Schema, model } from "mongoose";

const skillSchema = new Schema({
    language: String, 
    expertise: Number,
    icon: String
});

const SkillModel = model('skill', skillSchema);

export default SkillModel;