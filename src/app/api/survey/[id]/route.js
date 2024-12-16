import dbConnect from "@/lib/mongodb";
import Survey from "@/models/Survey";
import { checkAuth } from "@/lib/utils_server"; // Import hàm xác thực người dùng

// Xử lý GET cho khảo sát với ID cụ thể
export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Kết nối database
    await dbConnect();

    // Tìm khảo sát theo ID
    const survey = await Survey.findById(id);

    if (!survey) {
      return new Response(
        JSON.stringify({ success: false, message: "Khảo sát không tồn tại" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: survey }), {
      status: 200,
    });
  } catch (error) {
    console.error("Lỗi GET /api/survey/[id]:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Lỗi server" }),
      { status: 500 }
    );
  }
}

// Xử lý PUT cho khảo sát với ID cụ thể
export async function PUT(req, { params }) {
  const { id } = params;

  try {
    // Xác thực người dùng
    const userId = checkAuth(req);
    console.log("Authenticated user ID:", userId);

    if (!userId) {
      return new Response(
        JSON.stringify({ success: false, message: "Bạn chưa đăng nhập" }),
        { status: 401 }
      );
    }

    // Lấy dữ liệu từ body
    const updatedData = await req.json();
    console.log("Dữ liệu cập nhật:", updatedData);

    // Kết nối database
    await dbConnect();

    // Tìm khảo sát cần cập nhật
    const survey = await Survey.findById(id);

    if (!survey) {
      return new Response(
        JSON.stringify({ success: false, message: "Khảo sát không tồn tại" }),
        { status: 404 }
      );
    }

    // Kiểm tra quyền sở hữu
    if (survey.user.toString() !== userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Bạn không có quyền chỉnh sửa khảo sát này",
        }),
        { status: 403 }
      );
    }

    // Cập nhật khảo sát
    Object.assign(survey, updatedData); // Áp dụng dữ liệu mới vào khảo sát
    await survey.save();

    return new Response(
      JSON.stringify({ success: true, data: survey }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi PUT /api/survey/[id]:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Lỗi server" }),
      { status: 500 }
    );
  }
}
