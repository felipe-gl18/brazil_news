import { NextFunction, Request, Response } from "express";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { FindUserByToken } from "../../../application/useCases/FindUserByToken.js";

export class UpdateAccountViewController {
  constructor(private readonly findUserByToken: FindUserByToken) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.query.token as string;
      const user = await this.findUserByToken.execute(token);
      console.log(user);
      return res.status(200).render("update", { token, values: user });
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
