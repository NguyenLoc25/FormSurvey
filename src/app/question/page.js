"use client";

import { useEffect, useState } from 'react';
import SubmitAnswerButton from "@/components/SubmitAnswerButton";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function QuestionPage() {
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [surveyStarted, setSurveyStarted] = useState(false); // Điều kiện hiển thị form khảo sát

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:3000/api/question');
        const data = await response.json();
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
    
    if (countdown === 0) {
      alert('Time is up! You cannot submit the survey.');
      return;
    }
  
    const newErrors = {};
  
    questions.forEach(question => {
      if (question.question_required && !question.value.trim()) {
        newErrors[question._id] = "This field is required.";
      }
    });
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully');
      // Submit data to SubmitAnswerButton
    }
  };
  
  

  const handleStartSurvey = () => {
    setCountdown(90); // Start countdown from 60 seconds
    setSurveyStarted(true); // Bật trạng thái đã bắt đầu khảo sát
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
      <h1 className="text-4xl font-extrabold text-center tracking-tight mb-6 text-indigo-600">
  Survey Questions
</h1>


<button
  onClick={handleStartSurvey}
  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-800 w-full md:w-1/2 self-center mt-3 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105"
  disabled={surveyStarted}
>
  {surveyStarted ? '' : 'Start Survey'} {/* Giữ khoảng trắng để nút không hiển thị */}
</button>

      {countdown > 0 && (
        <div className="w-24 h-24 mt-4">
          <CircularProgressbar
            value={countdown}
            maxValue={90}
            text={`${countdown}s`}
            styles={buildStyles({
              textColor: '#4A5568',
              pathColor: '#6B46C1',
              trailColor: '#E2E8F0',
            })}
          />
        </div>
      )}

      {surveyStarted && (
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 lg:w-1/2 mt-6">
          <div>
  {questions.map(({ _id, question_header, question_type, value }) => (
    <div key={_id} className="mb-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{question_header || "No header available"}</h2>
      <input
        type="text"
        id={`input-${_id}`}
        placeholder="Enter text"
        onBlur={() => handleBlur(_id)}
        onChange={(e) => handleInputChange(_id, e.target.value)}
        className="mt-2 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      {errors[_id] && (
        <p className="text-red-500 text-sm">{errors[_id]}</p>
      )}
    </div>
  ))}
</div>

{countdown > 0 && (
      <SubmitAnswerButton
        disabled={countdown <= 0}
        collectionId={questions.map(q => q.collection_id)}
        answers={questions.map(q => ({ question_id: q._id, value: q.value }))}
      />
    )}
        </form>
      )}
      {/* Copyright Section */}
<div className="mt-6 text-center text-gray-500 text-sm">
  &copy; {new Date().getFullYear()} Loc's Copyright. All rights reserved.
</div>
    </div>
  );
}
