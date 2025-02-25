import { useEffect, useState } from 'react';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';
import SimpleDonut from '../components/simpleDonutGraph';
import SimpleBar from '../components/simpleBarGraph';

import bluetonium from '../assets/bluetonium.png'
import ourTeam from '../assets/ourTeam.jpg'

import '../constants.css';
import style from './team.module.css';

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
            <img src={bluetonium} className={`${style.teamLogo} noSelect`}/>
            <div className={style.teamName}>
                <h1 className={style.headerLightText}>Bluetonium</h1>
                <h2 className={style.titleLightText}>-- #127</h2>
            </div>
        </div>

        <div className={style.teamInformation}>
            <div className={style.grid}>

                <div className={`${style.gridItem} ${style.a} ${style.sidebar}`}>
                    <div className={style.sidebarHeader}>
                        <h1 className={`titleDarkText`}>Bluetonium</h1>
                        <h2 className={`titleDarkText`}>-- #127</h2>
                        <p className={`bodyDarkText`}>Insert Team Description</p>
                    </div>
                    <div className={style.websiteLink}>
                        <a href='https://fisdrobotics.com/' target='_blank' className={`bodyLightText`}>https://fisdrobotics.com/ a a a</a>
                    </div>
                    <div className={style.randomInfo}>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Rookie Year:</span> 2023</h3>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Team Manager:</span> Jim Foreman</h3>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Team Admin:</span> None</h3>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Motto:</span> Building students through robots</h3>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Contact:</span> None</h3>
                    </div>
                </div>

                <div className={`${style.gridItem} ${style.b} ${style.teamPicture}`}>
                    <img src={ourTeam} />
                </div>

                <div className={`${style.gridItem} ${style.c} ${style.locationBox}`}>
                    <div className={style.leftSection}>
                        <h2 className='titleDarkText'>Location:</h2>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Country:</span> United States</h3>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>Territory:</span> Texas</h3>
                        <h3 className={`bodyDarkText`}><span className={`slightlyBold`}>City:</span> Friendswood</h3>
                    </div>
                    <div className={style.rightSection}>

                    </div>
                </div>

                <div className={`${style.gridItem} ${style.d} ${style.statsBox}`}>
                    <div className={style.randomBox}>
                        <div className={style.statsHeader}>
                            <h2 className={style.titleLightText}>EPA</h2>
                        </div>
                        <div className={style.statsSection}>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Current: </h3>
                                <h3 className={`bodyDarkText`}>3 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Recent: </h3>
                                <h3 className={`bodyDarkText`}>1 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Mean: </h3>
                                <h3 className={`bodyDarkText`}>0 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Max: </h3>
                                <h3 className={`bodyDarkText`}>4 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Similarity: </h3>
                                <h3 className={`bodyDarkText`}>45%* </h3>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.chartBox} noSelect`}>
                        <SimpleBar labels={['Current', 'Recent', 'Mean', 'Max']} data={[17, 19, 12, 23]} 
                        backgroundColor={['rgba(153, 102, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(54, 162, 235, 0.5)']} 
                        borderColor={['rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)', 'rgba(54, 162, 235, 1)']} />
                    </div>
                </div>

                <div className={`${style.gridItem} ${style.e} ${style.statsBox}`}>
                    <div className={style.randomBox}>
                        <div className={style.statsHeader}>
                            <h2 className={style.titleLightText}>Season Stats</h2>
                        </div>
                        <div className={style.statsSection}>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Current: </h3>
                                <h3 className={`bodyDarkText`}>3 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Recent: </h3>
                                <h3 className={`bodyDarkText`}>1 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Mean: </h3>
                                <h3 className={`bodyDarkText`}>0 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Max: </h3>
                                <h3 className={`bodyDarkText`}>4 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Similarity: </h3>
                                <h3 className={`bodyDarkText`}>75%</h3>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.chartBox} noSelect`}>
                        <SimpleDonut labels={['Wins', 'Losses', 'Ties']} data={[12, 19, 3]} 
                        backgroundColor={['rgba(153, 102, 255, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)']} 
                        borderColor={['rgba(153, 102, 255, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)']} />
                    </div>
                </div>

                <div className={`${style.gridItem} ${style.f} ${style.statsBox}`}>
                    <div className={style.randomBox}>
                        <div className={style.statsHeader}>
                            <h2 className={style.titleLightText}>Total Stats</h2>
                        </div>
                        <div className={style.statsSection}>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Current: </h3>
                                <h3 className={`bodyDarkText`}>3 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Recent: </h3>
                                <h3 className={`bodyDarkText`}>1 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Mean: </h3>
                                <h3 className={`bodyDarkText`}>0 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Max: </h3>
                                <h3 className={`bodyDarkText`}>4 </h3>
                            </div>
                            <div className={style.statistic}>
                                <h3 className={`bodyDarkText`}>Similarity: </h3>
                                <h3 className={`bodyDarkText`}>45%</h3>
                            </div>
                        </div>
                    </div>
                    <div className={`${style.chartBox} noSelect`}>
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