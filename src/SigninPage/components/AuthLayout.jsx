import Header from '../../src1/MainPage/Header/Header.jsx';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <div className="w-full z-50">
        <Header style={{ background: "rgba(255, 255, 255, 0.9)", borderBottom: "1px solid rgba(0,0,0,0.05)" }} />
      </div>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <section className="flex flex-col">{children}</section>
        </div>
      </main>
    </div>
  );
}
