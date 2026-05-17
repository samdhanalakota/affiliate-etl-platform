import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/Transaction.js";

export const transactionRepository: Repository<Transaction> =
  AppDataSource.getRepository(Transaction);

export async function clearTransactions(): Promise<void> {
  // Repository.clear() maps to TRUNCATE on supported databases (Postgres included).
  await transactionRepository.clear();
}
