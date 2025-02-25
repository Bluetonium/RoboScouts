import { useState, useEffect  } from 'react';

import robot from '../assets/robot.png';
import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';

import '../constants.css';
import style from './404.module.css';

{/* Give credit to ionicons and the notification video and the loading screen, change images to ones i own */}
{/* Cookie notif, Banner notif */}

function App() {
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
        <div className={style.hero}>
          <div className={style.leftSection}>
            <img src={robot} className='noSelect'></img>
          </div>
          <div className={style.rightSection}>
            <h1 className={`titleDarkText`}>404: Page not Found</h1>
            <h3 className={`bodyDarkText`}>Try using the navigation links at the top of the page!</h3>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
