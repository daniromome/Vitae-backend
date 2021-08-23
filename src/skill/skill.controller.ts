import { Request, Response, Router } from 'express'
import { Controller } from '../interfaces/controller.interface'
import { SkillDTO, ModifySkillDTO } from './skill.dto'
import SkillModel from './skill.model'
import { plainToClass } from 'class-transformer'
import { throwValidationErrors } from '../common/vitae.utils'
import { validate } from 'class-validator'

class SkillController implements Controller {
  public path = '/skill';
  public router = Router();

  constructor () {
    this.initRoutes()
  }

  private initRoutes () {
    this.router.post(`${this.path}/create`, this.createSkill)
    this.router.get(`${this.path}/get`, this.getSkills)
    this.router.put(`${this.path}/modify`, this.modifySkill)
  }

  private createSkill = async (request: Request, response: Response) => {
    const skillData = plainToClass(SkillDTO, request.body)
    const errors = await validate(skillData, {
      validationError: { target: false }
    })
    if (errors.length > 0) { return response.status(400).json(throwValidationErrors(errors)) }
    const skillObject = new SkillModel({
      ...skillData
    })
    try {
      const savedSkill = await skillObject.save()
      console.log(
        `${savedSkill.get(
          'language'
        )} has been registered as a skill with an expertise level of ${savedSkill.get(
          'expertise'
        )}/5`
      )
      return response
        .status(200)
        .json({
          success: true,
          result: `Skill with UUID ${savedSkill._id} successfully created`
        })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ success: false, error })
    }
  };

  private getSkills = async (request: Request, response: Response) => {
    try {
      const skills = await SkillModel.find().sort({ expertise: 'desc' }).exec()
      console.log(
        `Fetched ${skills.length === 1 ? 'a' : skills.length} skill${
          skills.length > 1 ? 's' : ''
        } from the database`
      )
      return response.status(200).json({ success: true, result: skills })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ success: false, error })
    }
  };

  private modifySkill = async (request: Request, response: Response) => {
    const skillData = plainToClass(ModifySkillDTO, request.body)
    const errors = await validate(skillData, {
      validationError: { target: false }
    })
    if (errors.length > 0) { return response.status(400).json(throwValidationErrors(errors)) }
    try {
      const skill = await SkillModel
        .findByIdAndUpdate(skillData._id, skillData, { new: true })
        .exec()
      console.log(
        `Skill ${skill?.get('language')} has been successfully modified`
      )
      return response.status(200).json({ success: true, result: skill })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ success: false, error })
    }
  };
}

export default SkillController
