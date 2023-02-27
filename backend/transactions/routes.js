import express from "express";
import Transactions from "../db/transactionModel.js";
import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import transactionsData from "../db/data.js";

const transactionsRouter = express.Router();

transactionsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const getAllTransactions = await Transactions.insertMany(
      transactionsData.transactions
    );
    res.send({
      getAllTransactions,
    });
  })
);

export default transactionsRouter;
