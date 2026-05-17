// Node filesystem streams.
import fs from "fs";
// CSV streaming parser
import csv from "csv-parser";

import { logger } from "../../utils/logger";

export type RawCsvRow = {
  transaction_id: string;

  partner_name: string;

  amount: string;

  currency: string;

  status: string;

  occurred_at: string;
};

/**
 * Extract raw rows from CSV.
 *
 * Streams are event-based.
 */
export async function extractCsv(filePath: string): Promise<RawCsvRow[]> {
  return new Promise((resolve, reject) => {
    const rows: RawCsvRow[] = [];
    /**
     * Create file stream.
     *
     * Reads file in chunks.
     */
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: RawCsvRow) => {
        rows.push(row);
      })
      .on("end", () => {
        logger.info(`Extracted ${rows.length} rows`);
        resolve(rows);
      })
      .on("error", reject);
  });
}
