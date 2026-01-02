import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../../../application/erros/ApplicationError.js";
import { DomainError } from "../../../domain/erros/DomainError.js";
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error, "errorHandler");

  if (error instanceof ApplicationError)
    return res.status(error.statusCode).json({
      success: false,
      error: error.name,
      message: error.message,
    });

  if (error instanceof DomainError) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error: error.name,
      message: error.message,
    });
  }
  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Unexpected error",
  });
}
