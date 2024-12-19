import Image from "next/image";
import "./home.css"; // Import file CSS tùy chỉnh

export default async function Home() {
  let collectionsR = await fetch("http://localhost:3000/api/collection");
  let collections = await collectionsR.json();

  // Fetch danh sách tất cả các câu hỏi
  let questionsR = await fetch("http://localhost:3000/api/question");
  let allQuestions = await questionsR.json();

  console.log(collections);

  return (
    <div className="home-container">
      <h1 className="home-title">Home Page</h1>
      <ul className="collection-list">
        {collections.map(({ _id, label, questions }) => (
          <li key={_id} className="collection-item">
            <h2>{label}</h2>
            <ul>
              {questions.map(questionId => {
                let question = allQuestions.find(q => q._id === questionId);
                return question ? <li key={question._id}>{question.question_header}</li> : null;
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
