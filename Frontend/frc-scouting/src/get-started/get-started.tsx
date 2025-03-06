import { useEffect, useState } from 'react';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';

import '../constants.css';
import style from './get-started.module.css';

const Team = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <LoadingScreen isVisible={showLoadingScreen}></LoadingScreen>
      <main>
        <div className={style.teamHero}>
            <h1 className={style.headerLightText}>Get Started</h1>
        </div>

        <div className={style.bodyText}>
            <div className={style.column}>
                <h1 className={`titleDarkText ${style.header}`}>Lorem Ipsum</h1>
                <br></br>
                <h2 className={`titleDarkText ${style.title}`}>Hello</h2>
                <p className='bodyDarkText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <br></br>
                <h2 className={`titleDarkText ${style.title}`}>Hello</h2>
                <p className='bodyDarkText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <br></br>
            </div>
        </div>
        
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Team;