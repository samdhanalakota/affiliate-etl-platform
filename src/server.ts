import express from "express";
import { AppDataSource } from "./data-source";
import { logger } from "./utils/logger";
import { env } from "./config/env";
import { transactionRouter } from "./modules/transactions/transaction.routes";
import { errorMiddleware }
  from "./middleware/error.middleware";

const app = express();

app.use(express.json());


app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    service: "affiliate-etl-platform",
    database: AppDataSource.isInitialized ? "connected" : "disconnected",
  });
});

app.use("/transactions", transactionRouter);

app.use(errorMiddleware);

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    logger.info("Database connected successfully");

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error, "Failed to start the server");
    process.exit(1);
  }
}

bootstrap();
