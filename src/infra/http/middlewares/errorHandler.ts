import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { DomainError } from "../../../domain/erros/DomainError.js";
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Unexpected error",
  });
}
