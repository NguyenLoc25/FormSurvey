export const metadata = {
    title: "Khảo sát trực tuyến",
    description: "Trang khảo sát online với Next.js",
  };
  
  export default function SurveyLayout({ children }) {
    return (
      <html lang="vi">
        <body
          style={{
            fontFamily: "'Arial', sans-serif",
            lineHeight: "1.6",
            margin: "0",
            padding: "0",
            backgroundColor: "#f4f4f9",
            color: "#333",
          }}
        >
          <main
            style={{
              margin: "20px auto",
              padding: "20px",
              maxWidth: "800px",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            {children}
          </main>
          <footer
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <p>© 2024 Hệ thống khảo sát. Tất cả các quyền được bảo lưu.</p>
          </footer>
        </body>
      </html>
    );
  }
  