import { getModelForClass, prop } from '@typegoose/typegoose'

class Skill {
  @prop()
  public language!: string

  @prop()
  public expertise!: number

  @prop()
  public icon!: string
}

export const SkillModel = getModelForClass(Skill)
