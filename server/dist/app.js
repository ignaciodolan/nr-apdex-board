"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
class App {
    constructor() {
        this.router = new routes_1.Routes();
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.router.routes(this.app);
        dotenv.config({ path: ".env" });
        this.initializeMongoDB();
    }
    initializeMongoDB() {
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URI_LOCAL);
        mongoose.connection.on('error', (err) => {
            console.error(`Error with MongoDB connection: ${err.message}`);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map