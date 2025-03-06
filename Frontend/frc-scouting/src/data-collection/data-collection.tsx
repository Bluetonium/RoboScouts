import { useEffect, useState } from 'react';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';

import close from '../assets/ionicons/close.svg';


// Foreman questions
// 1. The scouting menu is pretty much complete, and can generate QR codes. working on mobile menu right now.
// 2. Would you still like me to work on the Bluetonium website?
// 3. Henry mentioned an unreal engine project that needs cleaning up, I should be able to do that fairly easily when I have time.
// 4. How should we approach the legal pages for Roboscouts? I would like to get them in place before Belton if possible.

// Credits:
// Confetti library
// Ionicons
// QR code libraries

import '../constants.css';
import styles from './data-collection.module.css';

import NumberField from '../components/inputComponents/NumberField';
import TextField from '../components/inputComponents/TextField';
import Dropdown from '../components/inputComponents/Dropdown';
import CounterField from '../components/inputComponents/CounterField';
import Checkbox from '../components/inputComponents/Checkbox';
import Paragraph from '../components/inputComponents/Paragraph';

import QRCode from 'react-qr-code';

const usePageWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const DataCollection = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);

  const [QRCodeElement, setQRCodeElement] = useState(<h1>No QR code yet!</h1>);

  const width = usePageWidth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const slides = 4;
  const mobileSlides = 5;

  function manageClick(number: number) {
    if (number + 1 >= slides) {
        setCurrentSlide(0);
    } else {
        setCurrentSlide(number + 1);
    }
  }

  function manageMobileClick(number: number) {
    if (number + 1 >= mobileSlides) {
        setCurrentSlide(0);
    } else {
        setCurrentSlide(number + 1);
    }
  }

  const [teamName, setTeamName] = useState("");
  const [teamNumber, setTeamNumber] = useState(0);
  const [teamPosition, setTeamPosition] = useState("Blue 1");
  const [matchNumber, setMatchNumber] = useState(0);
  const [matchYear, setMatchYear] = useState(2025);

  const [autoL4, setAutoL4] = useState(0);
  const [autoL3, setAutoL3] = useState(0);
  const [autoL2, setAutoL2] = useState(0);
  const [autoL1, setAutoL1] = useState(0);
  const [autoCoralMiss, setAutoCoralMiss] = useState(0);

  const [autoNet, setAutoNet] = useState(0);
  const [autoProcessor, setAutoProcessor] = useState(0);
  const [autoAlgaeMiss, setAutoAlgaeMiss] = useState(0);

  const [autoLeave, setAutoLeave] = useState(false);
  const [autoGroundIntake, setAutoGroundIntake] = useState(false);

  const [teleL4, setTeleL4] = useState(0);
  const [teleL3, setTeleL3] = useState(0);
  const [teleL2, setTeleL2] = useState(0);
  const [teleL1, setTeleL1] = useState(0);
  const [teleCoralMiss, setTeleCoralMiss] = useState(0);

  const [teleNet, setTeleNet] = useState(0);
  const [teleProcessor, setTeleProcessor] = useState(0);
  const [teleAlgaeMiss, setTeleAlgaeMiss] = useState(0);

  const [teleGroundIntake, setTeleGroundIntake] = useState(false);

  const [teamHang, setTeamHang] = useState("None");
  const [defense, setDefense] = useState("0");

  const [notes, setNotes] = useState("None");

  function downloadJSON() {
    const jsonString = JSON.stringify({
      name: teamName,
      number: teamNumber,
      position: teamPosition,
      match: matchNumber,
      year: matchYear,
      autoCoral: {
        L4: autoL4,
        L3: autoL3,
        L2: autoL2,
        L1: autoL1,
        miss: autoCoralMiss,
      },
      autoAlgae: {
        net: autoNet,
        processor: autoProcessor,
        miss: autoAlgaeMiss
      },
      autoOther: {
        leave: autoLeave,
        ground: autoGroundIntake,
      },
      teleCoral: {
        L4: teleL4,
        L3: teleL3,
        L2: teleL2,
        L1: teleL1,
        miss: teleCoralMiss,
      },
      teleAlgae: {
        net: teleNet,
        processor: teleProcessor,
        miss: teleAlgaeMiss
      },
      hang: teamHang,
      teleOther: {
        ground: teleGroundIntake,
      },
      defense: defense,
      notes: notes,
    }, null, 4);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `#${teamNumber} #${matchNumber}`; // Specify the file name
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a); // Clean up
  }

  function updateQRCode() {

    const jsonString = JSON.stringify({
      name: teamName,
      number: teamNumber,
      position: teamPosition,
      match: matchNumber,
      year: matchYear,
      autoCoral: {
        L4: autoL4,
        L3: autoL3,
        L2: autoL2,
        L1: autoL1,
        miss: autoCoralMiss,
      },
      autoAlgae: {
        net: autoNet,
        processor: autoProcessor,
        miss: autoAlgaeMiss
      },
      autoOther: {
        leave: autoLeave,
        ground: autoGroundIntake,
      },
      teleCoral: {
        L4: teleL4,
        L3: teleL3,
        L2: teleL2,
        L1: teleL1,
        miss: teleCoralMiss,
      },
      teleAlgae: {
        net: teleNet,
        processor: teleProcessor,
        miss: teleAlgaeMiss
      },
      hang: teamHang,
      teleOther: {
        ground: teleGroundIntake,
      },
      defense: defense,
      notes: notes,
    }, null, 4);

    setQRCodeElement(<QRCode 
      value={jsonString}
      size={1024}
      bgColor="#FFFFFF"
      fgColor="#000000"
      level="L"
      className={styles.QRCode}
    />);
  }

  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <LoadingScreen isVisible={showLoadingScreen}></LoadingScreen>
      <main>
        <div className={styles.sectionBox}>
            <div className={styles.section} style={{ left: ((0 + (currentSlide * -100)).toString() + "%") }}>
                <div className={styles.centerColumn}>
                    <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>Team Selection</h2>
                    <TextField text='Team Name: ' value={teamName} onChange={setTeamName} placeholder='Bluetonium' ></TextField>
                    <NumberField text='Team Number: ' value={teamNumber} onChange={setTeamNumber} />
                    <Dropdown text='Team Position: ' value={teamPosition} onChange={setTeamPosition} options={[
                        { value: 'Blue 1', label: 'Blue 1' },
                        { value: 'Blue 2', label: 'Blue 2' },
                        { value: 'Blue 3', label: 'Blue 3' },
                        { value: 'Red 1', label: 'Red 1' },
                        { value: 'Red 2', label: 'Red 2' },
                        { value: 'Red 3', label: 'Red 3' },
                    ]}/>
                    <NumberField text='Match Number: ' value={matchNumber} onChange={setMatchNumber} />
                    <NumberField text='Match Year: ' value={matchYear} onChange={setMatchYear} />
                </div>
            </div>
            <div className={styles.section1} style={{ left: ((100 + (currentSlide * -100)).toString() + "%") }}>
                <div className={styles.headerSection}>
                    <h2 className={`bodyDarkText ${styles.subtitleBlock}`}>Auto</h2>
                    <h2 className={`bodyDarkText ${styles.titleBlock}`}>#128: #24950</h2>
                    <h2 className={`bodyDarkText ${styles.subtitleBlock}`}>Tele-Op</h2>
                </div>
                <div className={styles.bodyBlock}>
                    <div className={styles.leftBlock}>
                      <div className={styles.leftSide}>
                        <h3 className={`bodyDarkText ${styles.headerBlock}`}>Algae</h3>
                        <CounterField value={autoNet} onChange={setAutoNet} text='Net:'></CounterField>
                        <CounterField value={autoProcessor} onChange={setAutoProcessor} text='Processor:'></CounterField>
                        <CounterField value={autoAlgaeMiss} onChange={setAutoAlgaeMiss} text='Miss:'></CounterField>
                        <h3 className={`bodyDarkText ${styles.headerBlock}`}>Other</h3>
                        <Checkbox text='Ground Intake: ' checked={autoGroundIntake} onChange={setAutoGroundIntake} />
                        <Checkbox text='Auton Leave: ' checked={autoLeave} onChange={setAutoLeave} />
                      </div>
                      <div className={styles.rightSide}>
                        <h3 className={`bodyDarkText ${styles.headerBlock}`}>Coral</h3>
                        <CounterField value={autoL4} onChange={setAutoL4} text='L4:'></CounterField>
                        <CounterField value={autoL3} onChange={setAutoL3} text='L3:'></CounterField>
                        <CounterField value={autoL2} onChange={setAutoL2} text='L2:'></CounterField>
                        <CounterField value={autoL1} onChange={setAutoL1} text='L1:'></CounterField>
                        <CounterField value={autoCoralMiss} onChange={setAutoCoralMiss} text='Miss:'></CounterField>
                      </div>
                    </div>
                    <div className={styles.rightBlock}>
                      <div className={styles.leftSide}>
                        <h3 className={`bodyDarkText ${styles.headerBlock}`}>Coral</h3>
                        <CounterField value={teleL4} onChange={setTeleL4} text='L4:'></CounterField>
                        <CounterField value={teleL3} onChange={setTeleL3} text='L3:'></CounterField>
                        <CounterField value={teleL2} onChange={setTeleL2} text='L2:'></CounterField>
                        <CounterField value={teleL1} onChange={setTeleL1} text='L1:'></CounterField>
                        <CounterField value={teleCoralMiss} onChange={setTeleCoralMiss} text='Miss:'></CounterField>
                      </div>
                      <div className={styles.rightSide}>
                        <h3 className={`bodyDarkText ${styles.headerBlock}`}>Algae</h3>
                        <CounterField value={teleNet} onChange={setTeleNet} text='Net:'></CounterField>
                        <CounterField value={teleProcessor} onChange={setTeleProcessor} text='Processor:'></CounterField>
                        <CounterField value={teleAlgaeMiss} onChange={setTeleAlgaeMiss} text='Miss:'></CounterField>
                        <h3 className={`bodyDarkText ${styles.headerBlock}`}>Exit</h3>
                        <Checkbox text='Ground Intake: ' checked={teleGroundIntake} onChange={setTeleGroundIntake} />
                      </div>
                    </div>
                </div>
            </div>
            <div className={styles.section2} style={{ left: ((200 + (currentSlide * -100)).toString() + "%") }}>
              <div className={styles.centerColumn}>
                    <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>Post Match</h2>
                    <Dropdown text='Hang: ' value={teamHang} onChange={setTeamHang} options={[
                        { value: 'Deep', label: 'Deep' },
                        { value: 'Shallow', label: 'Shallow' },
                        { value: 'Park', label: 'Park' },
                        { value: 'None', label: 'None' },
                    ]}/>
                    <Dropdown text='Defense: ' value={defense} onChange={setDefense} options={[
                        { value: '0', label: '0 (No defense)' },
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                    ]}/>
                    <Paragraph text='Notes: ' placeholder='Notes notes notes...' value={notes} maxLength={570} onChange={setNotes}></Paragraph>
                </div>
            </div>
            <div className={styles.section3} style={{ left: ((300 + (currentSlide * -100)).toString() + "%") }}>
                <div className={styles.centerColumn}>
                    <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>Send Data</h2>
                    <div className={styles.horizontalBox}>
                      <button className={`bodyDarkText ${styles.dataButton}`} onClick={() => {
                        setShowQRCode(true);
                        updateQRCode();
                      }}>QR Codes</button>
                      <button className={`bodyDarkText ${styles.dataButton}`} onClick={() => {downloadJSON()}}>Download JSON</button>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.mobileSectionBox}>
          <div className={styles.mobileSection} style={{ left: ((0 + (currentSlide * -100)).toString() + "%") }}>
            <div className={styles.mobileCenterColumn}>
                <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>Team Selection</h2>
                <TextField text='Team Name: ' value={teamName} onChange={setTeamName} placeholder='Bluetonium' ></TextField>
                <NumberField text='Team Number: ' value={teamNumber} onChange={setTeamNumber} />
                <Dropdown text='Team Position: ' value={teamPosition} onChange={setTeamPosition} options={[
                    { value: 'Blue 1', label: 'Blue 1' },
                    { value: 'Blue 2', label: 'Blue 2' },
                    { value: 'Blue 3', label: 'Blue 3' },
                    { value: 'Red 1', label: 'Red 1' },
                    { value: 'Red 2', label: 'Red 2' },
                    { value: 'Red 3', label: 'Red 3' },
                ]}/>
                <NumberField text='Match Number: ' value={matchNumber} onChange={setMatchNumber} />
                <NumberField text='Match Year: ' value={matchYear} onChange={setMatchYear} />
            </div>
          </div>
          <div className={styles.mobileSection1} style={{ left: ((100 + (currentSlide * -100)).toString() + "%") }}>
              <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>{"Auto: #" + teamNumber}</h2>
              <h3 className={`bodyDarkText ${styles.headerBlock}`}>Coral</h3>
              <CounterField value={autoL4} onChange={setAutoL4} text='L4:'></CounterField>
              <CounterField value={autoL3} onChange={setAutoL3} text='L3:'></CounterField>
              <CounterField value={autoL2} onChange={setAutoL2} text='L2:'></CounterField>
              <CounterField value={autoL1} onChange={setAutoL1} text='L1:'></CounterField>
              <CounterField value={autoCoralMiss} onChange={setAutoCoralMiss} text='Miss:'></CounterField>
              <h3 className={`bodyDarkText ${styles.headerBlock}`}>Algae</h3>
              <CounterField value={autoNet} onChange={setAutoNet} text='Net:'></CounterField>
              <CounterField value={autoProcessor} onChange={setAutoProcessor} text='Processor:'></CounterField>
              <CounterField value={autoAlgaeMiss} onChange={setAutoAlgaeMiss} text='Miss:'></CounterField>
              <h3 className={`bodyDarkText ${styles.headerBlock}`}>Other</h3>
              <Checkbox text='Ground Intake: ' checked={autoGroundIntake} onChange={setAutoGroundIntake} />
              <Checkbox text='Auton Leave: ' checked={autoLeave} onChange={setAutoLeave} />
          </div>
          <div className={styles.mobileSection2} style={{ left: ((200 + (currentSlide * -100)).toString() + "%") }}>
            <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>{"Tele-Op: #" + teamNumber}</h2>
            <h3 className={`bodyDarkText ${styles.headerBlock}`}>Coral</h3>
            <CounterField value={teleL4} onChange={setTeleL4} text='L4:'></CounterField>
            <CounterField value={teleL3} onChange={setTeleL3} text='L3:'></CounterField>
            <CounterField value={teleL2} onChange={setTeleL2} text='L2:'></CounterField>
            <CounterField value={teleL1} onChange={setTeleL1} text='L1:'></CounterField>
            <CounterField value={teleCoralMiss} onChange={setTeleCoralMiss} text='Miss:'></CounterField>
            <h3 className={`bodyDarkText ${styles.headerBlock}`}>Algae</h3>
            <CounterField value={teleNet} onChange={setTeleNet} text='Net:'></CounterField>
            <CounterField value={teleProcessor} onChange={setTeleProcessor} text='Processor:'></CounterField>
            <CounterField value={teleAlgaeMiss} onChange={setTeleAlgaeMiss} text='Miss:'></CounterField>
            <h3 className={`bodyDarkText ${styles.headerBlock}`}>Other</h3>
            <Checkbox text='Ground Intake: ' checked={teleGroundIntake} onChange={setTeleGroundIntake} />
          </div>
          <div className={styles.mobileSection3} style={{ left: ((300 + (currentSlide * -100)).toString() + "%") }}>
            <div className={styles.mobileCenterColumn}>
                <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>{"Post Match: #" + teamNumber}</h2>
                <Dropdown text='Hang: ' value={teamHang} onChange={setTeamHang} options={[
                    { value: 'Deep', label: 'Deep' },
                    { value: 'Shallow', label: 'Shallow' },
                    { value: 'Park', label: 'Park' },
                    { value: 'None', label: 'None' },
                ]}/>
                <Dropdown text='Defense: ' value={defense} onChange={setDefense} options={[
                    { value: '0', label: '0 (No defense)' },
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                    { value: '4', label: '4' },
                    { value: '5', label: '5' },
                ]}/>
                <Paragraph text='Notes: ' placeholder='Notes notes notes...' value={notes} maxLength={570} onChange={setNotes}></Paragraph>
            </div>
          </div>
          <div className={styles.mobileSection4} style={{ left: ((400 + (currentSlide * -100)).toString() + "%") }}>
            <div className={styles.mobileCenterColumn}>
                <h2 className={`bodyDarkText ${styles.centerColumnTitleBlock}`}>Send Data</h2>
                <button className={`bodyDarkText ${styles.dataButton}`} onClick={() => {
                  setShowQRCode(true);
                  updateQRCode();
                }} style={{ width: "100%", marginTop: "16px" }}>QR Codes</button>
                <button className={`bodyDarkText ${styles.dataButton}`} onClick={() => {downloadJSON()}} style={{ width: "100%", marginTop: "16px" }}>Download JSON</button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>

      <h2 className={`bodyDarkText noSelect ${styles.cornerButton}`} onClick={() => {
        if(width < 1100) {
          manageMobileClick(currentSlide);
        } else {
          manageClick(currentSlide);
        }
      }}>Next</h2>

      {showQRCode && (
          <div className={styles.QRCodeMenu}>
              <div className={styles.QRCodeBox}>
                  {QRCodeElement}
                  <img 
                      src={close} 
                      className={styles.closeButton}
                      onClick={() => setShowQRCode(false)} 
                      alt="Close" 
                  />
              </div>
          </div>
      )}
    </>
  );
};

export default DataCollection;