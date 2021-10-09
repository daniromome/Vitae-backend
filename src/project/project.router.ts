import { Request, Response, Router } from 'express'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { MongoDTO } from '../common/dtos/mongo.dto'
import { handleValidationErrors, handleServerError } from '../common/vitae.utils'
import { ProjectDTO } from './project.dto'
import { projectController } from './project.controller'
import { AppRouter } from '../common/interfaces/controller.interface'
import cors from 'cors'

export class ProjectRouter implements AppRouter {
  public path = '/project';

  public router = Router();

  constructor () {
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post(`${this.path}/create`, cors({ origin: 'http://localhost:3000' }), this.createProject)
    this.router.get(`${this.path}/get`, this.getProjects)
    this.router.put(`${this.path}/modify/:_id`, cors({ origin: 'http://localhost:3000' }), this.modifyProject)
  }

  private createProject = async (request: Request, response: Response) => {
    try {
      const data = plainToClass(ProjectDTO, request.body)
      const errors = await validate(data, { validationError: { target: false } })
      if (errors.length > 0) return response.status(400).json(handleValidationErrors(errors))
      const p = await projectController.createProject(data)
      const message = `${p.title} has been registered as a project within your portfolio`
      console.log(message)
      return response.status(200).json({ success: true, result: p, message, code: 200 })
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }

  private getProjects = async (request: Request, response: Response) => {
    try {
      const p = await projectController.getProjects()
      const message = `Fetched ${p.length === 1 ? 'a' : p.length} project${p.length > 1 ? 's' : ''} from the database`
      console.log(message)
      return response.status(200).json({ success: true, result: p, message, code: 200 })
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }

  private modifyProject = async (request: Request, response: Response) => {
    try {
      const params = plainToClass(MongoDTO, request.params)
      const data = plainToClass(ProjectDTO, request.body)
      const errors = [
        await validate(params, { validationError: { target: false } }),
        await validate(data, { validationError: { target: false } })
      ]
      errors.forEach(e => { if (e.length > 0) return response.status(400).json(handleValidationErrors(e)) })
      const p = await projectController.modifyProject(params._id, data)
      if (!p) {
        const error = new Error(`Project with _id ${params._id} does not exist`)
        console.error(error)
        return response.status(404).json({ success: false, error: error.message, message: error.message, code: 404 })
      }
      const message = `Project ${p.title} has been successfully modified`
      console.log(message)
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }
}
