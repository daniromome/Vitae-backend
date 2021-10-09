import { getModelForClass, prop } from '@typegoose/typegoose'

class Inquiry {
  @prop()
  name: string

  @prop()
  email: string

  @prop()
  inquiry: string
}

export const InquiryModel = getModelForClass(Inquiry)
