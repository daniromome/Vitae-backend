import { plainToClass } from 'class-transformer'
import { Request, Response, Router } from 'express'
import { InquiryDTO } from './inquiry.dto'
import { validate } from 'class-validator'
import { handleValidationErrors, handleServerError } from '../common/vitae.utils'
import { inquiryController } from './inquiry.controller'
import { AppRouter } from '../common/interfaces/router.interface'

export class InquiryRouter implements AppRouter {
  public path = '/inquiry';
  public router = Router();

  constructor () {
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post(`${this.path}/submit`, this.submitInquiry)
  }

  private submitInquiry = async (request: Request, response: Response) => {
    try {
      const data = plainToClass(InquiryDTO, request.body)
      const errors = await validate(data, { validationError: { target: false } })
      if (errors.length > 0) return response.status(400).json(handleValidationErrors(errors))
      const i = await inquiryController.submitInquiry(data)
      const message = `${i.name} just sent an inquiry! 📝`
      console.log(message)
      return response.status(200).json({ success: true, result: i, message, code: 200 })
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }
}
