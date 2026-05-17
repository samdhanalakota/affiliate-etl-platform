import { z } from "zod";

export const createTransactionSchema = z.object({
  // Which source sent this data?
  source: z.string().min(1),

  // External system's transaction id.
  externalTransactionId: z.string().min(1),

  // Business partner.
  partnerName: z.string().min(1),

  amount: z.string(),

  currency: z.string().length(3),

  // Business status.
  status: z.string(),

  /**
   * ISO date string.
   *
   * Example:
   * 2026-05-16T10:30:00Z
   */
  occurredAt: z.string().datetime(),
});

// TypeScript type generated from schema.
export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
