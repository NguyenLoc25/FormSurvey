export const metadata = {
  title: "Khảo sát trực tuyến",
  description: "Trang khảo sát online với Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <header style={{ backgroundColor: "#333", color: "#fff", padding: "10px", textAlign: "center" }}>
          <h1>Hệ thống khảo sát</h1>
        </header>
        <main style={{ margin: "20px" }}>{children}</main>
        <footer style={{ backgroundColor: "#333", color: "#fff", padding: "10px", textAlign: "center" }}>
          <p>© 2024 Hệ thống khảo sát</p>
        </footer>
      </body>
    </html>
  );
}
