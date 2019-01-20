import * as request from 'supertest';
import app from "src/app.ts";

describe("GET /hosts", () => {
  it("should return 200", () => {
    return request(app).get("/hosts")
      .expect(200);
  });
});

describe("GET /hosts", () => {
  it("should return the list of all hosts", (done) => {
    request(app).get("/hosts")
      .end(function(err, res) {
        const hosts = res.body;
        expect(hosts).toBeDefined();
        done();
      })
      .expect(200);
  });
});