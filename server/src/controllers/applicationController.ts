import {HostService} from "../services/HostService";
import  Application  from '../models/Application';
import { Request, Response } from 'express';

/**
 * @GET /applications/
 * @description Get list of applications for a given host.
 * @param: hostname
 */
export let listApplicationsByHost = async (req: Request, res: Response) => {
  const hostname = req.query.hostname || '';
  if (!hostname) {
    return res.status(422).send({
      error: true,
      message: 'You must provide a hostname'
    });
  }
  try {
    const applications = await HostService.getApplicationsFromHost(hostname);
    res.status(200).json({applications});
  } catch(e) {
    res.status(500).send({
      error: true,
      message: `Error: ${e}`
    });
  }
};