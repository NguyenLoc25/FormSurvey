import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
// import "./manage.css"
import CreateCollectionButton from "@/components/CreateCollectionButton";

export default async function ManageFormPage() {
  const session = await getServerSession(authOptions);
  const baseURL = process.env.NEXTAUTH_URL 
  ? process.env.NEXTAUTH_URL 
  : process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}` 
  : "http://localhost:3000";


let collectionsR = await fetch(`${baseURL}/api/collection`); // Sửa từ "${baseURL}" thành `${baseURL}`
let collections = await collectionsR.json();

let questionsR = await fetch(`${baseURL}/api/question`); // Sửa từ "${baseURL}" thành `${baseURL}`
let questions = await questionsR.json();


  // console.log("Collections:", collections);
  // console.log("Questions:", questions);

  // if (collections.length === 0) {
  //   console.log("No collections found.");
  // } else {
  //   collections.forEach(collection => {
  //     collection.questions.forEach(question => {
  //       // Ensure each question has its details
  //       question = questions.find(q => q._id === question._id) || question;

  //       // console.log("Question Header:", question.question_header);
  //       // console.log("Question Type:", question.question_type);
  //       // console.log("Question Required:", question.question_required);
  //     });
  //   });
  // }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="w-full max-w-6xl p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-center tracking-tight mb-6 text-indigo-600 mt-4">
            MANAGE YOUR FORMS
          </h1>
          <CreateCollectionButton />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {collections.length > 0 ? (
            collections.map((collection) => (
              <div
                key={collection._id}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-gray-600 mb-2 tracking-tight mb-6 text-indigo-600">
                  {collection.label}
                </h2>
                <ul className="text-sm tracking-tight mb-4 text-indigo-600">
                  {collection.questions.map((questionId) => {
                    const question = questions.find((q) => q._id === questionId);
                    return question ? (
                      <li key={question._id}>
                        {question.question_header}
                      </li>
                    ) : (
                      <li key={questionId}>Question not found</li>
                    );
                  })}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No collections found.</p>
          )}
        </div>
      </div>
    </div>
  );
}


