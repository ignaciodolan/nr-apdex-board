import * as mongoose from 'mongoose';
import { HostSchema } from '../models/Host';
import { Request, Response } from 'express';

const Host = mongoose.model('Host', HostSchema);
export class HostController {

  public listHosts(req: Request, res: Response) {
    res.status(200).send({
      hosts: []
    })
  }
  public listApplicationsByHost(req: Request, res: Response) {
    console.log(req.params);
    res.status(200).send({
      host: req.params.host,
      applications: []
    })
  }
}