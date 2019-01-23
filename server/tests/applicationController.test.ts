import * as request from "supertest";
import app from "../src/app";
import {HostService} from "../src/services/HostService";

const chai = require("chai");
const expect = chai.expect;

describe("GET /applications/", () => {
  it("should return 200 OK", (done) => {
    jest.spyOn(HostService, 'getApplicationsFromHost')
      .mockImplementation(function () {
        return []
      });
    request(app)
      .get("/applications")
      .query({ hostname: 'this-host-name-should-exist' })
      .expect(200, done);
  });

  it("should return 500 when service fails to retrieve hosts", (done) => {
    request(app)
      .get("/applications")
      .query({ hostname: '' })
      .end(function(err, res) {
        expect(res.error).not.to.be.undefined;
        done();
      }).expect(422)
  });
});
