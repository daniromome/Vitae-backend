import { config } from "dotenv";
import App from "./app";
import InquiryController from "./inquiry/inquiry.controller";

config();

const app = new App([
    new InquiryController
]);

app.listen();