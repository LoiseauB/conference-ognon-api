import { asClass, asValue, createContainer } from "awilix";
import { IAuthenticator } from "../../interfaces/authenticator.interface";
import { IDateGenerator } from "../../interfaces/date-generator.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { IMailer } from "../../interfaces/mailer.interface";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference-repository";
import { MongoUserRepository } from "../../repositories/mongo/user/mongo-user-repository";
import { MongoUserModel } from "../../repositories/mongo/user/mongo-user.model";
import { JwtAuthenticator } from "../../services/jwt-authenticator";
import { CancelConference } from "../../usecases/cancel-conference/cancel-confrence";
import { OrganizeConference } from "../../usecases/organize-conference/organize-coference";
import { CurrentDateGenerator } from "../../utils/current-date-generator";
import { FakeMailer } from "../../utils/fake-mailer";
import { UUIDGenerator } from "../../utils/uuid-generator";

export interface Dependencies {
  organizeConferenceUseCase: OrganizeConference;
  cancelConference: CancelConference;
  conferenceRepository: InMemoryConferenceRepository;
  userRepository: MongoUserRepository;
  idGenerator: IIDGenerator;
  dateGenerator: IDateGenerator;
  authenticator: IAuthenticator;
  mailer: IMailer;
}

const container = createContainer<Dependencies>();

container.register({
  conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
  userRepository: asValue(new MongoUserRepository(MongoUserModel.UserModel)),
  idGenerator: asClass(UUIDGenerator).singleton(),
  dateGenerator: asClass(CurrentDateGenerator).singleton(),
  mailer: asClass(FakeMailer).singleton(),
});

const conferenceRepository = container.resolve("conferenceRepository");
const userRepository = container.resolve("userRepository");
const idGenerator = container.resolve("idGenerator");
const dateGenerator = container.resolve("dateGenerator");
const mailer = container.resolve("mailer");

container.register({
  organizeConferenceUseCase: asValue(
    new OrganizeConference(conferenceRepository, idGenerator, dateGenerator)
  ),
  authenticator: asValue(new JwtAuthenticator(userRepository)),
  cancelConference: asValue(new CancelConference(conferenceRepository, mailer)),
});

export default container;
