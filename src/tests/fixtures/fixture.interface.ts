import { AwilixContainer } from "awilix";
import { Dependencies } from "../../app/config/dependency-injection";

export interface IFixture {
  load(container: AwilixContainer<Dependencies>): Promise<void>;
}
