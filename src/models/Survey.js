import mongoose from "mongoose";

// Schema cho các câu hỏi trong khảo sát
const QuestionSchema = new mongoose.Schema({
  question_header: { type: String, required: true }, // Tiêu đề câu hỏi
  question_type: { type: String, enum: ["text", "radio", "checkbox"], required: true }, // Loại câu hỏi
  question_required: { type: Boolean, default: false }, // Câu hỏi bắt buộc
  question_answer: { type: [String], default: [] }, // Câu trả lời
});

// Schema chính cho khảo sát
const SurveySchema = new mongoose.Schema({
  label: { type: String, required: true }, // Tên khảo sát
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người tạo khảo sát
  questions: { type: [QuestionSchema], required: true }, // Danh sách câu hỏi
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;
