import { AwilixContainer } from "awilix";
import { IFixture } from "./fixture.interface";
import { Dependencies } from "../../app/config/dependency-injection";
import { Conference } from "../../entities/conference.entity";

export class ConferenceFixture implements IFixture {
  constructor(public entity: Conference) {}

  async load(container: AwilixContainer<Dependencies>): Promise<void> {
    const repository = container.resolve('conferenceRepository');
    await repository.create(this.entity);
  }
}