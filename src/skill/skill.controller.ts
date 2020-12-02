import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { SkillDTO, ModifySkillDTO } from "./skil.dto";
import SkillModel from "./skill.model";

class SkillController implements Controller {
    public path = '/skill';
    public router = Router();
    public skill = SkillModel;

    constructor () {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(`${this.path}/create`, this.createSkill);
        this.router.get(`${this.path}/get`, this.getSkills);
        this.router.put(`${this.path}/modify`, this.modifySkill);
    }

    private createSkill = async (request: Request, response: Response) => {
        const skillData: SkillDTO = request.body;
        const skillObject = new this.skill({
            ...skillData
        });
        try {
            const savedSkill = await skillObject.save();
            console.log(`${savedSkill.get('language')} has been registered as a skill with an expertise level of ${savedSkill.get('expertise')}/5`);
            return response.status(200).json({ success: true, result: `Skill with UUID ${savedSkill._id} successfully created`});
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }
    }

    private getSkills = async (request: Request, response: Response) => {
        try {
            const skills = await this.skill.find();
            console.log(`Fetched ${skills.length === 1 ? 'a' : skills.length} skill${skills.length > 1 ? 's' : ''} from the database`);
            return response.status(200).json({ success: true, result: skills });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }
    }

    private modifySkill = async (request: Request, response: Response) => {
        const skillData: ModifySkillDTO = request.body;
        try {
            const skill = await this.skill.findByIdAndUpdate(skillData._id, skillData);
            console.log(`Skill ${skill.get('language')} has been successfully modified`);
            return response.status(200).json({ success: true, result: skill });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }
    }
}

export default SkillController;