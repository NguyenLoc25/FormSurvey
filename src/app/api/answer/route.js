import dbConnect from "@/lib/mongodb";
import Answer from "@/models/Answer";
import mongoose from "mongoose";

export async function POST(req) {
    try {
      const body = await req.json();
      const { collectionId, answers } = body;
  
      if (!collectionId || !Array.isArray(collectionId) || !answers || !Array.isArray(answers)) {
        return new Response(JSON.stringify({ error: "Invalid input data" }), { status: 400 });
      }
  
      await dbConnect();
  
      const collectionObjectIds = collectionId.map((id) => new mongoose.Types.ObjectId(id)); // Chuyển đổi sang ObjectId
  
      const newAnswer = new Answer({
        collection_id: collectionObjectIds, // Gán mảng ObjectId
        answers: answers.map((answer) => ({
          question_id: new mongoose.Types.ObjectId(answer.question_id), // Chuyển đổi question_id
          value: answer.value || "",
        })),
        created_at: new Date(),
      });
  
      const savedAnswer = await newAnswer.save();
      return new Response(JSON.stringify({ success: true, data: savedAnswer }), { status: 201 });
    } catch (error) {
      console.error("Error saving answers:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
  }


  export async function GET(request) {
    await dbConnect();
    const Answers = await Answer.find(); // Fetch all users
    return NextResponse.json(Answers);
}
