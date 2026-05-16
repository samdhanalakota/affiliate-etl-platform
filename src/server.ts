import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    service: "affiliate-etl-platform"
  });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running in Port: 3000")
});