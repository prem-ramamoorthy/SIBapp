import Header from '../MainPage/Header/Header.jsx'
import Footer from '../MainPage/Footer/Footer.jsx'
import Hero from './Hero.jsx'
import Main from './Main.jsx'
import { useEffect } from 'react'

function Members() {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/style.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
        <Header isMembers = {true} style = {{background :  "rgba(0, 0, 0, 0.07)"}} />   
        <Hero />
        <Main />
        <Footer margin = {"-7"} ismember={true}/>
    </>
  )
}

export default Members