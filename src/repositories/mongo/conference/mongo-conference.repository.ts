import { Model } from "mongoose";
import { Conference } from "../../../entities/conference.entity";
import { IConferenceRepository } from "../../../interfaces/conference-repository.interface";
import { MongoConferenceModel } from "./mongo-conference.model";

export class MongoConferenceRepository implements IConferenceRepository {
  constructor(
    private readonly model: Model<MongoConferenceModel.ConferenceDocument>
  ) {}

  async create(conference: Conference): Promise<void> {
    const document = new this.model({
      id: conference.props.id,
      title: conference.props.title,
      startDate: conference.props.startDate,
      endDate: conference.props.endDate,
      seats: conference.props.seats,
      organizerId: conference.props.organizerId,
    });
    await document.save();
  }

  async findById(id: string): Promise<Conference | null> {
    const conferenceDocument = await this.model.findOne({ id });

    if (!conferenceDocument) return null;

    return new Conference({
      id: conferenceDocument.id,
      title: conferenceDocument.title,
      startDate: conferenceDocument.startDate,
      endDate: conferenceDocument.endDate,
      seats: conferenceDocument.seats,
      organizerId: conferenceDocument.organizerId,
    });
  }

  async deleteOne(id: string): Promise<void> {
    console.log(`Deleting conference with id: ${id}`);
    const result = await this.model.findOneAndDelete({ id });
    if (!result) {
      console.log(`Conference with id ${id} not found.`);
    } else {
      console.log(`Conference with id ${id} deleted successfully.`);
    }
  }
}
