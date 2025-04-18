import { asClass, asValue, createContainer } from "awilix";
import { IAuthenticator } from "../../interfaces/authenticator.interface";
import { IDateGenerator } from "../../interfaces/date-generator.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference-repository";
import { MongoUserRepository } from "../../repositories/mongo/mongo-user-repository";
import { MongoUserModel } from "../../repositories/mongo/mongo-user.model";
import { JwtAuthenticator } from "../../services/jwt-authenticator";
import { OrganizeConference } from "../../usecases/organize-coference";
import { CurrentDateGenerator } from "../../utils/current-date-generator";
import { UUIDGenerator } from "../../utils/uuid-generator";

export interface Dependencies {
  organizeConferenceUseCase: OrganizeConference;
  conferenceRepository: InMemoryConferenceRepository;
  userRepository: MongoUserRepository;
  idGenerator: IIDGenerator;
  dateGenerator: IDateGenerator;
  authenticator: IAuthenticator;
}

const container = createContainer<Dependencies>();

container.register({
  conferenceRepository: asClass(InMemoryConferenceRepository).singleton(),
  userRepository: asValue(new MongoUserRepository(MongoUserModel.UserModel)),
  idGenerator: asClass(UUIDGenerator).singleton(),
  dateGenerator: asClass(CurrentDateGenerator).singleton(),
});

const conferenceRepository = container.resolve("conferenceRepository");
const userRepository = container.resolve("userRepository");
const idGenerator = container.resolve("idGenerator");
const dateGenerator = container.resolve("dateGenerator");

container.register({
  organizeConferenceUseCase: asValue(
    new OrganizeConference(conferenceRepository, idGenerator, dateGenerator)
  ),
  authenticator: asValue(new JwtAuthenticator(userRepository)),
});

export default container;
