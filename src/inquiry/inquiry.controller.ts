import { Request, Response, Router } from 'express'
import { Controller } from '../interfaces/controller.interface'
import InquiryModel from './inquiry.model'
import { InquiryDTO } from './inquiry.dto'
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { throwValidationErrors } from '../common/vitae.utils'

class InquiryController implements Controller {
    public path = '/inquiry';
    public router = Router();

    constructor () {
      this.initRoutes()
    }

    private initRoutes () {
      this.router.post(`${this.path}/submit`, this.submitInquiry)
    }

    private submitInquiry = async (request: Request, response: Response) => {
      const inquiryData = plainToClass(InquiryDTO, request.body)
      const errors = await validate(inquiryData, { validationError: { target: false } })
      if (errors.length > 0) return response.status(400).json(throwValidationErrors(errors))
      const inquiryObject = new InquiryModel({
        ...inquiryData
      })
      try {
        const saveInquiry = await inquiryObject.save()
        console.log(`${saveInquiry.get('name')} just sent an inquiry! 📝`)
        return response.status(200).json({ success: true, result: `Inquiry with UUID ${saveInquiry._id} successfully saved` })
      } catch (error) {
        console.error(error)
        return response.status(500).json({ success: false, error })
      }
    }
}

export default InquiryController
