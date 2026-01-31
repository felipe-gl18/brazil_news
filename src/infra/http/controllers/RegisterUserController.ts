import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../../application/useCases/CreateUser.js";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
export class RegisterUserController {
  constructor(private readonly createUser: CreateUser) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.createUser.execute(req.body);
      return res
        .status(201)
        .send({ success: true, message: "User registered successfully" });
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
