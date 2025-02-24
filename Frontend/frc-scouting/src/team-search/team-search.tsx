import { useEffect, useState, ChangeEvent } from 'react';

import search from '../assets/search.png';
import arrow from '../assets/arrow.png';
import newspaper from '../assets/ionicons/newspaper.svg';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';
import Tooltip from '../components/Tooltip';
import CTAButton from '../components/CTAButton';

import { Link } from 'react-router-dom';

import './team-search.css';

const TeamSearch = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [showInstructions, setShowInstructions] = useState(false);

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

  function toggleInstructions() {
    showInstructions ? setShowInstructions(false) : setShowInstructions(true);
  }

  const [resultsPerPage, setResultsPerPage] = useState<number>(10); 

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    setResultsPerPage(Number(event.target.value));
  };


  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <LoadingScreen isVisible={showLoadingScreen}></LoadingScreen>
      <main>
        <div className='search'>

          <div className='searchHeader'>
            <div className='searchBar'>
              <div className='imgBackground' onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                <img src={search} className='noSelect'/>
                {activeTooltip === 1 && <Tooltip message={"Search"} />}
              </div>
              <input className='titleDarkText' placeholder='Name or #!' type='text'></input>
            </div>
            <div className='buttonBox' onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
              <img className='headerButton' src={newspaper} onClick={() => toggleInstructions()}></img>
              {activeTooltip === 2 && <Tooltip message={"Toggle Instructions"} />}
            </div>
          </div>

          <div className='searchResultsSection'>
            <div className='verticalBox'>
              <div className='searchResults'>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
                <div className='searchResult'>
                  <h3 className='bodyDarkText'>#127 - Bluetonium</h3>
                </div>
              </div>

              <div className='searchFooter'>
                <div className='box'>
                  <img src={arrow} className='footerButton'></img>
                  <img src={arrow} className='footerButton' style={{rotate: "180deg", marginRight: "24px"}}></img>
                  <h3 className='bodyDarkText'>1-50 of 227</h3>
                </div>
                <h3 className='bodyDarkText'><input type='number' min={5} max={50} step={5} value={resultsPerPage} onChange={handleChange}></input> Per page</h3>
              </div>
            </div>

            <div className='teamInfo'>
              {
                showInstructions ? (
                  <>
                    <div className='instructionsHeader'>
                      <h2 className='titleDarkText'>RoboScouts Team Search!</h2>
                    </div>
                    <div className='instructionsText'>
                      <h3 className='bodyDarkText'>- Try typing in a number like "#127", or a team name like "Bluetonium"!</h3><br></br>
                      <h3 className='bodyDarkText'>- When searching numbers, remember to use "#".</h3><br></br>
                      <h3 className='bodyDarkText'>- We hope you find this useful! :D</h3>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='teamHeader'>
                      <h2 className='titleDarkText'>Bluetonium</h2>
                      <h3 className='bodyDarkText'>-- #127</h3>
                    </div>
                    <div className='teamResults'>
                      <h3 className='bodyDarkText'>- Friendswood, TX, USA</h3>
                      <h3 className='bodyDarkText'>- Description</h3>
                      <Link to={"/team"}>
                        <CTAButton color='var(--red)' textColor="var(--text)" style={{ marginTop: '16px' }} hoverMode="hoverMode1">View Team</CTAButton>
                      </Link>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default TeamSearch;
