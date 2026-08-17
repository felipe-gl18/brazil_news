import { NextFunction, Request, Response } from "express";
import { CreateUser } from "../../../application/useCases/CreateUser.js";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { CreateUserDTO } from "../../../application/useCases/CreateUserDTO.js";

export class RegisterUserController {
  constructor(private readonly createUser: CreateUser) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const topics = Array.isArray(req.body.topics)
        ? req.body.topics
        : req.body.topics
          ? [req.body.topics]
          : [];

      const dto: CreateUserDTO = {
        name: req.body.name,
        email: req.body.email,
        telegramChatId: req.body.telegramChatId || undefined,
        notificationChannel: req.body.notificationChannel,
        topics,
        deliveryTime: req.body.deliveryTime,
        timezone: req.body.timezone,
        language: req.body.language,
      };

      await this.createUser.execute(dto);
      return res.status(201).render("registered", { values: req.body });
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
