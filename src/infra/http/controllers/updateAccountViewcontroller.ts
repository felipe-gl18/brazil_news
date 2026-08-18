import { NextFunction, Request, Response } from "express";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { IDateService } from "../../../application/interfaces/IDateService.js";
import { UserService } from "../../../application/services/UserService.js";

export class UpdateAccountViewController {
  constructor(
    private readonly userService: UserService,
    private readonly systemDateService: IDateService,
  ) {}

  async handle(req: Request, res: Response) {
    const token = req.query.token as string;
    const user = await this.userService.findUserByToken(token);
    return res.status(200).render("update", {
      token,
      values: {
        name: user?.name,
        email: user?.email?.valueOf,
        deliveryTime: this.systemDateService.parseDateToString(
          user?.deliveryTime!,
          user?.timezone!,
        ),
        timezone: user?.timezone,
        topics: user?.topics,
      },
    });
  }
}
