import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../../application/useCases/CreateUser.js";
export class RegisterUserController {
  constructor(private readonly createUser: CreateUser) {}
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      await this.createUser.execute(req.body);
      return res
        .status(201)
        .send({ success: true, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }
}
