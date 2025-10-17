import Header from "../MainPage/Header";
import FullActivity from "./FullActivity";
import Hero from "./Hero";
import Stats from "./Stats";

function MyActivity() {
    return (
        <div className="w-full min-h-screen max-w-screen flex justify-center  transition-colors duration-300">
            <div className="h-full min-h-screen max-h-scree w-fit p-1.5 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="w-full absolute top-0 left-0 mt-2 px-3">
                    <Header />
                </div>
                <Hero />
                <Stats />
                <FullActivity />
            </div>
        </div>
    );
}

export default MyActivity;
