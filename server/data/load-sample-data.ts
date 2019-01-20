import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import Host  from '../src/models/Host';
import Application from '../src/models/Application';
import fs = require('fs');

dotenv.config({ path: ".env" });
mongoose.connect(process.env.MONGODB_URI_LOCAL);
mongoose.Promise = global.Promise;


const hostAppData = JSON.parse(fs.readFileSync(__dirname + '/host-app-data.json', 'utf-8'));

async function deleteData() {
  console.log('Deleting data');
  await Host.remove();
  await Application.remove();
  console.log('Data deleted');
  process.exit();
}
async function saveHosts(applications) {
  let allHosts = [];
  applications.forEach((application) => {
    allHosts.push(...application.host);
  });
  console.log(allHosts);
  const hosts = [...new Set(allHosts)];
  for (let hostUrl of hosts) {
    let host = new Host({
        url: hostUrl
      }
    );
    await Host.findOne({ url: hostUrl }, async (err, existingHost) => {
      if (err) {
        console.log(err);
        return;
      }
      if (existingHost) {
        console.log('Shouldnt happen but host already exists...');
        return;
      }
      await host.save((err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      console.log(`Host: ${hostUrl} saved`);
    });
  }
}

async function pushApplicationToHosts(hosts, application) {
  for (let hostUrl of hosts) {
    await Host.findOne({ url: hostUrl }, async (err, existingHost) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!existingHost) {
        console.log('Host doesn\'t exists <- Investigate why');
        return;
      }
      console.log(`Host to be pushed ${existingHost.url} for ${application.name}`);
      existingHost.applications.push(application._id);
      await existingHost.save()
    });
  }
}

async function createNewApplication(applicationObj) {
  let application = new Application({
      name: applicationObj.name,
      contributors: applicationObj.contributors,
      version: applicationObj.version,
      apdex: applicationObj.apdex
    }
  );
  console.log(`about to save ${application.name}`);
  await Application.findOne({ name: applicationObj.name }, async (err, existingApplication) => {
    if (err) {
      console.log(err);
      return;
    }
    if (existingApplication) {
      console.log('application already exists');
      return;
    }
    // Check hosts


    console.log(`-> Application about to save: ${application.name}`);
    await application.save((err) => {
      if (err) {
        console.log(err);
        return
      }
    });
    await pushApplicationToHosts(applicationObj.host, application);
    console.log(`Application: ${application.name} saved`);
  });
}

async function loadData() {
  try {
    const applications = hostAppData.slice(0,5);
    await saveHosts(applications);

    // recorro las applications
    for (let applicationObj of applications) {
      await createNewApplication(applicationObj);
    }
    //TODO: Fix promise hell, there is a promise resolving before it should and its causing to get to process exit
    // process.exit();
  } catch(e) {
    console.log('Error: ');
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
