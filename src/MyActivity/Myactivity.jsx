import Header from "../MainPage/Header"
import FullActivity from "./FullActivity"
import Hero from "./Hero"
import Stats from "./Stats"

function Myactivity() {
    return (
        <>
            <div className="h-screen w-screen p-1.5">
                <Header />
                <Hero />
                <Stats />
                <FullActivity />
            </div>
        </>
    )
}

export default Myactivity