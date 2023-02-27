import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import transactionsRouter from "./transactions/routes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
const port = 8080;

app.use("/api/transactions", transactionsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
