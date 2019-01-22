// TODO fix this require, if not using it i can't populate Applications
require('../models/Application');
import  Host  from '../models/Host';
import  Application  from '../models/Application';
import { Request, Response, NextFunction } from 'express';
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
        res.status(200).json({hosts});
      });
  }

  /**
   * GET /hosts/:hostname/applications
   * Get list of applications for a given host.
   */
  public listApplicationsByHost(req: Request, res: Response) {
    Host.findOne({url: req.params.hostname})
      .populate('applications')
      .exec(function (err, hosts) {
        if (err){
          if(err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Application not found with given host url " + req.params.hostname
            });
          }
          return res.status(500).send({
            message: "Error retrieving host with given url " + req.params.hostname
          });
        }
        res.status(200).json({applications: hosts.applications});
      });
  }

  /**
   * PUT /hosts/:hostname/applications/:applicationId
   * Add application to a given host
   */
  public addApplicationToHost(req: Request, res: Response) {
    Host.findOne({url: req.params.hostname})
      .exec(async (err, host) => {
        if(!host) {
          return res.status(404).json({
            message: 'Error updating host',
            errors: [{msg: 'Host not found'}]
          });
        }

        Application.findOne({_id: req.params.applicationId})
          .exec(async (err, application) => {
            if(!application) {
              return res.status(404).json({
                message: 'Error updating host',
                errors: [{msg: 'Application not found'}]
              });
            }
            const applications = host.applications.map(obj => obj.toString());
            if (applications.includes(req.params.applicationId)) {
              return res.status(200).json({
                message: `Application: ${application.name} already exists in ${host.url}`,
                errors: false
              });
            }
            host.applications.push(application._id);
            await host.save();

            return res.status(200).json({
              message: `Application: ${application.name} added to ${host.url}`,
              errors: false
            });
        })
      });
  }

  /**
   * PUT /hosts/:hostname/remove/applications/:applicationId
   * Remove application to a given host
   */
  public deleteApplicationFromHost(req: Request, res: Response) {
    Host.findOne({url: req.params.hostname})
      .exec(async (err, host) => {
        if (!host) {
          return res.status(404).json({
            message: 'Error updating host',
            errors: [{msg: 'Host not found'}]
          });
        }
        await Application.findById(req.params.applicationId)
          .exec(async (err, application) => {
            if (!application) {
              return res.status(404).json({
                message: 'Error updating host',
                errors: [{msg: 'Application not found'}]
              });
            }
            const applications = host.applications.map(obj => obj.toString());
            if (!applications.includes(req.params.applicationId)) {
              return res.status(200).json({
                message: `Application: ${application.name} doesn't exists in ${host.url}`,
                errors: false
              });
            }
            host.applications.remove(req.params.applicationId);
            await host.save();
            return res.status(200).json({
              message: `Application removed from ${host.url}`,
              errors: false
            });
        });
      });
  }
}