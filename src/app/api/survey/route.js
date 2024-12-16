import mongoose from "mongoose";
import dbConnect, { connectToDatabase } from "@/lib/mongodb";
import Survey from "@/models/Survey";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, responses, survey_start_time } = await req.json();

    if (!name || !email || !responses || !survey_start_time) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required." }),
        { status: 400 }
      );
    }

    const survey_end_time = new Date().toISOString(); // Lấy thời gian hiện tại làm thời gian kết thúc khảo sát

    // Tạo khảo sát mới
    const newSurvey = new Survey({
      label: "Khảo sát người dùng",
      user: { name, email },
      questions: [
        {
          question_header: "Bạn hài lòng với dịch vụ của chúng tôi không?",
          question_type: "text",
          question_required: true,
          question_answer: [responses],
        }
      ],
      survey_start_time,  // Thời gian bắt đầu khảo sát
      survey_end_time,    // Thời gian kết thúc khảo sát
    });

    await newSurvey.save();

    return new Response(JSON.stringify({ success: true, data: newSurvey }), { status: 201 });
  } catch (error) {
    console.error("Error saving survey:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
