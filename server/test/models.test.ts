import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import Host  from '../models/Host';
import Application from '../models/Application';

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

async function createApplicationsAndHost() {
  const application = new Application({
      "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
      "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
      "version": 7,
      "apdex": 68,
    }
  );
  await application.save();
  const host = new Host({
      url: '7e6272f7-098e.dakota.biz'
    }
  );
  host.applications.push(application._id);
  await host.save();
}

describe("Model: Application", () => {
  it("should save the host and the id of the new application", async (done) => {
    const application = await new Application({
        "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const host = new Host({
        url: '7e6272f7-098e.dakota.biz'
      }
    );
    host.applications.push(application._id);
    await host.save();

    const expectedHost = await Host.findOne({ url: '7e6272f7-098e.dakota.biz' });
    expect(expectedHost.url).toEqual('7e6272f7-098e.dakota.biz');
    expect(expectedHost.applications.length).toEqual(1);
    console.log(expectedHost.applications[0]);
    expect(expectedHost.applications[0]._id).toEqual(application._id);
  });
});

describe("Model: Host", () => {
  it("should save the host and the id of the new application", async (done) => {
    const application = await new Application({
        "name": "Small Fresh Pants - Kautzer - Boyer, and Sons",
        "contributors": ["Edwin Reinger", "Ofelia Dickens", "Hilbert Cole", "Helen Kuphal", "Maurine McDermott Sr."],
        "version": 7,
        "apdex": 68,
      }
    ).save();
    const host = new Host({
        url: '7e6272f7-098e.dakota.biz'
      }
    );
    host.applications.push(application._id);
    await host.save();

    const expectedHost = await Host.findOne({ url: '7e6272f7-098e.dakota.biz' });
    expect(expectedHost.url).toEqual('7e6272f7-098e.dakota.biz');
    expect(expectedHost.applications.length).toEqual(1);
    console.log(expectedHost.applications[0]);
    expect(expectedHost.applications[0]._id).toEqual(application._id);
  });
});