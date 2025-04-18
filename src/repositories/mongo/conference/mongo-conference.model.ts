import mongoose, { Document, Schema } from "mongoose";
import { User } from "../../../entities/user.entity";
import { MongoUserModel } from "../user/mongo-user.model";

export namespace MongoConferenceModel {
  export const collectionName = "conferences";

  export interface ConferenceDocument extends Document {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    seats: number;
    participants: User[];
    organizerId: string;
  }

  export const ConferenceSchema = new Schema<ConferenceDocument>({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    seats: { type: Number, required: true, min: 20, max: 1000 },
    participants: [
      { type: Schema.Types.Mixed, ref: MongoUserModel.collectionName },
    ],
    organizerId: { type: String, required: true },
  });

  export const ConferenceModel = mongoose.model<ConferenceDocument>(
    collectionName,
    ConferenceSchema
  );
}
