import { NextFunction, Request, Response } from "express";
import { UserApplicationError } from "../../../application/erros/UserApplicationError";

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof UserApplicationError)
    return res.status(error.statusCode).json({
      success: false,
      error: error.name,
      message: error.message,
    });

  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Unexpected error",
  });
}
