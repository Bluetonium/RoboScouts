import { useState, useEffect  } from 'react';

import robot from '../assets/robot.png';
import search from '../assets/search.png';
import FRC from '../assets/FRC.jpg';
import bluetonium from '../assets/bluetonium.png';

import ColorButton from '../components/ColorButton';
import CTAButton from '../components/CTAButton';
import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';
import Tooltip from '../components/Tooltip';

import '../constants.css';
import style from './home-page.module.css';

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

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null); 
  
  const handleMouseEnter = (index: number) => { 
    setActiveTooltip(index); 
  }; 
  
  const handleMouseLeave = () => { 
    setActiveTooltip(null);
  };

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
            <h1 className={`titleDarkText`}>FRC RoboScouts</h1>
            <h3 className={`bodyDarkText`}>Predictions and alliances easier than ever before. Powered by Bluetonium 127.</h3>
            <div className={style.buttonBox}>
              <CTAButton color='var(--red)' textColor="var(--text)" style={{ marginRight: '24px' }} hoverMode="hoverMode1">Get Started</CTAButton>
              <ColorButton color='transparent' textColor="var(--blue)" hoverMode="hoverMode2">Learn More</ColorButton>
            </div>
          </div>
        </div>
        <div className={style.descriptionSection}>
          <div className={style.descriptionLeftSection}>

            <h2 className={`headerDarkText`}>FRC Scouting</h2>
            <h3 className={`bodyDarkText`}>Intuitive scouting tools for FRC teams at no cost. Gather data about alliances, make match predictions, and analyze statistics! Created by Bluetonium 127.</h3>
            <CTAButton color='var(--red)' textColor="var(--text)" style={{ marginRight: '24px' }} hoverMode="hoverMode1">Register a team</CTAButton>

          </div>
          <div className={style.descriptionRightSection}>

            <div className={style.searchBlock}>
              <div className={style.topSection}>
                <div className={style.searchBar}>
                  <div className={style.imgBackground} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                    <img src={search} className='noSelect'/>
                    {activeTooltip === 1 && <Tooltip message={"Search"} />}
                  </div>
                  <input className={`titleDarkText`} placeholder='Type a team name!' type='text'></input>
                </div>
                <div className={style.results}>
                  <img src={bluetonium} className='noSelect' />
                  <div className={style.resultContent}>
                    <div className={style.resultsTopSection}>
                      <h3 className={`titleDarkText`}>Bluetonium #127</h3>
                      <h4 className={`bodyDarkText`}>Friendswood High School, Texas</h4>
                    </div>
                    <div className={style.resultsBottomSection}>
                      <h4 className={`bodyDarkText`}>Bottom 10%</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className={style.videoSection}>
          <div className={style.videoLeftSection}>
            <img src={FRC} className='noSelect' />
          </div>
          <div className={style.videoRightSection}>
            <div className={style.textBox}>
              <h2 className={`headerDarkText`}>Easy to Use</h2>
              <h3 className={`bodyDarkText`}>Our scouting tools are effective, efficient, and ✨stylish✨. Get the information you need fast, and scout teams with ease.</h3>
              <CTAButton color='var(--red)' textColor="var(--text)" style={{ marginRight: '24px' }} hoverMode="hoverMode1">How does scouting work?</CTAButton>
            </div>
          </div>
        </div>

        <div className={style.getStartedSection}>
          <h1 className={`titleDarkText`}>🚀 Get Started TODAY! 🌟</h1>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
