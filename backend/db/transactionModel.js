import mongoose from "mongoose";
import senderSchema from "./senderModel.js";
import recipientSchema from "./recipientModel.js";

// const senderSchema = new mongoose.Schema({
//   firstName: { type: "string" },
//   lastName: { type: "string" },
//   dateOfBirth: { type: "string" },
//   IDNumber: { type: "string" },
// });

// const recipientSchema = new mongoose.Schema({
//   firstName: { type: "string" },
//   lastName: { type: "string" },
//   email: { type: "string" },
//   accountNumber: { type: "string" },
//   bank: { type: "string" },
// });

const transactionsSchema = new mongoose.Schema({
  id: { type: "string" },
  date: { type: "number" },
  sender: { type: senderSchema },
  recipient: { type: recipientSchema },
  amount: { type: "number" },
  currencyCD: { type: "string" },
  comments: { type: "string" },
  status: { type: "string" },
});

const Transactions = mongoose.model("transactions", transactionsSchema);
export default Transactions;
