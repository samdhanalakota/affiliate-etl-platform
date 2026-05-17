import { Transaction } from "../../entities/Transaction.js";
import { transactionRepository } from "../../modules/transactions/transaction.repository.js";

import type { CreateTransactionDto } from "../../modules/transactions/transaction.schema.js";
import { logger } from "../../utils/logger.js";

/**
 * Final ETL load result.
 *
 */
export type LoadResult = {
  insertedCount: number;
  skippedCount: number;
  batchCount: number;
};

/**
 * Splits a large list into smaller lists.
 *
 */
function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

/**
 * Load valid transactions into DB.
 *
 * batch insert
 ** Faster.
 ** Fewer DB round trips.
 ** Better throughput.
 */
export async function loadTransactions(
  rows: CreateTransactionDto[],
  batchSize = 100,
): Promise<LoadResult> {
  let insertedCount = 0;
  let skippedCount = 0;

  const batches = chunkArray(rows, batchSize);

  for (const batch of batches) {
    const entities = batch.map((row) =>
      transactionRepository.create({
        ...row,

        // DB entity expects Date, DTO has ISO string.
        occurredAt: new Date(row.occurredAt),
      }),
    );

    // Batch insert
    const result = await transactionRepository
      .createQueryBuilder()
      .insert()
      .values(entities)
      .orIgnore()
      .execute();

    const batchInserted = result.identifiers.length;

    insertedCount += batchInserted;
    skippedCount += batch.length - batchInserted;

    logger.info(
      {
        batchSize: batch.length,
        inserted: batchInserted,
        skipped: batch.length - batchInserted,
      },
      "Processed transaction batch",
    );
  }

  return {
    insertedCount,
    skippedCount,
    batchCount: batches.length,
  };
}
