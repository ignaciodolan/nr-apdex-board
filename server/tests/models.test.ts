import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import Host  from '../src/models/Host';
import Application from '../src/models/Application';

let connection;

beforeAll(async () => {
  dotenv.config({ path: ".env" });
  connection = mongoose.connect(process.env.MONGODB_URI_LOCAL_TEST);
  mongoose.Promise = global.Promise;
});

afterAll(async () => {
  await Host.remove();
  await Application.remove();
  await connection.close();
});

describe("Model: Application", () => {
  it("should save the application and generate an id of the new application", async () => {
    const applicationInformation = {
      "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
      "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
      "version": 7,
      "apdex": 68,
    };
    await new Application(applicationInformation).save();
    const application = await Application.findOne({name: applicationInformation.name});
    expect(application.name).toEqual(applicationInformation.name);
    expect(application._id).toBeDefined();
    expect(application.updated_at).toBeDefined();
    expect(application.updated_at).toBeDefined();
  });
});

describe("Model: Host", () => {
  it("should save the host and the id of the new application", async () => {
    const application = await new Application({
        "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const host = new Host({
        hostname: '7e6272f7-098e.dakota.biz'
      }
    );
    host.applications.push(application._id);
    await host.save();

    const expectedHost = await Host.findOne({ hostname: '7e6272f7-098e.dakota.biz' });
    expect(expectedHost.hostname).toEqual('7e6272f7-098e.dakota.biz');
    expect(expectedHost.applications.length).toEqual(1);
    console.log(expectedHost.applications[0]);
    expect(expectedHost.applications[0]._id).toEqual(application._id);
  });
});