import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CreateCollectionButton from "@/components/CreateCollectionButton";

export default async function ManageFormPage() {
  const session = await getServerSession(authOptions);

  let collectionsR = await fetch("http://localhost:3000/api/collection");
  let collections = await collectionsR.json();

  let questionsR = await fetch("http://localhost:3000/api/question");
  let questions = await questionsR.json();

  console.log("Collections:", collections);
  console.log("Questions:", questions);

  if (collections.length === 0) {
    console.log("No collections found.");
  } else {
    collections.forEach(collection => {
      collection.questions.forEach(question => {
        // Ensure each question has its details
        question = questions.find(q => q._id === question._id) || question;

        // console.log("Question Header:", question.question_header);
        // console.log("Question Type:", question.question_type);
        // console.log("Question Required:", question.question_required);
      });
    });
  }

  return (
      <div className="py-10 w-full">
          <div className="flex w-full justify-between">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Manage your form
              </h1>
              <CreateCollectionButton />
          </div>
          <div>
              {collections.map(({ _id, label, questions }) => (
                  <div key={_id} className="mb-6">
                      <h2 className="text-2xl font-bold">{label}</h2>
                      <ul className="ml-3 mt-2 list-disc">
                          {questions.map((question) => (
                              <li key={question._id}>
                              <p><strong>Header:</strong> {question.question_header || "No header available"}</p>
                              <p><strong>Type:</strong> {question.question_type || "No type specified"}</p>
                              <p><strong>Required:</strong> {question.question_required ? "Yes" : "No"}</p>
                            </li>
                          ))}
                      </ul>
                  </div>
              ))}
          </div>
      </div>
  );
}
