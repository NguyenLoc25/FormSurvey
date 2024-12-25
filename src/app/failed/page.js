export default function SuccessPage() {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white">
    <div className="w-full max-w-screen-md text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white">
      You have already answered this question!
      </h1>
      <p className="mt-4 text-lg">
      Thank you for participating in the survey. If needed, you can return to the homepage to continue.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 text-lg bg-white text-red-500 rounded-lg shadow-lg hover:bg-red-100 transition"
      >
        Go back to homepage
      </a>
    </div>
  </div>
  );
}
