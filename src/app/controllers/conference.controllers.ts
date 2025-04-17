import { NextFunction, Request, Response } from "express";
import { OrganizeConferenceDTO } from "../dto/conference.dto";
import { RequestValidator } from "../utils/validate-requests";
import container from "../config/dependency-injection";

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

    const result = await container.resolve('organizeConferenceUseCase').execute({
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
