
import { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
export default function SubmitAnswerButton({ collectionId, answers }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    console.log("Submitting answers:", answers);
    console.log("Collection ID:", collectionId);  // In ra collectionId

    try {
      const response = await fetch(`/api/answer/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ collectionId, answers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit answers");
      }

      console.log("Submission successful!");
      router.push("/success");
    } catch (err) {
      router.push("/failed");
      console.error("Error occurred:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Button
        onClick={handleSubmit}
        type="submit"
        className="w-full md:w-1/2 self-end mt-3 hover:scale-110"
      >
        Submit
      </Button>
    </div>
  );
}
