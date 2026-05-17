import type { Request, Response } from "express";
import { transactionService } from "./transaction.service";
import { createTransactionSchema } from "./transaction.schema.js";

export class TransactionController {
  async getAll(_req: Request, res: Response): Promise<void> {
    const transactions = await transactionService.getAll();

    res.json(transactions);
  }

  async create(req: Request, res: Response): Promise<void> {
    /**
     * Runtime validation.
     *
     * Throws if invalid.
     */
    const dto = createTransactionSchema.parse(req.body);

    const transaction = await transactionService.create(dto);

    res.status(201).json(transaction);
  }
}

export const transactionController = new TransactionController();
