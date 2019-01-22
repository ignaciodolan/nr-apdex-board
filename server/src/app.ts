import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as expressValidator from "express-validator";
import * as cors from 'cors'

class App {

  public app: express.Application;
  public router: Routes = new Routes();

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(expressValidator());
    this.app.options('*', cors());
    this.app.use(cors());
    this.router.routes(this.app);
    dotenv.config({ path: ".env" });
    this.initializeMongoDB();
  }

  private initializeMongoDB(): void{
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI_LOCAL, { useNewUrlParser: true });
    mongoose.connection.on('error', (err) => {
      console.error(`Error with MongoDB connection: ${err.message}`);
    });
  }
}

export default new App().app;