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


import './data-collection.css';
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
  const [teamPosition, setTeamPosition] = useState("");
  const [matchNumber, setMatchNumber] = useState(0);

  const [autoL4, setAutoL4] = useState(0);
  const [autoL3, setAutoL3] = useState(0);
  const [autoL2, setAutoL2] = useState(0);
  const [autoL1, setAutoL1] = useState(0);
  const [autoMiss, setAutoMiss] = useState(0);

  const [autoNet, setAutoNet] = useState(0);
  const [autoProcessor, setAutoProcessor] = useState(0);

  const [autoLeave, setAutoLeave] = useState(false);
  const [autoGround, setAutoGround] = useState(false);

  const [teleL4, setTeleL4] = useState(0);
  const [teleL3, setTeleL3] = useState(0);
  const [teleL2, setTeleL2] = useState(0);
  const [teleL1, setTeleL1] = useState(0);
  const [teleMiss, setTeleMiss] = useState(0);

  const [teleNet, setTeleNet] = useState(0);
  const [teleProcessor, setTeleProcessor] = useState(0);

  const [teleGround, setTeleGround] = useState(false);

  const [teamHang, setTeamHang] = useState("");

  const [notes, setNotes] = useState("");

  function downloadJSON() {
    const jsonString = JSON.stringify({
      name: teamName,
      number: teamNumber,
      position: teamPosition,
      match: matchNumber,
      year: 2025,
      autoCoral: {
        L4: autoL4,
        L3: autoL3,
        L2: autoL2,
        L1: autoL1,
        miss: autoMiss,
      },
      autoAlgae: {
        net: autoNet,
        processor: autoProcessor
      },
      autoLeave: {
        leave: autoLeave,
        ground: autoGround,
      },
      teleCoral: {
        L4: teleL4,
        L3: teleL3,
        L2: teleL2,
        L1: teleL1,
        miss: teleMiss,
      },
      teleAlgae: {
        net: teleNet,
        processor: teleProcessor
      },
      hang: teamHang,
      teleLeave: {
        ground: teleGround,
      },
      notes: notes,
    }, null, 4);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json'; // Specify the file name
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
      year: 2025,
      autoCoral: {
        L4: autoL4,
        L3: autoL3,
        L2: autoL2,
        L1: autoL1,
        miss: autoMiss,
      },
      autoAlgae: {
        net: autoNet,
        processor: autoProcessor
      },
      autoLeave: {
        leave: autoLeave,
        ground: autoGround,
      },
      teleCoral: {
        L4: teleL4,
        L3: teleL3,
        L2: teleL2,
        L1: teleL1,
        miss: teleMiss,
      },
      teleAlgae: {
        net: teleNet,
        processor: teleProcessor
      },
      hang: teamHang,
      teleLeave: {
        ground: teleGround,
      },
      notes: notes,
    }, null, 4);

    setQRCodeElement(<QRCode 
      value={jsonString}
      size={1024}
      bgColor="#FFFFFF"
      fgColor="#000000"
      level="L"
      className='QRCode'
    />);
  }

  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <LoadingScreen isVisible={showLoadingScreen}></LoadingScreen>
      <main>
        <div className='sectionBox'>
            <div className='section' style={{ left: ((0 + (currentSlide * -100)).toString() + "%") }}>
                <div className='centerColumn'>
                    <h2 className='bodyDarkText centerColumnTitleBlock'>Team Selection</h2>
                    <TextField text='Team Name: ' value={teamName} onChange={setTeamName} placeholder='Bluetonium' ></TextField>
                    <NumberField text='Team Number: ' value={teamNumber} onChange={setTeamNumber} />
                    <Dropdown text='Team Position: ' value={teamPosition} onChange={setTeamPosition} options={[
                        { value: 'blue1', label: 'Blue 1' },
                        { value: 'blue2', label: 'Blue 2' },
                        { value: 'blue3', label: 'Blue 3' },
                        { value: 'red1', label: 'Red 1' },
                        { value: 'red2', label: 'Red 2' },
                        { value: 'red3', label: 'Red 3' },
                    ]}/>
                    <NumberField text='Match Number: ' value={matchNumber} onChange={setMatchNumber} />
                </div>
            </div>
            <div className='section1' style={{ left: ((100 + (currentSlide * -100)).toString() + "%") }}>
                <div className='headerSection'>
                    <h2 className='bodyDarkText subtitleBlock'>Auto</h2>
                    <h2 className='bodyDarkText titleBlock'>#128: #24950</h2>
                    <h2 className='bodyDarkText subtitleBlock'>Tele-Op</h2>
                </div>
                <div className='bodyBlock'>
                    <div className='leftBlock'>
                      <div className='leftSide'>
                        <h3 className='headerBlock bodyDarkText'>Algae</h3>
                        <CounterField value={autoNet} onChange={setAutoNet} text='Net:'></CounterField>
                        <CounterField value={autoProcessor} onChange={setAutoProcessor} text='Processor:'></CounterField>
                        <h3 className='headerBlock bodyDarkText'>Exit</h3>
                        <Checkbox text='Ground: ' checked={autoGround} onChange={setAutoGround} />
                        <Checkbox text='Leave: ' checked={autoLeave} onChange={setAutoLeave} />
                      </div>
                      <div className='rightSide'>
                        <h3 className='headerBlock bodyDarkText'>Coral</h3>
                        <CounterField value={autoL4} onChange={setAutoL4} text='L4:'></CounterField>
                        <CounterField value={autoL3} onChange={setAutoL3} text='L3:'></CounterField>
                        <CounterField value={autoL2} onChange={setAutoL2} text='L2:'></CounterField>
                        <CounterField value={autoL1} onChange={setAutoL1} text='L1:'></CounterField>
                        <CounterField value={autoMiss} onChange={setAutoMiss} text='Miss:'></CounterField>
                      </div>
                    </div>
                    <div className='rightBlock'>
                      <div className='leftSide'>
                        <h3 className='headerBlock bodyDarkText'>Coral</h3>
                        <CounterField value={teleL4} onChange={setTeleL4} text='L4:'></CounterField>
                        <CounterField value={teleL3} onChange={setTeleL3} text='L3:'></CounterField>
                        <CounterField value={teleL2} onChange={setTeleL2} text='L2:'></CounterField>
                        <CounterField value={teleL1} onChange={setTeleL1} text='L1:'></CounterField>
                        <CounterField value={teleMiss} onChange={setTeleMiss} text='Miss:'></CounterField>
                      </div>
                      <div className='rightSide'>
                        <h3 className='headerBlock bodyDarkText'>Algae</h3>
                        <CounterField value={teleNet} onChange={setTeleNet} text='Net:'></CounterField>
                        <CounterField value={teleProcessor} onChange={setTeleProcessor} text='Processor:'></CounterField>
                        <h3 className='headerBlock bodyDarkText'>Exit</h3>
                        <Checkbox text='Ground: ' checked={teleGround} onChange={setTeleGround} />
                      </div>
                    </div>
                </div>
            </div>
            <div className='section2' style={{ left: ((200 + (currentSlide * -100)).toString() + "%") }}>
              <div className='centerColumn'>
                    <h2 className='bodyDarkText centerColumnTitleBlock'>Post Match</h2>
                    <Dropdown text='Hang: ' value={teamHang} onChange={setTeamHang} options={[
                        { value: 'deep', label: 'Deep' },
                        { value: 'shallow', label: 'Shallow' },
                    ]}/>
                    <Paragraph text='Notes: ' placeholder='Notes notes notes...' value={notes} maxLength={570} onChange={setNotes}></Paragraph>
                </div>
            </div>
            <div className='section3' style={{ left: ((300 + (currentSlide * -100)).toString() + "%") }}>
                <div className='centerColumn'>
                    <h2 className='bodyDarkText centerColumnTitleBlock'>Send Data</h2>
                    <div className='horizontalBox'>
                      <button className='bodyDarkText dataButton' onClick={() => {
                        setShowQRCode(true);
                        updateQRCode();
                      }}>QR Codes</button>
                      <button className='bodyDarkText dataButton' onClick={() => {downloadJSON()}}>Download JSON</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='mobileSectionBox'>
          <div className='mobileSection' style={{ left: ((0 + (currentSlide * -100)).toString() + "%") }}>
            <div className='mobileCenterColumn'>
                <h2 className='bodyDarkText centerColumnTitleBlock'>Team Selection</h2>
                <TextField text='Team Name: ' value={teamName} onChange={setTeamName} placeholder='Bluetonium' ></TextField>
                <NumberField text='Team Number: ' value={teamNumber} onChange={setTeamNumber} />
                <Dropdown text='Team Position: ' value={teamPosition} onChange={setTeamPosition} options={[
                    { value: 'blue1', label: 'Blue 1' },
                    { value: 'blue2', label: 'Blue 2' },
                    { value: 'blue3', label: 'Blue 3' },
                    { value: 'red1', label: 'Red 1' },
                    { value: 'red2', label: 'Red 2' },
                    { value: 'red3', label: 'Red 3' },
                ]}/>
                <NumberField text='Match Number: ' value={matchNumber} onChange={setMatchNumber} />
            </div>
          </div>
          <div className='mobileSection1' style={{ left: ((100 + (currentSlide * -100)).toString() + "%") }}>
              <h2 className='bodyDarkText centerColumnTitleBlock'>{"Auto: #" + teamNumber}</h2>
              <h3 className='headerBlock bodyDarkText'>Coral</h3>
              <CounterField value={autoL4} onChange={setAutoL4} text='L4:'></CounterField>
              <CounterField value={autoL3} onChange={setAutoL3} text='L3:'></CounterField>
              <CounterField value={autoL2} onChange={setAutoL2} text='L2:'></CounterField>
              <CounterField value={autoL1} onChange={setAutoL1} text='L1:'></CounterField>
              <CounterField value={autoMiss} onChange={setAutoMiss} text='Miss:'></CounterField>
              <h3 className='headerBlock bodyDarkText'>Algae</h3>
              <CounterField value={autoNet} onChange={setAutoNet} text='Net:'></CounterField>
              <CounterField value={autoProcessor} onChange={setAutoProcessor} text='Processor:'></CounterField>
              <h3 className='headerBlock bodyDarkText'>Exit</h3>
              <Checkbox text='Ground: ' checked={autoGround} onChange={setAutoGround} />
              <Checkbox text='Leave: ' checked={autoLeave} onChange={setAutoLeave} />
          </div>
          <div className='mobileSection2' style={{ left: ((200 + (currentSlide * -100)).toString() + "%") }}>
          <h2 className='bodyDarkText centerColumnTitleBlock'>{"Tele-Op: #" + teamNumber}</h2>
            <h3 className='headerBlock bodyDarkText'>Coral</h3>
            <CounterField value={teleL4} onChange={setTeleL4} text='L4:'></CounterField>
            <CounterField value={teleL3} onChange={setTeleL3} text='L3:'></CounterField>
            <CounterField value={teleL2} onChange={setTeleL2} text='L2:'></CounterField>
            <CounterField value={teleL1} onChange={setTeleL1} text='L1:'></CounterField>
            <CounterField value={teleMiss} onChange={setTeleMiss} text='Miss:'></CounterField>
            <h3 className='headerBlock bodyDarkText'>Algae</h3>
            <CounterField value={teleNet} onChange={setTeleNet} text='Net:'></CounterField>
            <CounterField value={teleProcessor} onChange={setTeleProcessor} text='Processor:'></CounterField>
            <h3 className='headerBlock bodyDarkText'>Exit</h3>
            <Checkbox text='Ground: ' checked={teleGround} onChange={setTeleGround} />
          </div>
          <div className='mobileSection3' style={{ left: ((300 + (currentSlide * -100)).toString() + "%") }}>
            <div className='mobileCenterColumn'>
                <h2 className='bodyDarkText centerColumnTitleBlock'>{"Post Match: #" + teamNumber}</h2>
                <Dropdown text='Hang: ' value={teamHang} onChange={setTeamHang} options={[
                    { value: 'deep', label: 'Deep' },
                    { value: 'shallow', label: 'Shallow' },
                ]}/>
                <Paragraph text='Notes: ' placeholder='Notes notes notes...' value={notes} maxLength={570} onChange={setNotes}></Paragraph>
            </div>
          </div>
          <div className='mobileSection4' style={{ left: ((400 + (currentSlide * -100)).toString() + "%") }}>
            <div className='mobileCenterColumn'>
                <h2 className='bodyDarkText centerColumnTitleBlock'>Send Data</h2>
                <button className='bodyDarkText dataButton' onClick={() => {
                  setShowQRCode(true);
                  updateQRCode();
                }} style={{ width: "100%", marginTop: "16px" }}>QR Codes</button>
                <button className='bodyDarkText dataButton' onClick={() => {downloadJSON()}} style={{ width: "100%", marginTop: "16px" }}>Download JSON</button>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>

      <h2 className='cornerButton bodyDarkText noSelect' onClick={() => {
        if(width < 1100) {
          manageMobileClick(currentSlide);
        } else {
          manageClick(currentSlide);
        }
      }}>Next</h2>

      {showQRCode && (
          <div className='QRCodeMenu'>
              <div className='QRCodeBox'>
                  {QRCodeElement}
                  <img 
                      src={close} 
                      className='closeButton' 
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