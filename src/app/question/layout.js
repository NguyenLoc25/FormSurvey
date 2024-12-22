export default function QuestionLayout({ children }) {
    return (
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
        <header className=" bg-gradient-to-r from-purple-700 to-blue-500 p-4 rounded text-white">
          <h2>Hệ thống Câu hỏi</h2>
        </header>
        <main style={{ marginTop: "1rem" }}>{children}</main>
        <footer style={{ marginTop: "1rem", textAlign: "center", color: "#7f8c8d" }}>
          <p>&copy; 2024 Câu hỏi trực tuyến</p>
        </footer>
      </div>
    );
  }
  