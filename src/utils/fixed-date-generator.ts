import { IDateGenerator } from "../interfaces/date-generator.interface";

export class FixedDateGenerator implements IDateGenerator {
  now(): Date {
    return new Date("2025-01-01T00:00:00.000Z");
  }
}
