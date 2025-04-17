import { Conference } from "../entities/conference.entity";

export interface IConferenceRepository {
  findById(id: string): Promise<Conference | null>;
  create(conference: Conference): Promise<void>;
}
