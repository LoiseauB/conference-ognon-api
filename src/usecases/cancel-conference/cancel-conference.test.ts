import { Conference } from "../../entities/conference.entity";
import { User } from "../../entities/user.entity";
import { InMemoryConferenceRepository } from "../../repositories/in-memory-conference-repository";
import { FakeMailer } from "../../utils/fake-mailer";
import { CancelConference } from "./cancel-confrence";

describe("Cancel conference", () => {
  const johnDoe = new User({
    id: "john-doe",
    email: "john.doe@email.com",
    password: "azerty",
  });
  const janeDoe = new User({
    id: "jane-doe",
    email: "jane.doe@email.com",
    password: "azerty",
  });

  const conference = new Conference({
    id: "1",
    title: "Ma nouvelle conference",
    startDate: new Date("2025-01-01T00:00:00.000Z"),
    endDate: new Date("2025-01-01T00:00:00.000Z"),
    seats: 100,
    organizerId: johnDoe.props.id,
  });

  let repository: InMemoryConferenceRepository;
  let mailer: FakeMailer;
  let useCase: CancelConference;

  beforeEach(() => {
    repository = new InMemoryConferenceRepository();
    mailer = new FakeMailer();
    useCase = new CancelConference(repository, mailer);
    repository.create(conference);
  });

  describe("Scenario: Cancel conference", () => {
    it("should cancel the conference", async () => {
      await useCase.execute(conference, johnDoe);

      expect(repository.database.length).toBe(0);
    });

    it("should not cancel the conference with wrong user", async () => {
      await expect(() => useCase.execute(conference, janeDoe)).rejects.toThrow(
        "Only organizer can cancel his conference"
      );
    });
  });

  describe("Scenario: send email to participants when conference is canceled", () => {
    conference.props.participants = [johnDoe];
    it("should send cancel notification email to conference participants", async () => {
      await useCase.execute(conference, johnDoe);
      expect(mailer.queue.length).toBe(1);
      expect(mailer.queue[0].to).toBe(johnDoe.props.email);
      expect(mailer.queue[0].message).toBe(
        `The conference ${conference.props.title} has been canceled`
      );
    });
  });
});
