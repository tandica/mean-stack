import mongoose from "mongoose";

const senderSchema = new mongoose.Schema({
  firstName: { type: "string" },
  lastName: { type: "string" },
  dateOfBirth: { type: "string" },
  IDNumber: { type: "string" },
});

export default senderSchema;
