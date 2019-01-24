import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as expressValidator from "express-validator";
import * as cors from 'cors'

const routes = require('./routes');
const app = express();

dotenv.config({ path: ".env" });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.options('*', cors());
app.use(cors());

app.use('/', routes);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
  console.error(`Error with MongoDB connection: ${err.message}`);
});

export default app;