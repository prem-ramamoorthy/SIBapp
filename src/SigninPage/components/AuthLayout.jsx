export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-1 gap-6">
        <section className="flex">{children}</section>
      </div>
    </main>
  );
}
