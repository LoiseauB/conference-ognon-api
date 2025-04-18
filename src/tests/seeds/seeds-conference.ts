import { Conference } from "../../entities/conference.entity";
import { ConferenceFixture } from "../fixtures/conference-fixtures";

export const e2eConference = {
  newConf: new ConferenceFixture(
    new Conference({
      id: "1",
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      endDate: new Date("2025-01-01T00:00:00.000Z"),
      seats: 100,
      organizerId: "john-doe",
    })
  ),
};
