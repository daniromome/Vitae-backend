import { getModelForClass, prop } from '@typegoose/typegoose'

class Skill {
  @prop()
  language: string

  @prop()
  expertise: number

  @prop()
  icon: string
}

export const SkillModel = getModelForClass(Skill)
