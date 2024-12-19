"use client";

import { useEffect, useState } from 'react';
import SubmitAnswerButton from "@/components/SubmitAnswerButton";

export default function QuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:3000/api/question');
        const data = await response.json();

        // In dữ liệu ra console
        console.log("Fetched Data:", data);

        // In thông tin cụ thể của từng câu hỏi
        data.forEach(q => {
          console.log(`Question ID: ${q._id}, Collection ID: ${q.collection_id}`);
        });

        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

    fetchQuestions();
  }, []);

  const handleBlur = (id) => {
    const question = questions.find(q => q._id === id);
    if (question.question_required && !question.value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [id]: "This field is required." }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [id]: undefined }));
    }
  };

  const handleInputChange = (id, value) => {
    setQuestions(prevQuestions => prevQuestions.map(q =>
      q._id === id ? { ...q, value } : q
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    questions.forEach(question => {
      if (question.question_required && !question.value.trim()) {
        newErrors[question._id] = "This field is required.";
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully');
      // Gửi dữ liệu đến SubmitAnswerButton
      
    }
  };

  return (
    <div className="py-10 w-full">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Survey Questions
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          {questions.map(({ _id, question_header, question_type }) => (
            <div key={_id} className="mb-6">
              <h2 className="text-2xl font-bold">{question_header || "No header available"}</h2>
              {question_type === 'text' && (
                <input
                  type="text"
                  id={`input-${_id}`} 
                  placeholder="Enter text"
                  onBlur={() => handleBlur(_id)}
                  onChange={(e) => handleInputChange(_id, e.target.value)}
                  className="mt-2 p-2 border border-gray-300 rounded"
                />
              )}
              {errors[_id] && (
                <p className="text-red-500 text-sm">{errors[_id]}</p>
              )}
            </div>
          ))}
        </div>
        
        <SubmitAnswerButton 
          collectionId={questions.map(q => q.collection_id)} 
          answers={questions.map(q => ({ question_id: q._id, value: q.value }))} 
        />
      </form>
    </div>
  );
}
