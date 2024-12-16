import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Survey from "@/models/Survey";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
      const body = await req.json(); // Lấy dữ liệu từ body request
  
      // Đảm bảo dữ liệu hợp lệ
      if (!body.label || !body.user || !body.questions || body.questions.length === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "Thiếu thông tin khảo sát." }),
          { status: 400 }
        );
      }
  
      // Kết nối database và lưu khảo sát
      await connectToDatabase(); // function kết nối database như trong lib/mongodb.js
  
      const newSurvey = new Survey(body);
      const savedSurvey = await newSurvey.save();
  
      return new Response(
        JSON.stringify({ success: true, message: "Khảo sát đã được lưu!", data: savedSurvey }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Lỗi xử lý API:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Lỗi xử lý dữ liệu." }),
        { status: 500 }
      );
    }
  }
  