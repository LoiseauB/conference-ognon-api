import { Application } from "express";
import request from "supertest";
import { e2eConference } from "./seeds/seeds-conference";
import { e2eUsers } from "./seeds/seeds-user";
import { TestApp } from "./utils/test-app";

describe("UseCase: Cancel conference", () => {
  let testApp: TestApp;
  let app: Application;

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup();
    await testApp.loadFixtures([
      e2eUsers.john,
      e2eUsers.alice,
      e2eConference.newConf,
    ]);
    app = testApp.expressApp;
  });

  afterAll(async () => {
    testApp.teardown();
  });

  it("should cancel conference with authenticated user who it's conference's organizer", async () => {
    const response = await request(app)
      .delete("/conference/" + e2eConference.newConf.entity.props.id)
      .set("Authorization", e2eUsers.john.createJWTAuthorization());

    expect(response.status).toBe(200);
  });

  it("should not cancel conference with authenticated user who isn't the conference organizer", async () => {
    const response = await request(app)
      .delete("/conference/" + e2eConference.newConf.entity.props.id)
      .set("Authorization", e2eUsers.alice.createJWTAuthorization());

    expect(response.status).toBe(500);
    expect(response.body.error.message).toBe(
      "Only organizer can cancel his conference"
    );
  });
});
