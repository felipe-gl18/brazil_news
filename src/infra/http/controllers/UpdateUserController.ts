import { NextFunction, Request, Response } from "express";
import { UpdateUser } from "../../../application/useCases/UpdateUser.js";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUser) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.updateUser.execute(req.params.token, req.body);
      return res
        .status(201)
        .render("updated-successfully", { values: req.body });
    } catch (error) {
      if (error instanceof DomainError || error instanceof ApplicationError)
        return res.status(400).render("update", {
          errors: { [error.field || "form"]: error.message },
          values: req.body,
        });
      next(error);
    }
  }
}
