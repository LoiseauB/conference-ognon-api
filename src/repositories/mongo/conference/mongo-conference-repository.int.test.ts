import { Model } from "mongoose";
import { e2eConference } from "../../../tests/seeds/seeds-conference";
import { TestApp } from "../../../tests/utils/test-app";
import { MongoConferenceModel } from "./mongo-conference.model";
import { MongoConferenceRepository } from "./mongo-conference.repository";
import { Conference } from "../../../entities/conference.entity";

describe("MongoConferenceRepository", () => {
  let testApp: TestApp;
  let model: Model<MongoConferenceModel.ConferenceDocument>;
  let repository: MongoConferenceRepository;

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup();

    model = MongoConferenceModel.ConferenceModel;
    repository = new MongoConferenceRepository(model);

    // Ajouter une conférence de test
    const record = new model({
      ...e2eConference.newConf.entity.props
    });

    await record.save();
  });

  afterAll(async () => {
    await testApp.teardown();
  });

  describe("create method", () => {
    it("should create a new conference", async () => {
      const newConference = new Conference({
        id: "conference-2",
        title: "Conférence 2",
        startDate: new Date("2023-10-02T09:00:00Z"),
        endDate: new Date("2023-10-02T17:00:00Z"),
        seats: 150,
        organizerId: "user-2",
      });

      await repository.create(newConference);

      const createdConference = await model.findOne({ id: "conference-2" });

      expect(createdConference).toBeDefined();
      expect(createdConference!.title).toBe("Conférence 2");
    });
  });

  describe("findById method", () => {
    it("should return the conference corresponding to the id", async () => {
      const conference = await repository.findById(
        e2eConference.newConf.entity.props.id
      );

      expect(conference).toBeDefined();
      expect(conference!.props).toEqual(e2eConference.newConf.entity.props);
    });
  });

  describe("deleteOne method", () => {
    it("should delete the conference corresponding to the id", async () => {
      await repository.deleteOne(e2eConference.newConf.entity.props.id);

      const deletedConference = await model.findOne({ id: e2eConference.newConf.entity.props.id });
      expect(deletedConference).toBeNull();
    });
  });
});
