import { addDays, addHours } from "date-fns";
import { Application } from "express";
import request from "supertest";
import { e2eUsers } from "./seeds/seeds-user";
import { TestApp } from "./utils/test-app";

describe("UseCase: Organize conference", () => {
  const body = {
    title: "Ma nouvelle conference",
    seats: 100,
    startDate: addDays(new Date(), 4).toISOString(),
    endDate: addDays(addHours(new Date(), 2), 4).toISOString(),
  };

  let testApp: TestApp;
  let app: Application;

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup();
    await testApp.loadFixtures([e2eUsers.john]);
    app = testApp.expressApp;
  });

  afterAll(async () => {
    testApp.teardown();
  });

  it("should organize a conference with authenticated user", async () => {
    const response = await request(app)
      .post("/conference")
      .set("Authorization", e2eUsers.john.createJWTAuthorization())
      .send(body);

    expect(response.status).toBe(201);
    expect(response.body.data).toEqual({ id: expect.any(String) });
  });

  it("should fail if unauthorized", async () => {
    const response = await request(app).post("/conference").send(body);

    expect(response.status).toBe(403);
  });
});
