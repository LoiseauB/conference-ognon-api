import { AwilixContainer } from "awilix";
import jwt from "jsonwebtoken";
import { Dependencies } from "../../app/config/dependency-injection";
import { User } from "../../entities/user.entity";
import { IFixture } from "./fixture.interface";

export class UserFixture implements IFixture {
  constructor(public entity: User) {}

  async load(container: AwilixContainer<Dependencies>): Promise<void> {
    const repository = container.resolve("userRepository");
    await repository.create(this.entity);
  }

  createAuthorization() {
    return `Basic ${Buffer.from(
      `${this.entity.props.email}:${this.entity.props.password}`
    ).toString("base64")}`;
  }

  createJWTAuthorization() {
    const payload = { email: this.entity.props.email };
    return `Bearer ${jwt.sign(payload, "SECRET", { expiresIn: "1h" })}`;
  }
}
