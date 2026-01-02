import { Request, Response } from "express";
import { CreateUser } from "../../../application/useCases/CreateUser.js";
import { EmailAlreadyInUseError } from "../../../domain/erros/EmailAlreadyInUseError.js";

export class RegisterUser {
  constructor(private readonly createUser: CreateUser) {}
  async handle(req: Request, res: Response) {
    try {
      await this.createUser.execute(req.body);
      return res
        .status(201)
        .send({ success: true, message: "User registered successfully" });
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError)
        return res
          .status(409)
          .send({ success: false, error: error.name, message: error.message });

      if (error instanceof Error)
        return res.status(500).json({
          success: false,
          error: "InternalServerError",
          message: error.message,
        });

      return res.status(500).json({
        success: false,
        error: "InternalServerError",
        message: "An unexpected error occurred",
      });
    }
  }
}
