import {Request, Response} from "express";

import { HostController } from "./controllers/hostController";

export class Routes {

  public hostController: HostController = new HostController();

  public routes(app): void {
    app.route('/hosts').get(this.hostController.listHosts);
    app.route('/hosts/:hostname/applications/').get(this.hostController.listApplicationsByHost);
    app.route('/hosts/:hostname/applications/add/:applicationId').put(this.hostController.addApplicationToHost);
    app.route('/hosts/:hostname/applications/remove/:applicationId').put(this.hostController.deleteApplicationFromHost);
    // change to:
    // hosts/
    // applications/?hostname=
    // hosts/:hostname/applications/:applicationId put/delete
  }
}

