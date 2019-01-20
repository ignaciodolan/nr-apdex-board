"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const app_1 = require("../app");
describe("GET /hosts", () => {
    it("should return 200", () => {
        return request(app_1.default).get("/hosts")
            .expect(200);
    });
});
describe("GET /hosts", () => {
    it("should return the list of all hosts", (done) => {
        request(app_1.default).get("/hosts")
            .end(function (err, res) {
            const hosts = res.body;
            expect(hosts).toBeDefined();
            done();
        })
            .expect(200);
    });
});
//# sourceMappingURL=api.test.js.map