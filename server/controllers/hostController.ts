// TODO fix this require, if not using it i can't populate Applications
require('../models/Application');
import  Host  from '../models/Host';
import { Request, Response } from 'express';

export class HostController {

  public listHosts(req: Request, res: Response) {
    Host.find()
      .populate('applications')
      .exec(function (err, hosts) {
        if (err){
          if(err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Host not found with given host url " + req.params.subjectId
            });
          }
          return res.status(500).send({
            message: "Error retrieving Host with given host Id " + req.params.subjectId
          });
        }
        res.status(200).json({hosts});
      });
  }

  public listApplicationsByHost(req: Request, res: Response) {
    Host.find({url: req.params.hostUrl})
      .populate('applications')
      .exec(function (err, hosts) {
        if (err){
          if(err.kind === 'ObjectId') {
            return res.status(404).send({
              message: "Application not found with given host Id " + req.params.subjectId
            });
          }
          return res.status(500).send({
            message: "Error retrieving Student with given subject Id " + req.params.subjectId
          });
        }
        res.status(200).json({hosts});
      });
  }
}