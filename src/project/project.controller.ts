import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import { ProjectDTO, ModifyProjectDTO } from "./project.dto";
import ProjectModel from "./project.model";

class ProjectController implements Controller {
    public path = '/project';
    public router = Router();
    public project = ProjectModel;

    constructor () {
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post(`${this.path}/create`, this.createProject);
        this.router.get(`${this.path}/get`, this.getProjects);
        this.router.put(`${this.path}/modify`, this.modifyProject);
    }

    private createProject = async (request: Request, response: Response) => {
        const projectData: ProjectDTO = request.body;
        const projectObject = new this.project({
            ...projectData
        });
        try {
            const savedProject = await projectObject.save();
            console.log(`${savedProject.get('title')} has been registered as a project within your portfolio`);
            return response.status(200).json({ success: true, result: `Project with UUID ${savedProject._id} successfully created`});
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }
    }

    private getProjects = async (request: Request, response: Response) => {
        try {
            const projects = await this.project.find().sort({ date: 'desc' }).exec();
            console.log(`Fetched ${projects.length === 1 ? 'a' : projects.length} project${projects.length > 1 ? 's' : ''} from the database`);
            return response.status(200).json({ success: true, result: projects });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }
    }

    private modifyProject = async (request: Request, response: Response) => {
        const projectData: ModifyProjectDTO = request.body;
        try {
            const project = await this.project.findByIdAndUpdate(projectData._id, projectData, { new: true} ).exec();
            console.log(`Project ${project?.get('title')} has been successfully modified`);
            return response.status(200).json({ success: true, result: project });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ success: false, error });
        }
    }
}

export default ProjectController;