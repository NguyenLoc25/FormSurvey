import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
        <h1 className="text-6xl font-bold text-indigo-800 leading-snug">
  WebSurvey - Nền tảng khảo sát hiện đại
</h1>

          <p className="mt-4 text-lg text-gray-700">
            WebSurvey giúp bạn dễ dàng tạo và quản lý khảo sát trực tuyến, cung cấp giải pháp toàn diện cho việc thu thập và phân tích dữ liệu.
          </p>
        </header>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            Các tính năng nổi bật
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Tạo khảo sát dễ dàng
              </h3>
              <p className="text-gray-600">
                WebSurvey hỗ trợ tạo các khảo sát với đa dạng câu hỏi và dễ dàng quản lý dữ liệu.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Phân tích dữ liệu chi tiết
              </h3>
              <p className="text-gray-600">
                Biểu đồ và báo cáo chi tiết giúp bạn hiểu rõ kết quả khảo sát một cách nhanh chóng.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Chia sẻ và hợp tác dễ dàng
              </h3>
              <p className="text-gray-600">
                Tính năng chia sẻ và đồng bộ hóa với nhóm giúp bạn làm việc hiệu quả hơn.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 text-center bg-gray-50 py-10">
  <h2 className="text-3xl font-bold text-blue-800 mb-6">
    Tại sao chọn WebSurvey?
  </h2>
  <div className="space-y-6">
    <p className="text-lg text-gray-700">
      WebSurvey cung cấp một nền tảng mạnh mẽ và dễ sử dụng cho mọi loại khảo sát trực tuyến. 
    </p>
    <ul className="text-left space-y-4 text-gray-600">
      <li className="flex items-center">
        <span className="pl-2 mr-3 text-green-600">✔</span> Giao diện thân thiện với người dùng.
      </li>
      <li className="flex items-center">
        <span className="pl-2 mr-3 text-green-600">✔</span> Tối ưu hóa cho cả thiết bị di động và máy tính.
      </li>
      <li className="flex items-center">
        <span className="pl-2 mr-3 text-green-600">✔</span> Khả năng tùy chỉnh câu hỏi linh hoạt.
      </li>
      <li className="flex items-center">
        <span className="pl-2 mr-3 text-green-600">✔</span> Tích hợp trực tiếp với các công cụ phân tích dữ liệu mạnh mẽ.
      </li>
      <li className="flex items-center">
        <span className="pl-2 mr-3 text-green-600">✔</span> Bảo mật dữ liệu tối ưu, đáp ứng chuẩn GDPR.
      </li>
    </ul>
  </div>
</section>

{/* <!-- Phần sau đây được chuyển đổi từ trước: --> */}

<section className="mt-16 text-center">
  <h2 className="text-3xl font-bold text-blue-800 mb-6">
    Khám phá những tính năng mạnh mẽ của WebSurvey
  </h2>
  <p className="text-lg text-gray-700 mb-6">
    Với WebSurvey, bạn có thể dễ dàng tạo và quản lý các khảo sát trực tuyến một cách hiệu quả.
  </p>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Tạo câu hỏi linh hoạt</h3>
      <p className="text-gray-600">
        Tối ưu hóa khả năng tạo câu hỏi từ đơn giản đến phức tạp với nhiều loại câu hỏi khác nhau.
      </p>
      <p className="text-sm text-gray-500 mt-2 italic">"Web rất tiện lợi, dễ sử dụng và hỗ trợ tốt cho công việc khảo sát!"</p>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Dữ liệu phân tích chi tiết</h3>
      <p className="text-gray-600">
        Hệ thống cung cấp báo cáo và phân tích dữ liệu chi tiết giúp bạn nắm bắt thông tin một cách dễ dàng.
      </p>
      <p className="text-sm text-gray-500 mt-2 italic">"Cung cấp thông tin chi tiết giúp tôi dễ dàng ra quyết định!"</p>
    </div>
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">Bảo mật tối ưu</h3>
      <p className="text-gray-600">
        Bảo vệ dữ liệu của bạn với các chuẩn bảo mật cao nhất, đảm bảo an toàn cho thông tin cá nhân.
      </p>
      <p className="text-sm text-gray-500 mt-2 italic">"Dữ liệu được bảo vệ an toàn, tôi rất yên tâm khi sử dụng." </p>
    </div>
  </div>
</section>




        

        <footer className="mt-12 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} WebSurvey. Bản quyền đã được bảo lưu.
          </p>
        </footer>
      </div>
    </div>
  );
}

