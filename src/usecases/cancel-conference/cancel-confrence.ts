import { Conference } from "../../entities/conference.entity";
import { User } from "../../entities/user.entity";
import { IConferenceRepository } from "../../interfaces/conference-repository.interface";
import { IMailer } from "../../interfaces/mailer.interface";

export type CancelConferencePayload = {
  conference: Conference;
  participants: User[];
};

export class CancelConference {
  constructor(
    private readonly repository: IConferenceRepository,
    private readonly mailer: IMailer
  ) {}
  async execute(conference: Conference, user: User): Promise<void> {
    if (conference.props.organizerId !== user.props.id) {
      throw new Error("Only organizer can cancel his conference");
    }

    if (
      conference.props.participants &&
      conference.props.participants.length > 0
    ) {
      conference.props.participants.map((participant) => {
        this.mailer.sendCancelNotification(participant, conference);
        return null;
      });
    }

    await this.repository.deleteOne(conference.props.id);
  }
}
