import { extractCsv } from "../extractors/csv.extractor.js";
import { transformShopifyRow } from "../transformers/transaction.transformer.js";
import { validateTransactions } from "./validate-transactions.js";
import { loadTransactions } from "../loaders/transaction.loader.js";
import { AppDataSource } from "../../data-source.js";

/**
 * Full ETL.
 *
 * Extract
 * Transform
 * Validate
 * Load
 */
async function run() {
  /**
   * DB connection required
   */
  await AppDataSource.initialize();

  const rawRows = await extractCsv(
    "/Users/sam.dhanalakota/Desktop/JOBS/AFTER_CANADA/projects/affiliate-etl-platform/src/data/shopify_transactions.csv",
  );

  const transformedRows = rawRows.map(transformShopifyRow);
  const validation = validateTransactions(transformedRows);
  const loadResult = await loadTransactions(validation.validRows, 100);

  console.log({
    extracted: rawRows.length,
    valid: validation.validRows.length,
    invalid: validation.invalidRows.length,
    inserted: loadResult.insertedCount,
    skipped: loadResult.skippedCount,
    batches: loadResult.batchCount,
  });

  await AppDataSource.destroy();
}

await run();
