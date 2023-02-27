import express from "express";
import Transactions from "../db/transactionModel.js";
import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import transactionsData from "../db/data.js";

const transactionsRouter = express.Router();

//get all transactions
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

//edit transaction
//should user be able to update accountNumber or IDNumber?
transactionsRouter.post(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transactions.findById(req.params.id);

    if (transaction) {
      transaction.date = req.body.date;
      transaction.sender.firstName = req.body.sender.firstName;
      transaction.sender.lastName = req.body.sender.lastName;
      transaction.sender.dateOfBirth = req.body.sender.dateOfBirth;
      transaction.sender.IDNumber = req.body.sender.IDNumber;
      transaction.recipient.firstName = req.body.recipient.firstName;
      transaction.recipient.lastName = req.body.recipient.lastName;
      transaction.recipient.email = req.body.recipient.email;
      transaction.recipient.accountNumber = req.body.recipient.accountNumber;
      transaction.recipient.bank = req.body.recipient.bank;
      transaction.status = req.body.status;

      await transaction.save();
      res.send({ message: "Transaction successfully updated." });
    } else {
      res.status(404).send({ message: "Transaction not found." });
    }
  })
);

//delete transaction
transactionsRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (transaction) {
      await transaction.remove();
      res.send({ message: "Transaction deleted." });
    } else {
      res.status(400).send({ message: "Transaction not found." });
    }
  })
);

export default transactionsRouter;
