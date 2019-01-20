"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Host_1 = require("../models/Host");
const Host = mongoose.model('Host', Host_1.HostSchema);
class HostController {
    listHosts(req, res) {
        Host.find({}, (err, hosts) => {
            if (err) {
                res.send(err);
            }
            res.status(200).json({ hosts });
        });
    }
    listApplicationsByHost(req, res) {
        console.log(req.params);
        res.status(200).send({
            host: req.params.host,
            applications: []
        });
    }
}
exports.HostController = HostController;
//# sourceMappingURL=hostController.js.map