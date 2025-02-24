import { useEffect, useState } from 'react';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';
import SimpleDonut from '../components/simpleDonutGraph';
import SimpleBar from '../components/simpleBarGraph';

import bluetonium from '../assets/bluetonium.png'
import ourTeam from '../assets/ourTeam.jpg'


import './team.css';

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
        <div className='teamHero'>
            <img src={bluetonium} className='teamLogo noSelect'/>
            <div className='teamName'>
                <h1 className='headerLightText'>Bluetonium</h1>
                <h2 className='titleLightText'>-- #127</h2>
            </div>
        </div>

        <div className='teamInformation'>
            <div className='grid'>

                <div className='grid-item a sideBar'>
                    <div className='sidebarHeader'>
                        <h1 className='titleDarkText'>Bluetonium</h1>
                        <h2 className='titleDarkText'>-- #127</h2>
                        <p className='bodyDarkText'>Insert Team Description</p>
                    </div>
                    <div className='websiteLink'>
                        <a href='https://fisdrobotics.com/' target='_blank' className='bodyLightText'>https://fisdrobotics.com/ a a a</a>
                    </div>
                    <div className='randomInfo'>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Rookie Year:</span> 2023</h3>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Team Manager:</span> Jim Foreman</h3>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Team Admin:</span> None</h3>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Motto:</span> Building students through robots</h3>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Contact:</span> None</h3>
                    </div>
                </div>

                <div className='grid-item b teamPicture'>
                    <img src={ourTeam} />
                </div>

                <div className='grid-item c locationBox'>
                    <div className='leftSection'>
                        <h2 className='titleDarkText'>Location:</h2>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Country:</span> United States</h3>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>Territory:</span> Texas</h3>
                        <h3 className='bodyDarkText'><span className='slightlyBold'>City:</span> Friendswood</h3>
                    </div>
                    <div className='rightSection'>

                    </div>
                </div>

                <div className='grid-item d statsBox'>
                    <div className='randomBox'>
                        <div className='statsHeader'>
                            <h2 className='titleLightText'>EPA</h2>
                        </div>
                        <div className='statsSection'>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Current: </h3>
                                <h3 className='bodyDarkText'>3 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Recent: </h3>
                                <h3 className='bodyDarkText'>1 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Mean: </h3>
                                <h3 className='bodyDarkText'>0 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Max: </h3>
                                <h3 className='bodyDarkText'>4 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Similarity: </h3>
                                <h3 className='bodyDarkText'>45%* </h3>
                            </div>
                        </div>
                    </div>
                    <div className='chartBox2 noSelect'>
                        <SimpleBar labels={['Current', 'Recent', 'Mean', 'Max']} data={[17, 19, 12, 23]} 
                        backgroundColor={['rgba(153, 102, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(54, 162, 235, 0.5)']} 
                        borderColor={['rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)']} />
                    </div>
                </div>

                <div className='grid-item e statsBox'>
                    <div className='randomBox'>
                        <div className='statsHeader'>
                            <h2 className='titleLightText'>Season Stats</h2>
                        </div>
                        <div className='statsSection'>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Wins: </h3>
                                <h3 className='bodyDarkText'>3 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Losses: </h3>
                                <h3 className='bodyDarkText'>1 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Ties: </h3>
                                <h3 className='bodyDarkText'>0 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Count: </h3>
                                <h3 className='bodyDarkText'>4 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Winrate: </h3>
                                <h3 className='bodyDarkText'>75% </h3>
                            </div>
                        </div>
                    </div>
                    <div className='chartBox noSelect'>
                        <SimpleDonut labels={['Wins', 'Losses', 'Ties']} data={[12, 19, 3]} 
                        backgroundColor={['rgba(153, 102, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']} 
                        borderColor={['rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']} />
                    </div>
                </div>

                <div className='grid-item f statsBox'>
                    <div className='randomBox'>
                        <div className='statsHeader'>
                            <h2 className='titleLightText'>Total Stats</h2>
                        </div>
                        <div className='statsSection'>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Wins: </h3>
                                <h3 className='bodyDarkText'>3 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Losses: </h3>
                                <h3 className='bodyDarkText'>1 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Ties: </h3>
                                <h3 className='bodyDarkText'>0 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Count: </h3>
                                <h3 className='bodyDarkText'>4 </h3>
                            </div>
                            <div className='statistic'>
                                <h3 className='bodyDarkText'>Winrate: </h3>
                                <h3 className='bodyDarkText'>75% </h3>
                            </div>
                        </div>
                    </div>
                    <div className='chartBox noSelect'>
                        <SimpleDonut labels={['Wins', 'Losses', 'Ties']} data={[12, 19, 3]} 
                        backgroundColor={['rgba(153, 102, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']} 
                        borderColor={['rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']} />
                    </div>
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

export default Team;