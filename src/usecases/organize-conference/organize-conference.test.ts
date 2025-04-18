import { User } from "../../entities/user.entity";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference-repository";
import { FixedDateGenerator } from "../../utils/fixed-date-generator";
import { FixedGeneratorID } from "../../utils/fixed-id-generator";
import { OrganizeConference } from "./organize-coference";

describe("Organize conference", () => {
  const johnDoe = new User({
    id: "john-doe",
    email: "john.doe@email.com",
    password: "azerty",
  });
  let repository: InMemoryConferenceRepository;
  let fixed: FixedGeneratorID;
  let date: FixedDateGenerator;
  let useCase: OrganizeConference;

  beforeEach(() => {
    repository = new InMemoryConferenceRepository();
    fixed = new FixedGeneratorID();
    date = new FixedDateGenerator();
    useCase = new OrganizeConference(repository, fixed, date);
  });

  describe("Scenario: create conference", () => {
    const payload = {
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-04T00:00:00.000Z"),
      endDate: new Date("2025-01-01T00:00:00.000Z"),
      seats: 100,
      user: johnDoe,
    };
    it("should create a conference", async () => {
      const id = await useCase.execute(payload);

      const conference = await repository.findById(id);

      expect(conference!.props.title).toEqual("Ma nouvelle conference");
    });
  });

  describe("Scenario: Conference happens too soon", () => {
    const payload = {
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-01T00:00:00.000Z"),
      endDate: new Date("2025-01-01T00:00:00.000Z"),
      seats: 100,
      user: johnDoe,
    };

    it("should throw an error", async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrow(
        "The conference must happen in at least 3 days"
      );
    });
  });

  describe("Scenario: Conference has too many seats", () => {
    const payload = {
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-04T00:00:00.000Z"),
      endDate: new Date("2025-01-04T00:00:00.000Z"),
      seats: 1001,
      user: johnDoe,
    };
    it("should throw an error", async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrow(
        "The conference must has less than 1000 seats"
      );
    });
  });

  describe("Scenario: Conference has not enough seats", () => {
    const payload = {
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-04T00:00:00.000Z"),
      endDate: new Date("2025-01-04T00:00:00.000Z"),
      seats: 10,
      user: johnDoe,
    };
    it("should throw an error", async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrow(
        "The conference must has more than 20 seats"
      );
    });
  });

  describe("Scenario: Conference is too long", () => {
    const payload = {
      title: "Ma nouvelle conference",
      startDate: new Date("2025-01-04T00:00:00.000Z"),
      endDate: new Date("2025-01-04T04:00:00.000Z"),
      seats: 100,
      user: johnDoe,
    };
    it("should throw an error", async () => {
      await expect(() => useCase.execute(payload)).rejects.toThrow(
        "The conference is too long (> 3 hours)"
      );
    });
  });
});
