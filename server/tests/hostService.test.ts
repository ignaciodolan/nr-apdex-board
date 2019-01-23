import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import Host  from '../src/models/Host';
import Application from '../src/models/Application';
import {HostService} from "../src/services/HostService";

let connection;

beforeAll(async () => {
  dotenv.config({ path: ".env" });
  connection = mongoose.connect(process.env.MONGODB_URI_LOCAL_TEST);
  mongoose.Promise = global.Promise;
});

afterEach(async () => {
  await Host.remove();
  await Application.remove();
});

afterAll(async () => {
  await connection.close();
});

describe("HostService:", () => {
  it("should return all existing hosts when HostService.getHosts is called", async () => {
    const application = await new Application({
        "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const host = new Host({
        hostname: 'new-hostname.biz'
      }
    );
    host.applications.push(application._id);
    await host.save();
    const currentHosts = await Host.find({});
    const expectedHosts = await HostService.getHosts();
    expect(expectedHosts.length).toEqual(currentHosts.length);
    expect(expectedHosts[0].hostname).toEqual(currentHosts[0].hostname);
  });

  it("should return all applications (ordered by its apdex value) from a given host when HostService.getApplicationsFromHost is called", async () => {
    const application1 = await new Application({
        "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const application2 = await new Application({
        "name": "Small Old Pants - Dolan, and Sons",
        "contributors": ["Ignacio Dolan"],
        "version": 1,
        "apdex": 99,
      }
    ).save();
    const hostInformation = {
      hostname: 'new-hostname-with-apps.biz'
    };
    const host = new Host(hostInformation);
    host.applications.push(application1._id);
    host.applications.push(application2._id);
    await host.save();
    const receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications[0]._id).toEqual(application2._id);
    expect(receivedApplications[1]._id).toEqual(application1._id);
  });

  it("should delete the application from the host when HostService.deleteApplicationFromHost is called", async () => {
    const application1 = await new Application({
        "name": "Fresh  - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const application2 = await new Application({
        "name": "Old Pants - Sons",
        "contributors": ["Ignacio Dolan"],
        "version": 1,
        "apdex": 99,
      }
    ).save();
    const hostInformation = {
      hostname: 'new-hostname-with-apps-to-delete.biz'
    };
    let host = new Host(hostInformation);
    host.applications.push(application1._id);
    host.applications.push(application2._id);
    host = await host.save();
    let receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications.length).toEqual(2);

    await HostService.deleteApplicationFromHost(hostInformation.hostname, application2._id.toString());
    receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications.length).toEqual(1);
    expect(receivedApplications[0]._id).toEqual(application1._id);
  });

  it("should delete the application from the host when HostService.deleteApplicationFromHost is called", async () => {
    const application1 = await new Application({
        "name": "Fresh  - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const application2 = await new Application({
        "name": "Old Pants - Sons",
        "contributors": ["Ignacio Dolan"],
        "version": 1,
        "apdex": 99,
      }
    ).save();
    const hostInformation = {
      hostname: 'new-hostname-with-apps-to-delete.biz'
    };
    let host = new Host(hostInformation);
    host.applications.push(application1._id);
    host.applications.push(application2._id);
    host = await host.save();
    let receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications.length).toEqual(2);

    await HostService.deleteApplicationFromHost(hostInformation.hostname, application2._id.toString());
    receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications.length).toEqual(1);
    expect(receivedApplications[0]._id).toEqual(application1._id);
  });


  it("should add the application to the host when HostService.saveApplicationToHost is called", async () => {
    const application1 = await new Application({
        "name": "Fresh  - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const application2 = await new Application({
        "name": "Old Pants - Sons",
        "contributors": ["Ignacio Dolan"],
        "version": 1,
        "apdex": 99,
      }
    ).save();
    const hostInformation = {
      hostname: 'new-hostname-with-apps-to-delete.biz'
    };
    let host = new Host(hostInformation);
    host.applications.push(application1._id);
    host = await host.save();
    let receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications.length).toEqual(1);

    await HostService.saveApplicationToHost(hostInformation.hostname, application2._id.toString());
    receivedApplications = await HostService.getApplicationsFromHost(hostInformation.hostname);
    expect(receivedApplications.length).toEqual(2);
  });

});