import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema({
  firstName: { type: "string" },
  lastName: { type: "string" },
  email: { type: "string" },
  accountNumber: { type: "string" },
  bank: { type: "string" },
});

export default recipientSchema;
