import Header from "../MainPage/Header";
import FullActivity from "./FullActivity";
import Hero from "./Hero";
import Stats from "./Stats";

function MyActivity() {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="fixed top-[10px] left-0 w-full z-10 bg-transparent">
        <Header />
      </div>
      <main className="w-full max-w-7xl px-3 sm:px-6 md:px-10 text-gray-900 dark:text-gray-100">
        <section className="mb-6">
          <Hero />
        </section>

        <section className="mb-6">
          <Stats />
        </section>

        <section className="w-full">
          <FullActivity />
        </section>
      </main>
    </div>
  );
}

export default MyActivity;
