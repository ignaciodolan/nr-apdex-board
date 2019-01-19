import {Request, Response} from "express";

import { HostController } from "./controllers/hostController";

export class Routes {

  public hostController: HostController = new HostController();

  public routes(app): void {
    app.route('/hosts').get(this.hostController.listHosts);
    app.route('/hosts/:host/applications/').get(this.hostController.listApplicationsByHost);
  }
}

