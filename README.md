# Affiliate ETL Platform

Small backend project for storing affiliate transactions and running a CSV ETL flow.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=affiliate_etl
```

3. Start the app:

```bash
npm run dev
```

## Useful Commands

```bash
npm run dev
npm run start
npm test
npx tsx src/etl/pipeline/run-csv-etl.ts
```

## API (quick)

- `GET /health`
- `GET /transactions`
- `POST /transactions`

Sample `POST /transactions` body:

```json
{
  "source": "shopify",
  "externalTransactionId": "txn_123",
  "partnerName": "Acme",
  "amount": "49.99",
  "currency": "USD",
  "status": "paid",
  "occurredAt": "2026-05-16T10:30:00Z"
}
```

## Clear the Transactions Table

Use the service helper:

```ts
await transactionService.clearAll();
```

## Note

This project currently has TypeORM `synchronize: true` enabled, so treat it as development-first setup.