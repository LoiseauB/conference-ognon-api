import { User } from "../entities/user.entity";
import { IAuthenticator } from "../interfaces/authenticator.interface";
import { IUserRepository } from "../interfaces/user-repository.interface";

export class BasicAuthenticator implements IAuthenticator {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}
  async authenticate(token: string): Promise<User> {
    // am9obi5kb2VAZW1haWwuY29tOmF6ZXJ0eQ==
    const decoded = Buffer.from(token, "base64").toString("utf-8"); // john.doe@email.com:azerty
    const [email, password] = decoded.split(":");

    const user = await this.userRepository.findByEmail(email);

    if(!user || user.props.password !== password) {
      throw new Error("User/Password wrong")
    }

    return user;
  }
}
  