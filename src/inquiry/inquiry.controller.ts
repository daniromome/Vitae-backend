import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import inquiryModel from "./inquiry.model";
import inquiryDTO from "./inquiry.dto";

class InquiryController implements Controller {

    public path = "/inquiry";
    public router = Router();
    private inquiry = inquiryModel;

    constructor() {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(`${this.path}/submit`, this.submitInquiry);
    }

    private submitInquiry = async (request: Request, response: Response) => {
        const inquiryData: inquiryDTO = request.body;
        const inquiryObject = new this.inquiry({
            ...inquiryData
        });
        try {
            const saveInquiry = await inquiryObject.save();
            console.log(`${saveInquiry.get('name')} just sent an inquiry! 📝`);
            return response.status(200).json({ success: true, result: `Inquiry with UUID ${saveInquiry._id} successfully saved` });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }

    }

}

export default InquiryController;