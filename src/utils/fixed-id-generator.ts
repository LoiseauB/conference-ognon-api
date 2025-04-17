import { IIDGenerator } from "../interfaces/id-generator.interface";

export class FixedGeneratorID implements IIDGenerator {
  generate(): string {
    return "1";
  }
}
