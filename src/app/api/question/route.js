import dbConnect from "@/lib/mongodb"; // Connect to mongodb
import Question from "@/models/Question";
import Collection from "@/models/Question"; // Mongoose model
import { NextResponse } from "next/server";


export async function GET(request) {
    await dbConnect();
    const questions = await Question.find(); // Fetch all users
    return NextResponse.json(questions);
}

