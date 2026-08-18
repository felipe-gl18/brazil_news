import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { DomainError } from "../../../domain/erros/DomainError.js";
import { RepositoryError } from "../../errors/RepositoryError.js";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof DomainError) {
    return res.status(400).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }

  if (error instanceof ApplicationError) {
    return res.status(400).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }

  if (error instanceof RepositoryError) {
    return res.status(500).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Unexpected error",
  });
}
