import { NextFunction, Request, Response } from "express";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { FindUserByToken } from "../../../application/useCases/FindUserByToken.js";
import { IDateService } from "../../../application/services/IDateService.js";

export class UpdateAccountViewController {
  constructor(
    private readonly findUserByToken: FindUserByToken,
    private readonly systemDateService: IDateService,
  ) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.query.token as string;
      const user = await this.findUserByToken.execute(token);
      return res.status(200).render("update", {
        token,
        values: {
          name: user?.name,
          email: user?.email.valueOf,
          deliveryTime: this.systemDateService.parseDateToString(
            user?.deliveryTime!,
            user?.timezone!,
          ),
          timezone: user?.timezone,
          topics: user?.topics,
        },
      });
    } catch (error) {
      if (error instanceof DomainError || error instanceof ApplicationError)
        return res.status(400).render("home", {
          errors: { [error.field || "form"]: error.message },
          values: req.body,
        });
      next(error);
    }
  }
}
