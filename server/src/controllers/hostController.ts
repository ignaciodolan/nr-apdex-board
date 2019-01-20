// TODO fix this require, if not using it i can't populate Applications
require('../models/Application');
import  Host  from '../models/Host';
import { Request, Response } from 'express';
const request = require("express-validator");

export class HostController {

  /**
   * GET /hosts
   * Get all hosts
   */
  public listHosts(req: Request, res: Response) {
    Host.find()
      .populate('applications')
      .exec(function (err, hosts) {
        if (err){
          if(err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Host not found with given host url " + req.params.hostUrl
            });
          }
          return res.status(500).send({
            message: "Error retrieving Host with given host Id " + req.params.hostUrl
          });
        }
        res.status(200).json({hosts});
      });
  }

  /**
   * GET /hosts/:hostUrl/applications
   * Get list of applications for a given host.
   */
  public listApplicationsByHost(req: Request, res: Response) {
    Host.findOne({url: req.params.hostUrl})
      .populate('applications')
      .exec(function (err, hosts) {
        if (err){
          if(err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Application not found with given host url " + req.params.hostUrl
            });
          }
          return res.status(500).send({
            message: "Error retrieving host with given url " + req.params.hostUrl
          });
        }
        res.status(200).json({applications: hosts.applications});
      });
  }

  /**
   * POST /hosts/:hostUrl/applications
   * Create application and add it to a given host
   */
  public addApplicationToHost(req: Request, res: Response) {
    req.assert("email", "Please enter a valid email address.").isEmail();
    const errors = req.validationErrors();

    if (errors) {
      return res.status(500).send({
        message: "Error saving application" + errors
      });
    }
  }
}