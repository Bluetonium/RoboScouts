import { useEffect, useState } from 'react';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';

import close from '../assets/ionicons/close2.svg';
import scan from '../assets/ionicons/scan.svg';
import download from '../assets/ionicons/download.svg';
import upload from '../assets/ionicons/upload.svg';
import add from '../assets/ionicons/add.svg';

// Credits:
// Confetti library
// Ionicons
// QR code libraries

import '../constants.css';
import style from './data-analysis.module.css';

const DataCollection = () => {
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
      <main className={style.wholeContainer}>
        <div className={style.importHeader}>
          <div className={style.groupLeft}>
            <select className={style.selectionDropdown}>
              <option value={"2025/12345/127"}>#127, #12345</option>
              <option value={"2025/12345/127"}>#127, #12345</option>
              <option value={"2025/12345/127"}>#127, #12345</option>
            </select>
            <img className={style.importHeaderButton} src={scan} />
            <img className={style.importHeaderButton} src={add} />
            <img className={style.importHeaderButton} src={close} />
          </div>
          <div className={style.groupRight}>
            <img className={style.importHeaderButton} src={upload} />
            <img className={style.importHeaderButton} src={download} />
          </div>
        </div>

        <div className={style.teamHeader}>
          <h3 className={`bodyDarkText`}>#127 (Bluetonium), Match #12345, Red 1, 2025</h3>
        </div>

        <div className={style.teamData}>
          <div className={style.teamDataColumn}>
            <h3 className={`bodyDarkText ${style.teamDataTitle}`}>Auto</h3>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L4</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L3</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L2</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L1</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Miss</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Net</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Processor</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
          </div>
          <div className={style.teamDataColumn}>
            <h3 className={`bodyDarkText ${style.teamDataTitle}`}>Tele-Op</h3>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L4</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L3</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L2</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L1</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Miss</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Net</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Processor</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
          </div>
          <div className={style.teamDataColumn}>
            <h3 className={`bodyDarkText ${style.teamDataTitle}`}>Data</h3>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L4</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L3</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L2</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L1</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Miss</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Net</h3>
              <h3 className={`bodyDarkText`}>1</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Processor</h3>
              <h3 className={`bodyDarkText`}>1</h3>
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

export default DataCollection;