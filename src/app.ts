import bodyparser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import Controller from "./interfaces/controller.interface";

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.initDatabase();
        this.initMiddleware();
        this.initControllers(controllers);
    }

    public listen() {
        this.app.listen(Number(process.env.PORT), process.env.LISTEN_INTERFACE!, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initMiddleware() {
        this.app.use(bodyparser.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({
            origin: ['https://dani9oo.dev']
        }));
    }

    private async initDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_URI
        } = process.env;
        try {
            await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
            console.log("Database connection has been stablished");
        } catch (error) {
            console.error(error);
        }
    }
    private initControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }
}

export default App;