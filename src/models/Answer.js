const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  collection_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }], // Mảng ObjectId
  answers: [
    {
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      value: { type: String },
    },
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Answer", AnswerSchema) || mongoose.model("Answer", AnswerSchema);
