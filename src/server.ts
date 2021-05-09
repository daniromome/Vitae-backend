import { config } from "dotenv";
import App from "./app";
import InquiryController from "./inquiry/inquiry.controller";
import ProjectController from "./project/project.controller";
import SkillController from "./skill/skill.controller";
import serverless from "serverless-http";

config();

const app = new App([
    new InquiryController,
    new SkillController,
    new ProjectController
]);

export const handler = serverless(app.getServer());