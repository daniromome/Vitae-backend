import { InquiryModel } from './inquiry.model'
import { InquiryDTO } from './inquiry.dto'

class InquiryController {
  public submitInquiry = async (inquiry: InquiryDTO) => {
    return await InquiryModel.create(inquiry)
  }
}

export const inquiryController = new InquiryController()
