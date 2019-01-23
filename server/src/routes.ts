
const express = require('express');
const router = express.Router();

import * as hostController from "./controllers/hostController";
import * as applicationController from "./controllers/applicationController";

router.get('/hosts', hostController.listHosts);
router.put('/hosts/:hostname/applications/:applicationId', hostController.addApplicationToHost);
router.delete('/hosts/:hostname/applications/:applicationId', hostController.deleteApplicationFromHost);

router.get('/applications/', applicationController.listApplicationsByHost);


module.exports = router;