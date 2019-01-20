"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hostController_1 = require("./controllers/hostController");
class Routes {
    constructor() {
        this.hostController = new hostController_1.HostController();
    }
    routes(app) {
        app.route('/hosts').get(this.hostController.listHosts);
        app.route('/hosts/:host/applications/').get(this.hostController.listApplicationsByHost);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map