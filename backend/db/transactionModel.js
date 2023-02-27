import mongoose from "mongoose";
import senderSchema from "./senderModel.js";
import recipientSchema from "./recipientModel.js";

const transactionsSchema = new mongoose.Schema({
  id: { type: "string" },
  date: { type: "number" },
  sender: { type: senderSchema },
  recipient: { type: recipientSchema },
  amount: { type: "number" },
  currency: { type: "string" },
  comments: { type: "string" },
  status: { type: "string" },
});

const Transactions = mongoose.model("transactions", transactionsSchema);
export default Transactions;
