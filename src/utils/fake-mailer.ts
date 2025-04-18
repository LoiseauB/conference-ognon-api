import { Conference } from "../entities/conference.entity";
import { User } from "../entities/user.entity";
import { IMailer } from "../interfaces/mailer.interface";

export class FakeMailer implements IMailer {
  public queue: { to: string; message: string }[];

  constructor() {
    this.queue = [];
  }

  sendCancelNotification(to: User, conference: Conference): void {
    this.queue.push({
      to: to.props.email,
      message: `The conference ${conference.props.title} has been canceled`,
    });
  }
}
