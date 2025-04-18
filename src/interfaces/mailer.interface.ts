import { Conference } from "../entities/conference.entity";
import { User } from "../entities/user.entity";

export interface IMailer {
  sendCancelNotification(to: User, conference: Conference): void;
}
