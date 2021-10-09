import { ProjectDTO } from './project.dto'
import { ProjectModel } from './project.model'

class ProjectController {
  public createProject = async (project: ProjectDTO) => {
    return await ProjectModel.create(project)
  }

  public getProjects = async () => {
    return await ProjectModel.find().sort({ date: 'desc' })
  }

  public modifyProject = async (_id: string, project: ProjectDTO) => {
    return await ProjectModel.findByIdAndUpdate(_id, project)
  }
}

export const projectController = new ProjectController()
