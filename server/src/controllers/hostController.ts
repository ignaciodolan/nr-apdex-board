import { HostService } from "../services/HostService";
import { Request, Response } from 'express';

/**
 * @GET /hosts
 * @description Get all hosts
 */
export let listHosts = async (req: Request, res: Response) => {
  try {
    const hosts = await HostService.getHosts();
    return res.status(200).json({hosts});
  } catch (e) {
    return res.status(500).send({
      error: true,
      message: `Error: ${e}`
    });
  }
};

/**
 * @PUT /hosts/:hostname/applications/:applicationId
 * @description Add application to a given host
 */
export let addApplicationToHost = async (req: Request, res: Response) => {
  try {
    const host = await HostService.saveApplicationToHost(req.params.hostname, req.params.applicationId);
    return res.status(200).json({host});
  } catch (e) {
    return res.status(500).send({
      error: true,
      message: `${e}`
    });
  }
};

/**
 * @DELETE /hosts/:hostname/applications/:applicationId
 * @description Remove application to a given host
 */
export let deleteApplicationFromHost = async (req: Request, res: Response) => {
  try {
    const host = await HostService.deleteApplicationFromHost(req.params.hostname, req.params.applicationId);
    return res.status(200).json({host});
  } catch (e) {
    return res.status(500).send({
      error: true,
      message: `${e}`
    });
  }
};