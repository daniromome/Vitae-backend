import * as bodyparser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as mongoose from "mongoose";
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
        this.app.listen(Number(process.env.PORT), process.env.LISTEN_INTERFACE, () => {
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

    private initDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_URI
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log("Database connection has been stablished"))
        .catch(err => console.error(err));
    }
    private initControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/api', controller.router);
        });
    }
}

export default App;