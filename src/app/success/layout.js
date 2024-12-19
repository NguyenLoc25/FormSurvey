export default function SuccessLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <main className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
          {children}
        </main>
      </div>
    );
  }
  