import { Request, Response, Router } from 'express'
import { plainToClass } from 'class-transformer'
import { SkillDTO } from './skill.dto'
import { validate } from 'class-validator'
import { skillController } from './skill.controller'
import { MongoDTO } from '../common/dtos/mongo.dto'
import { handleValidationErrors, handleServerError } from '../common/vitae.utils'
import cors from 'cors'

export class SkillRouter {
  public path = '/skill';

  public router = Router();

  constructor () {
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post(`${this.path}/create`, cors({ origin: 'http://localhost:3000' }), this.createSkill)
    this.router.get(`${this.path}/get`, this.getSkills)
    this.router.put(`${this.path}/modify/:_id`, cors({ origin: 'http://localhost:3000' }), this.modifySkill)
  }

  private createSkill = async (request: Request, response: Response) => {
    try {
      const data = plainToClass(SkillDTO, request.body)
      const errors = await validate(data, { validationError: { target: false } })
      if (errors.length > 0) return response.status(400).json(handleValidationErrors(errors))
      const s = await skillController.createSkill(data)
      const message = `${s.language} has been registered as a skill with an expertise level of ${s.expertise}/5`
      console.log(message)
      return response.status(200).json({ success: true, result: s, message, code: 200 })
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }

  private getSkills = async (request: Request, response: Response) => {
    try {
      const skills = await skillController.getSkills()
      const message = `Fetched ${skills.length === 1 ? 'a' : skills.length} skill${skills.length > 1 ? 's' : ''} from the database`
      console.log(message)
      return response.status(200).json({ success: true, result: skills, message, code: 200 })
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }

  private modifySkill = async (request: Request, response: Response) => {
    try {
      const params = plainToClass(MongoDTO, request.params)
      const data = plainToClass(SkillDTO, request.body)
      const errors = [
        await validate(params, { validationError: { target: false } }),
        await validate(data, { validationError: { target: false } })
      ]
      errors.forEach(e => { if (e.length > 0) return response.status(400).json(handleValidationErrors(e)) })
      await skillController.modifySkill(params._id, data)
    } catch (error) { return response.status(500).json(handleServerError(error)) }
  }
}
