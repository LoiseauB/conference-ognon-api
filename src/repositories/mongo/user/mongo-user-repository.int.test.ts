import { Model } from "mongoose";
import { e2eUsers } from "../../../tests/seeds/seeds-user";
import { TestApp } from "../../../tests/utils/test-app";
import { MongoUserRepository } from "./mongo-user-repository";
import { MongoUserModel } from "./mongo-user.model";

describe("MongoUserRepository", () => {
  let testApp: TestApp;
  let model: Model<MongoUserModel.UserDocument>;
  let repository: MongoUserRepository;

  beforeEach(async () => {
    testApp = new TestApp();
    await testApp.setup();

    model = MongoUserModel.UserModel;

    repository = new MongoUserRepository(model);

    const record = new model({
      _id: e2eUsers.alice.entity.props.id,
      email: e2eUsers.alice.entity.props.email,
      password: e2eUsers.alice.entity.props.password,
    });

    await record.save();
  });

  afterAll(async () => {
    await testApp.teardown();
  });

  describe("findByEmail method", () => {
    it("should return the user corresponding to the email", async () => {
      const user = await repository.findByEmail(
        e2eUsers.alice.entity.props.email
      );

      expect(user).toBeDefined();
      expect(user!.props).toEqual(e2eUsers.alice.entity.props);
    });
  });
});
