import * as request from "supertest";
import app from "../src/app";
import {HostService} from "../src/services/HostService";

const chai = require("chai");
const expect = chai.expect;

describe("GET /hosts", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/hosts")
      .expect(200, done);
  });

  it("should return 500 when service fails to retrieve hosts", (done) => {
    jest.spyOn(HostService, 'getHosts')
      .mockImplementation(function () {
        throw new Error('error mock');
      });
    request(app).get("/hosts")
      .expect(500, done);
  });
});

describe("PUT /hosts/:hostname/applications/:applicationId", () => {
  it("should return 200 OK", (done) => {
    jest.spyOn(HostService, 'saveApplicationToHost')
      .mockImplementation(function () {
        return true;
      });
    request(app).put("/hosts/test-of-add/applications/123213")
      .expect(200, done);
  });

  it("should return 500 when service fails to retrieve host", (done) => {
    jest.spyOn(HostService, 'saveApplicationToHost')
      .mockImplementation(function () {
        throw new Error('error mock');
      });
    request(app).put("/hosts/test-of-add/applications/123213")
      .expect(500, done);
  });
});