import Header from "./Header/Header.jsx"
import Hero from "./Hero/Hero.jsx"
import About from "./About/About.jsx"
import Objective from "./Objectives/Objective.jsx"
import Verticals from "./Verticals/Verticals.jsx"
import Leaders from "./Leaders/Leaders.jsx"
import Contact from "./Contacts/Contact.jsx"
import Footer from "./Footer/Footer.jsx"
import './style.css'

function MainPage() {
  return (
    <div className="sib">
      <Header />
      <Hero />
      <About />
      <Objective />
      <Verticals />
      <Leaders />
      <Contact />
      <Footer />
    </div>
  )
}

export default MainPage