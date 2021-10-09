import { getModelForClass, prop } from '@typegoose/typegoose'

class Project {
  @prop()
  public image!: string

  @prop()
  public title!: string

  @prop()
  public url!: string

  @prop()
  public summary!: string

  @prop()
  public description!: string

  @prop()
  public repository?: string

  @prop()
  public date!: Date
}

export const ProjectModel = getModelForClass(Project)
