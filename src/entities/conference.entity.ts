import { differenceInDays, differenceInHours } from "date-fns";
import { User } from "./user.entity";

export type ConferenceProps = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  seats: number;
  organizerId: string;
  participants?: User[];
};

export class Conference {
  constructor(public props: ConferenceProps) {
    this.props.participants = [];
  }

  isTooClose(now: Date): boolean {
    return differenceInDays(this.props.startDate, now) < 3;
  }

  hasTooManySeats(seats: number): boolean {
    return seats > 1000;
  }

  hasNotEnoughSeats(seats: number): boolean {
    return seats < 20;
  }

  isTooLong(): boolean {
    return differenceInHours(this.props.endDate, this.props.startDate) > 3;
  }
}
