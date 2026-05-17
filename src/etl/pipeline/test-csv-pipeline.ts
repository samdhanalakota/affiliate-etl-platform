import {
  extractCsv,
} from "../extractors/csv.extractor.js";

import {
  transformShopifyRow,
} from "../transformers/transaction.transformer.js";

import {
  validateTransactions,
} from "./validate-transactions.js";


/**
 * Test pipeline:
 *
 * CSV
 * → Extract
 * → Transform
 * → Validate
 */
const rawRows =
  await extractCsv(
    "/Users/sam.dhanalakota/Desktop/JOBS/AFTER_CANADA/projects/affiliate-etl-platform/src/data/shopify_transactions.csv",
  );

console.log("FIRST RAW ROW:", rawRows[0]);

const transformedRows =
  rawRows.map(transformShopifyRow);
console.log("FIRST TRANSFORMED ROW:", transformedRows[0]);
const result =
  validateTransactions(transformedRows);

console.log({
  validCount: result.validRows.length,
  invalidCount: result.invalidRows.length,
  invalidRows: result.invalidRows,
});