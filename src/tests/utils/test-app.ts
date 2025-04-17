import { AwilixContainer } from "awilix";
import express, { Application } from "express";
import container, { Dependencies } from "../../app/config/dependency-injection";
import { errorHandlerMiddleware } from "../../app/middlewares/error-handler.middleware";
import { jsonResponseMiddleware } from "../../app/middlewares/json-response.middleware";
import conferenceRoutes from "../../app/routes/conference.route";
import { IFixture } from "../fixtures/fixture.interface";

export class TestApp {
  private app: Application;
  private container: AwilixContainer<Dependencies>;

  constructor() {
    this.app = express();
    this.container = container;
  }

  async setup() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(jsonResponseMiddleware);
    this.app.use(conferenceRoutes);
    this.app.use(errorHandlerMiddleware);
  }

  async loadFixtures(fixtures: IFixture[]) {
    return Promise.all(fixtures.map((fixture) => fixture.load(this.container)));
  }

  get expressApp() {
    return this.app;
  }
}
