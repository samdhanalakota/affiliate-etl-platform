import {
  createTransactionSchema,
} from "../../modules/transactions/transaction.schema.js";

import type {
  CreateTransactionDto,
} from "../../modules/transactions/transaction.schema.js";


/**
 * A row that passed validation.
 */
type ValidRow = {
  success: true;
  data: CreateTransactionDto;
};


/**
 * A row that failed validation.
 */
type InvalidRow = {
  success: false;

  // Original row position in the file.
  rowNumber: number;

  // Validation error messages.
  errors: string[];
};


/**
 * Final validation result.
 *
 * ETL systems should not blindly crash on one bad row.
 * We separate valid rows from invalid rows.
 */
export type ValidationResult = {
  validRows: CreateTransactionDto[];
  invalidRows: InvalidRow[];
};


/**
 * Validate transformed rows.
 *
 * Important:
 * safeParse() does not throw.
 *
 * parse() throws.
 *
 * In ETL pipelines, safeParse() is often better because
 * we want to collect bad rows and continue processing.
 */
export function validateTransactions(
  rows: CreateTransactionDto[],
): ValidationResult {
  const validRows: CreateTransactionDto[] = [];
  const invalidRows: InvalidRow[] = [];

  rows.forEach((row, index) => {
    const result =
      createTransactionSchema.safeParse(row);

    if (result.success) {
      validRows.push(result.data);
      return;
    }

    invalidRows.push({
      rowNumber: index + 1,
      success: false,
      errors:
        result.error.issues.map(
          (issue) =>
            `${issue.path.join(".")}: ${issue.message}`,
        ),
    });
  });

  return {
    validRows,
    invalidRows,
  };
}