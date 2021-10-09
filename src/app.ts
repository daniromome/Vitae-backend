import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { AppRouter } from './common/interfaces/controller.interface'

class App {
    public app: express.Application;

    constructor (routers: AppRouter[]) {
      this.app = express()
      this.initMiddleware()
      this.initRouters(routers)
    }

    public init = async () => {
      await this.initDatabase()
    }

    public listen () {
      this.app.listen(Number(process.env.PORT), process.env.LISTEN_INTERFACE!, () => {
        console.log(`App listening on port ${process.env.PORT}`)
      })
    }

    public getServer () {
      return this.app
    }

    private initMiddleware () {
      this.app.use(json())
      this.app.use(express.urlencoded({ extended: true }))
      this.app.use(cors({
        origin: process.env.NODE_ENV === 'production' ? 'https://www.dani9oo.dev' : ['http://localhost:3000', 'http://localhost:4200']
      }))
    }

    private async initDatabase () {
      const {
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_URI
      } = process.env
      try {
        await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`)
        console.log('Database connection has been stablished')
      } catch (error) {
        console.error(error)
      }
    }

    private initRouters (routers: AppRouter[]) {
      routers.forEach((router) => {
        this.app.use('/api', router.router)
      })
    }
}

export default App
