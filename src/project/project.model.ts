import { getModelForClass, prop } from '@typegoose/typegoose'

class Project {
  @prop()
  image: string

  @prop()
  title: string

  @prop()
  url: string

  @prop()
  summary: string

  @prop()
  description: string

  @prop()
  repository?: string

  @prop()
  date: Date
}

export const ProjectModel = getModelForClass(Project)
