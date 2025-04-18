import { NextFunction, Request, Response } from "express";
import container from "../config/dependency-injection";
import { OrganizeConferenceDTO } from "../dto/conference.dto";
import { RequestValidator } from "../utils/validate-requests";

export const organizeConference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { errors, input } = await RequestValidator(
      OrganizeConferenceDTO,
      req.body
    );

    if (errors) return res.jsonError(errors, 400);

    const result = await container
      .resolve("organizeConferenceUseCase")
      .execute({
        title: input.title,
        seats: input.seats,
        startDate: input.startDate,
        endDate: input.endDate,
        user: req.user,
      });
    return res.jsonSuccess({ id: result }, 201);
  } catch (error) {
    next(error);
  }
};

export const cancelConference = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) return res.jsonError("Missing id param", 400);

    const conference = await container
      .resolve("conferenceRepository")
      .findById(id);
    if (!conference) return res.jsonError("Conference not found", 404);

    await container.resolve("cancelConference").execute(conference, req.user);

    res.jsonSuccess(null, 200);
  } catch (error) {
    next(error);
  }
};
