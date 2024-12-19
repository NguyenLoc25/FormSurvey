import { NextResponse } from "next/server";
import Question from "@/models/Question";
import dbConnect from "@/lib/mongodb";
export async function GET(req, { params }) {
  const { id } = params;

  try {
    await dbConnect();

    const question = await Question.findById(id)
      .populate("question_header");
    if (!question) {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, question });
  } catch (error) {
    console.error("Error fetching question:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

