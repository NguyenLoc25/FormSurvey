import mongoose from "mongoose";

// Schema cho câu hỏi trong khảo sát
const QuestionSchema = new mongoose.Schema({
  question_header: { type: String, required: true }, // Tiêu đề câu hỏi
  question_type: { type: String, enum: ["text", "radio", "checkbox"], required: true }, // Loại câu hỏi
  question_required: { type: Boolean, default: false }, // Câu hỏi bắt buộc
  question_answer: { type: [String], default: [] }, // Câu trả lời
});

// Schema chính cho khảo sát
const SurveySchema = new mongoose.Schema({
  label: { type: String, required: true }, // Tên khảo sát
  user: { 
    name: { type: String, required: true }, // Tên người dùng
    email: { type: String, required: true } // Email người dùng
  }, 
  questions: { type: [QuestionSchema], required: true }, // Danh sách câu hỏi
  survey_start_time: { type: Date, required: true }, // Thời gian bắt đầu khảo sát
  survey_end_time: { type: Date }, // Thời gian kết thúc khảo sát
  createdAt: { type: Date, default: Date.now }, // Ngày tạo
});

const Survey = mongoose.models.Survey || mongoose.model("Survey", SurveySchema);
export default Survey;
