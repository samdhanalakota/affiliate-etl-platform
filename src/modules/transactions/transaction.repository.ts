import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../../entities/Transaction.js";

export const transactionRepository: Repository<Transaction> =
  AppDataSource.getRepository(Transaction);
