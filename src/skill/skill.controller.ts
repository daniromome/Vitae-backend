import { SkillModel } from './skill.model'
import { SkillDTO } from './skill.dto'
class SkillController {
  public createSkill = async (skill: SkillDTO) => {
    return await SkillModel.create(skill)
  };

  public getSkills = async () => {
    return await SkillModel.find().sort({ expertise: 'desc' })
  };

  public modifySkill = async (_id: string, skill: SkillDTO) => {
    return await SkillModel.findByIdAndUpdate(_id, skill)
  };
}

export const skillController = new SkillController()
