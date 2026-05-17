import type { RawCsvRow } from "../extractors/csv.extractor";
import type { CreateTransactionDto } from "../../modules/transactions/transaction.schema";

export function transformShopifyRow(row: RawCsvRow): CreateTransactionDto {
  return {
    source: "shopify",
    externalTransactionId: row.transaction_id,

    partnerName: row.partner_name,

    amount: row.amount,

    currency: row.currency,

    status: row.status,

    occurredAt: row.occurred_at,
  };
}
