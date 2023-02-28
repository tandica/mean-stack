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
    // const { startDate, endDate } = req.query;
    // const query = {};

    // if (startDate && endDate) {
    //   query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    // } else if (startDate) {
    //   query.date = { $gte: new Date(startDate) };
    // } else if (endDate) {
    //   query.date = { $lte: new Date(endDate) };
    // }

    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        query.date = { $gte: start, $lte: end };
      }
    }

    // const insertTransactions = await Transactions.insertMany(
    //   transactionsData.transactions
    // );

    const getAllTransactions = await Transactions.find(query);
    res.send({
      // insertTransactions,
      getAllTransactions,
    });
  })
);

//get one transaction
transactionsRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transactions.findOne({ id: req.params.id });

    if (transaction) {
      res.send(transaction);
    } else {
      res.status(404).send({ message: "Transaction not found." });
    }
  })
);

//add transaction
transactionsRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newTransaction = new Transactions({
      date: Date.now(),
      sender: {
        firstName: "first name",
        lastName: "last name",
        dateOfBirth: "1900-09-09",
        IDNumber: "100000",
      },
      recipient: {
        firstName: "first name",
        lastName: "last name",
        email: "email",
        accountNumber: "100000",
        bank: "bank",
      },
      status: "status",
    });
    const addTransaction = await newTransaction.save();
    res.send({ message: "Transaction created.", addTransaction });
  })
);

//edit transaction
//should user be able to update accountNumber or IDNumber?
transactionsRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transactions.findById(req.params._id);

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
      transaction.amount = req.body.amount;
      transaction.comments = req.body.comments;

      transaction.status = req.body.status;

      await transaction.save();
      res.send({ message: "Transaction successfully updated." });
    } else {
      res.status(404).send({ message: "Cannot update transaction." });
    }
  })
);

//delete transaction
transactionsRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const transaction = await Transactions.findById(req.params._id);

    if (transaction) {
      await transaction.remove();
      res.send({ message: "Transaction deleted." });
    } else {
      res.status(400).send({ message: "Cannot delete transaction." });
    }
  })
);

export default transactionsRouter;
