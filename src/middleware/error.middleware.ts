import type { NextFunction, Response, Request } from "express";
import { AppError } from "../utils/errors";

// Zod validation errors
import { ZodError } from "zod";

// TypeORM DB errors
import { QueryFailedError } from "typeorm";

/**
 * Global error handler.
 *
 * Any thrown error eventually lands here.
 *
 */
export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  /**
   * Input validation errors.
   */
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        message: "Validation failed",

        details: err.issues,
      },
    });
    return;
  }

  /**
   * Database operation failed.
   */
  if (err instanceof QueryFailedError) {
    res.status(400).json({
      error: {
        message: "Database operation failed",
      },
    });

    return;
  }

  /**
   * Custom business errors.
   */
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });

    return;
  }

  /**
   * Unknown errors.
   */
  res.status(500).json({
    error: {
      message: "Internal server error",
    },
  });
}
