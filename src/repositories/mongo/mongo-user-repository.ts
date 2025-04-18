import { Model } from "mongoose";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../interfaces/user-repository.interface";
import { MongoUserModel } from "./mongo-user.model";

export class MongoUserRepository implements IUserRepository {
  constructor(private readonly model: Model<MongoUserModel.UserDocument>) {}

  async create(user: User): Promise<void> {
    const document = new this.model({
      _id: user.props.id,
      email: user.props.email,
      password: user.props.password,
    });
    await document.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await this.model.findOne({ email });

    if (!userDocument) return null;

    return new User({
      id: userDocument.id,
      email: userDocument.email,
      password: userDocument.password,
    });
  }
}
