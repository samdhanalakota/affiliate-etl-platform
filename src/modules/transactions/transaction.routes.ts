import { Router } from "express";

import { transactionController } from "./transaction.controller.js";

export const transactionRouter = Router();

transactionRouter.get("/", transactionController.getAll);

// POST /transactions
transactionRouter.post(
  "/",
  transactionController.create,
);
