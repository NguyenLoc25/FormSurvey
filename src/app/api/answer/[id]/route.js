import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Answer from "@/models/Answer";
import dbConnect from "@/lib/mongodb";

export async function POST(req, context) {
  try {
    // Lấy `params` từ `context`
    const { params } = context;
    const id = params.id;

    console.log('Collection ID:', id);

    // Kiểm tra nếu không có `id`
    if (!id) {
      console.log('Error: Collection ID is required');
      return new NextResponse(
        JSON.stringify({ success: false, error: "Collection ID is required" }),
        { status: 400 }
      );
    }

    // Kết nối MongoDB
    await dbConnect();
    console.log('Database connected.');

    // Lấy dữ liệu JSON từ body
    const { answers } = await req.json();
    console.log('Received answers:', answers);

    // Kiểm tra `answers`
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      console.log('Error: Invalid answers format');
      return new NextResponse(
        JSON.stringify({ success: false, error: "Invalid answers format" }),
        { status: 400 }
      );
    }

    // Tạo document mới trong MongoDB
    const newAnswer = new Answer({
      collection_id: mongoose.Types.ObjectId(id),
      answer_value: answers.map((answer) => ({
        question_id: mongoose.Types.ObjectId(answer.question_id),
        value: answer.value || "",
      })),
    });

    console.log('New answer object:', newAnswer);

    const savedAnswer = await newAnswer.save();
    console.log('Saved answer:', savedAnswer);

    return new NextResponse(
      JSON.stringify({ success: true, data: savedAnswer }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
