import { getModelForClass, prop } from '@typegoose/typegoose'

class Inquiry {
  @prop()
  public name!: string

  @prop()
  public email!: string

  @prop()
  public inquiry!: string
}

export const InquiryModel = getModelForClass(Inquiry)
