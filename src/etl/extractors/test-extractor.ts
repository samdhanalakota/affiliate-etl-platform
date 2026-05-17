import {
  extractCsv,
} from "./csv.extractor.js";


const rows =
  await extractCsv(
    "src/data/shopify_transactions.csv",
  );


console.log(
  rows,
);