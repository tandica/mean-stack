import express from "express";
import Transactions from "../db/transactionModel.js";
import expressAsyncHandler from "express-async-handler";

const transactionsRouter = express.Router();


transactionsRouter.get(
  "/filter",
  expressAsyncHandler(async (req, res) => {
    const pageSize = +req.query.pageSize || 5;
    const skip = (+req.query.page - 1) * pageSize;

    // Get search query from filter (if present)
    const searchQuery = req.query.search;

    // Get start and end dates from filter (if present)
    const startDate = req.query.startDate ? new Date(req.query.startDate).setHours(0,0,0,0) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate).setHours(23,59,59,59) : null;

    // Build filter object based on search query and/or dates
    const filter = {};
    if (searchQuery) {
      filter.status =  searchQuery;
    }
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    } else if (startDate) {
      filter.date = { $gte: startDate };
    } else if (endDate) {
      filter.date = { $lte: endDate };
    }

    const totalCount = await Transactions.countDocuments(filter)
    // Find data based on filter using Mongoose
    const data = await Transactions.find(filter).skip(skip).limit(pageSize).then((getAllTransactions) => {
      return res.status(200).json({ getAllTransactions, totalCount });
    });
  })
);


//get all transactions
transactionsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = +req.query.pageSize || 5;
    const skip = (+req.query.page - 1) * pageSize;
    const totalCount = await Transactions.countDocuments();
    return Transactions.find()
      .skip(skip)
      .limit(pageSize)
      .then((getAllTransactions) => {
        return res.status(200).json({ getAllTransactions, totalCount });
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
    const newTransaction = req.body;
    newTransaction.date = new Date();
    const addTransaction = await Transactions.create(newTransaction);
    res.status(201).json(addTransaction);
  })
);

//edit transaction
//should user be able to update accountNumber or IDNumber?
transactionsRouter.put(
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
    const transaction = await Transactions.findById(req.params.id);

    if (transaction) {
      await transaction.remove();
      res.send({ message: "Transaction deleted." });
    } else {
      res.status(400).send({ message: "Cannot delete transaction." });
    }
  })
);

export default transactionsRouter;
