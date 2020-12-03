import { config } from "dotenv";
import App from "./app";
import InquiryController from "./inquiry/inquiry.controller";
import ProjectController from "./project/project.controller";
import SkillController from "./skill/skill.controller";

config();

const app = new App([
    new InquiryController,
    new SkillController,
    new ProjectController
]);

app.listen();