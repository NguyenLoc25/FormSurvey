'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function SurveyPage() {
  const { id } = useParams(); // Lấy `id` từ URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    responses: "",
    survey_start_time: new Date().toISOString(),  // Thêm thời gian bắt đầu khảo sát
  });
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái isLoading
  const [countdown, setCountdown] = useState(60); // Thêm trạng thái countdown
  const [completionTime, setCompletionTime] = useState(null); // Thêm trạng thái thời gian hoàn thành
  const [isModalVisible, setIsModalVisible] = useState(true); // Thêm trạng thái hiển thị modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Bật trạng thái loading

    try {
      const response = await fetch("http://localhost:3000/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCompletionTime(new Date().toLocaleTimeString()); // Lưu thời gian hoàn thành khảo sát
      } else {
        alert("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  const handleStartClick = () => {
    setIsModalVisible(false); // Ẩn modal khi click vào "Bắt Đầu"
  };

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setCountdown(60); // Reset lại đếm ngược khi không còn loading
    }

    return () => clearInterval(interval); // Xóa interval khi component bị unmount
  }, [isLoading]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Arial', sans-serif",
      }}
    >
      {isModalVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "300px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h2>Bắt Đầu khảo sát</h2>
            <button
              onClick={handleStartClick}
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                fontSize: "16px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Bắt Đầu
            </button>
          </div>
        </div>
      )}

      {!isModalVisible && (
        <>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Vui lòng điền khảo sát
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Tên:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                Câu trả lời:
              </label>
              <textarea
                value={formData.responses}
                onChange={(e) =>
                  setFormData({ ...formData, responses: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  fontSize: "16px",
                  resize: "none",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading} // Disable button khi isLoading là true
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007BFF",
                color: "#fff",
                fontSize: "16px",
                borderRadius: "5px",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? `Đang gửi... (${countdown})` : "Gửi khảo sát"}
            </button>
          </form>

          {completionTime && (
            <p style={{ marginTop: "20px", textAlign: "center", color: "#333" }}>
              Khảo sát hoàn thành lúc: {completionTime}
            </p>
          )}
        </>
      )}
    </div>
  );
}
