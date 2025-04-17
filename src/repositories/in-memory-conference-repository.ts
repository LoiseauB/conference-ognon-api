import { Conference } from "../entities/conference.entity";
import { IConferenceRepository } from "../interfaces/conference-repository.interface";

export class InMemoryConferenceRepository implements IConferenceRepository {
  database: Conference[];

  constructor() {
    this.database = [];
  }

  async findById(id: string): Promise<Conference | null> {
    return this.database.find((conference) => conference.props.id === id) ?? null;
  }

  async create(conference: Conference): Promise<void> {
    this.database.push(conference);
  }
}
