import { User } from "../entities/user.entity";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class InMemoryUserRepository implements IUserRepository {
  database: User[];

  constructor() {
    this.database = [];
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.database.find((user) => user.props.email === email) ?? null;
  }

  async create(user: User): Promise<void> {
    this.database.push(user)
  }
}
