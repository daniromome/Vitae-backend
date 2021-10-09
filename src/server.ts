import App from './app'
import { SkillRouter } from './skill/skill.router'
import { ProjectRouter } from './project/project.router'
import { InquiryRouter } from './inquiry/inquiry.router'

(async () => {
  const app = new App([
    new SkillRouter(),
    new ProjectRouter(),
    new InquiryRouter()
  ])
  await app.init()
  app.listen()
})()
