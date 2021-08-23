import { Request, Response, Router } from 'express'
import { Controller } from '../interfaces/controller.interface'
import { ProjectDTO, ModifyProjectDTO } from './project.dto'
import ProjectModel from './project.model'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { throwValidationErrors } from '../common/vitae.utils'

class ProjectController implements Controller {
    public path = '/project';
    public router = Router();

    constructor () {
      this.initRoutes()
    }

    private initRoutes () {
      this.router.post(`${this.path}/create`, this.createProject)
      this.router.get(`${this.path}/get`, this.getProjects)
      this.router.put(`${this.path}/modify`, this.modifyProject)
    }

    private createProject = async (request: Request, response: Response) => {
      const projectData = plainToClass(ProjectDTO, request.body)
      const errors = await validate(projectData, { validationError: { target: false } })
      if (errors.length > 0) return response.status(400).json(throwValidationErrors(errors))
      const projectObject = new ProjectModel({
        ...projectData
      })
      try {
        const savedProject = await projectObject.save()
        console.log(`${savedProject.get('title')} has been registered as a project within your portfolio`)
        return response.status(200).json({ success: true, result: `Project with UUID ${savedProject._id} successfully created` })
      } catch (error) {
        console.error(error)
        return response.status(500).json({ success: false, error })
      }
    }

    private getProjects = async (request: Request, response: Response) => {
      try {
        const projects = await ProjectModel.find().sort({ date: 'desc' }).exec()
        console.log(`Fetched ${projects.length === 1 ? 'a' : projects.length} project${projects.length > 1 ? 's' : ''} from the database`)
        return response.status(200).json({ success: true, result: projects })
      } catch (error) {
        console.error(error)
        return response.status(500).json({ success: false, error })
      }
    }

    private modifyProject = async (request: Request, response: Response) => {
      const projectData = plainToClass(ModifyProjectDTO, request.body)
      const errors = await validate(projectData, { validationError: { target: false } })
      if (errors.length > 0) return response.status(400).json(throwValidationErrors(errors))
      try {
        const project = await ProjectModel.findByIdAndUpdate(projectData._id, projectData, { new: true }).exec()
        console.log(`Project ${project?.get('title')} has been successfully modified`)
        return response.status(200).json({ success: true, result: project })
      } catch (error) {
        console.error(error)
        return response.status(500).json({ success: false, error })
      }
    }
}

export default ProjectController
