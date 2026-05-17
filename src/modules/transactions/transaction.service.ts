import {
  clearTransactions,
  transactionRepository,
} from "./transaction.repository.js";
import { Transaction } from "../../entities/Transaction.js";
import type { CreateTransactionDto } from "./transaction.schema.js";
import { QueryFailedError } from "typeorm";
import { ConflictError } from "../../utils/errors";

export class TransactionService {
  /**
   * Fetch all transactions.
   */
  async getAll(): Promise<Transaction[]> {
    return transactionRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  /**
   * Creates new transaction.
   *
   */
  async create(dto: CreateTransactionDto): Promise<Transaction> {
    const transaction = transactionRepository.create({
      ...dto,

      // Convert string to JS Date.
      occurredAt: new Date(dto.occurredAt),
    });

    try {
      /**
       * INSERT into database.
       */
      return await transactionRepository.save(transaction);
    } catch (error) {
      /**
       * PostgreSQL unique violation.
       *
       * Error code:
       *
       * 23505
       */
      if (
        error instanceof QueryFailedError &&
        (error as any).driverError?.code === "23505"
      ) {
        throw new ConflictError("Transaction already exists");
      }

      throw error;
    }
  }

  async clearAll(): Promise<void> {
    await clearTransactions();
  }
}

export const transactionService = new TransactionService();
