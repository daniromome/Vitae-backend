import { Schema, model } from "mongoose";

const projectSchema = new Schema({
    image: String,
    title: String,
    url: String,
    summary: String,
    description: String,
    repository: String,
    date: Date
});

const ProjectModel = model('project', projectSchema);

export default ProjectModel;