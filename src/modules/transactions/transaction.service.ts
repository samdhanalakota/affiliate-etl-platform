import { transactionRepository } from "./transaction.repository.js";
import { Transaction } from "../../entities/Transaction.js";
import type { CreateTransactionDto } from "./transaction.schema.js";

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

    /**
     * INSERT into database.
     */
    return transactionRepository.save(transaction);
  }
}

export const transactionService = new TransactionService();
