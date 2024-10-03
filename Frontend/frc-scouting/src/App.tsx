import { useState, useEffect  } from 'react';

import robot from './assets/robot.png'
import FRC from './assets/FRC.jpg'
import ColorButton from './components/ColorButton';
import CTAButton from './components/CTAButton';
import HeaderBar from './components/HeaderBar';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <LoadingScreen isVisible={showLoadingScreen}></LoadingScreen>
      <main>
        <div className='hero'>
          <div className='leftSection'>
            <img src={robot}></img>
          </div>
          <div className='rightSection'>
            <h1 className='titleDarkText'>FRC RoboScouts</h1>
            <h3 className="bodyDarkText">Predictions and alliances easier than ever before. Powered by Bluetonium 127.</h3>
            <div className="buttonBox">
              <CTAButton color='var(--red)' textColor="var(--text)" style={{ marginRight: '24px' }} hoverMode="hoverMode1">Get Started</CTAButton>
              <ColorButton color='transparent' textColor="var(--blue)" hoverMode="hoverMode2">Learn More</ColorButton>
            </div>
          </div>
        </div>
        <div className='descriptionSection'>
          <div className='leftSection'>
            <h2 className='headerDarkText'>FRC Scouting</h2>
            <h3 className="bodyDarkText">Intuitive scouting tools for FRC teams at no cost. Gather data about alliances, make match predictions, and analyze statistics! Created by Bluetonium 127.</h3>
            <div className='searchBlock'>
              
            </div>
          </div>
          <div className='rightSection'>
            <img src={FRC} />
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
