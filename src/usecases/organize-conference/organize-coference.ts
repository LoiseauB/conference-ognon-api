import { Conference } from "../../entities/conference.entity";
import { User } from "../../entities/user.entity";
import { IConferenceRepository } from "../../interfaces/conference-repository.interface";
import { IDateGenerator } from "../../interfaces/date-generator.interface";
import { IIDGenerator } from "../../interfaces/id-generator.interface";

export type OrganizeConferencePayload = {
  title: string;
  startDate: Date;
  endDate: Date;
  seats: number;
  user: User;
};

export class OrganizeConference {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly idGenerator: IIDGenerator,
    private readonly dateGenerator: IDateGenerator
  ) {}

  async execute({
    title,
    startDate,
    endDate,
    seats,
    user,
  }: OrganizeConferencePayload) {
    const id = this.idGenerator.generate();
    const conference = new Conference({
      id,
      title,
      startDate,
      endDate,
      seats,
      organizerId: user.props.id,
    });

    if (conference.isTooClose(this.dateGenerator.now())) {
      throw new Error("The conference must happen in at least 3 days");
    }
    if (conference.hasNotEnoughSeats(seats))
      throw new Error("The conference must has more than 20 seats");
    if (conference.hasTooManySeats(seats))
      throw new Error("The conference must has less than 1000 seats");
    if (conference.isTooLong())
      throw new Error("The conference is too long (> 3 hours)");
    await this.repository.create(conference);
    return id;
  }
}
