'use client';

import { useState } from "react";

export default function SurveyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    responses: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/survey/:id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Khảo sát được lưu thành công!");
        setFormData({ name: "", email: "", responses: "" });
      } else {
        alert("Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
    }
  };

  return (
    <div>
      <h2>Vui lòng điền khảo sát:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
        <div>
          <label>Câu trả lời:</label>
          <textarea
            value={formData.responses}
            onChange={(e) => setFormData({ ...formData, responses: e.target.value })}
            required
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>Gửi khảo sát</button>
      </form>
    </div>
  );
}
