import { useEffect, useState } from 'react';

import HeaderBar from '../components/HeaderBar';
import LoadingScreen from '../components/LoadingScreen';
import Footer from '../components/Footer';

import close from '../assets/ionicons/close2.svg';
import scan from '../assets/ionicons/scan.svg';
import download from '../assets/ionicons/download.svg';
import upload from '../assets/ionicons/upload.svg';
import add from '../assets/ionicons/add.svg';

import Tooltip from '../components/Tooltip';

// Credits:
// Confetti library
// Ionicons
// QR code libraries

import '../constants.css';
import style from './team-analysis.module.css';

const DataCollection = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const [dataMap, setDataMap] = useState<Map<string, any>>(new Map());

  const addJsonToMap = (key: string, jsonString: string) => {
    try {
      const jsonObject = JSON.parse(jsonString);

      setDataMap((prevMap) => new Map(prevMap).set(key, jsonObject));
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  useEffect(() => {
    console.log(dataMap);
  }, [dataMap]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; // Get the selected files
  
    // Check if selectedFiles is not null
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles); // Convert FileList to an array
  
      filesArray.forEach((file) => {
        if (file && file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const jsonString = e.target?.result; // Use optional chaining to safely access result
            if (typeof jsonString === 'string') {
              const key = file.name.split('.').slice(0, -1).join('.'); // Get the file name without the extension
              addJsonToMap(key, jsonString); // Call your function to handle the JSON string
              console.log(dataMap);
            } else {
              console.error('File content is not a valid string.');
            }
          };
          reader.readAsText(file); // Read the file as text
        } else {
          console.error('Please upload a valid JSON file.');
        }
      });
    } else {
      console.error('No files selected.');
    }

    event.target.value = "";
  };

  function generateOptions() {
    const keys = Array.from(dataMap.keys());
  
    return (
      <>
        {keys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </>
    );
  }

  const [selectedValue, setSelectedValue] = useState("None");

  const [teamName, setTeamName] = useState("None");
  const [teamNumber, setTeamNumber] = useState(0);
  const [teamPosition, setTeamPosition] = useState("None");
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

  const [teamHang, setTeamHang] = useState("None");

  const [notes, setNotes] = useState("None");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value; // Get the selected value
    let teamData = dataMap.get(selectedValue);

    setSelectedValue(selectedValue);

    setTeamName(teamData.name);
    setTeamNumber(teamData.number);

    if(teamData.position == "red1") { setTeamPosition("Red 1"); } else
    if(teamData.position == "red2") { setTeamPosition("Red 2"); } else 
    if(teamData.position == "red3") { setTeamPosition("Red 3"); } else 
    if(teamData.position == "blue1") { setTeamPosition("Blue 1"); } else 
    if(teamData.position == "blue2") { setTeamPosition("Blue 2"); } else 
    if(teamData.position == "blue3") { setTeamPosition("Blue 3"); }

    setMatchNumber(teamData.match);

    setAutoL4(teamData.autoCoral.L4);
    setAutoL3(teamData.autoCoral.L3);
    setAutoL2(teamData.autoCoral.L2);
    setAutoL1(teamData.autoCoral.L1);
    setAutoMiss(teamData.autoCoral.miss);
    setAutoNet(teamData.autoAlgae.net);
    setAutoProcessor(teamData.autoAlgae.processor);

    setAutoGround(teamData.autoLeave.ground);
    setAutoLeave(teamData.autoLeave.leave);

    setTeleL4(teamData.teleCoral.L4);
    setTeleL3(teamData.teleCoral.L3);
    setTeleL2(teamData.teleCoral.L2);
    setTeleL1(teamData.teleCoral.L1);
    setTeleMiss(teamData.teleCoral.miss);
    setTeleNet(teamData.teleAlgae.net);
    setTeleProcessor(teamData.teleAlgae.processor);

    setTeleGround(teamData.teleLeave.ground);

    setTeamHang(teamData.hang);
    setNotes(teamData.notes);
  };

  function deleteItem(key: string) {
    setSelectedValue("None");
    setTeamName("None");
    setTeamNumber(0);
    setTeamPosition("None");
    setMatchNumber(0);
    setAutoL4(0);
    setAutoL3(0);
    setAutoL2(0);
    setAutoL1(0);
    setAutoMiss(0);
    setAutoNet(0);
    setAutoProcessor(0);
    setAutoGround(false);
    setAutoLeave(false);

    setTeleL4(0);
    setTeleL3(0);
    setTeleL2(0);
    setTeleL1(0);
    setTeleMiss(0);
    setTeleNet(0);
    setTeleProcessor(0);

    setTeleGround(false);

    setTeamHang("None");
    setNotes("None");

    dataMap.delete(key);
  }

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null); 
  
  const handleMouseEnter = (index: number) => { 
    setActiveTooltip(index); 
  }; 
  
  const handleMouseLeave = () => { 
    setActiveTooltip(null);
  };

  function downloadDataSet() {
    const jsonString = JSON.stringify(Array.from(dataMap.entries()), null, 4);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dataSet`; // Specify the file name
    document.body.appendChild(a);
    a.click(); // Trigger the download
    document.body.removeChild(a); // Clean up
  }

  const uploadDataSet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files; // Get the selected files
  
    // Check if selectedFiles is not null
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles); // Convert FileList to an array
  
      filesArray.forEach((file) => {
        if (file && file.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (e) => {
            const jsonString = e.target?.result; // Use optional chaining to safely access result
          
            if (typeof jsonString === 'string') {
              try {
                // Parse the JSON string into a JavaScript array
                const jsonArray: [string, any][] = JSON.parse(jsonString); // Explicitly type the array
          
                // Create a Map from the parsed JSON array
                const dataMap = new Map<string, any>(jsonArray);
          
                // Iterate over the Map and add each key-value pair
                dataMap.forEach((value, key) => {
                  setDataMap((prevMap) => new Map(prevMap).set(key, value));
                });
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
            } else {
              console.error('File content is not a valid string.');
            }
          };
          reader.readAsText(file); // Read the file as text
        } else {
          console.error('Please upload a valid JSON file.');
        }
      });
    } else {
      console.error('No files selected.');
    }

    event.target.value = "";
  }

  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <LoadingScreen isVisible={showLoadingScreen}></LoadingScreen>
      <main className={style.wholeContainer}>
        <div className={style.importHeader}>
          <div className={style.groupLeft}>
            <select className={style.selectionDropdown} onChange={handleSelectChange}>
              <option unselectable="on">Upload data / dataset!</option>
              {generateOptions()}
            </select>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
              <img className={style.importHeaderButton} src={scan} />
              {activeTooltip === 1 && <Tooltip message={"Scan QR Code"} />}
            </div>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
              <label style={{ height: "100%", aspectRatio: "1" }} htmlFor="file-upload">
                <img className={style.importHeaderButton} src={add} />
              </label>
              <input 
                type="file"
                style={{ display: "none" }}
                id='file-upload'
                accept=".json, application/json"
                onChange={handleFileChange}
                multiple={true}
              />
              {activeTooltip === 2 && <Tooltip message={"Upload JSON"} />}
            </div>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
              <img className={style.importHeaderButton} src={close} onClick={() => {deleteItem(selectedValue)}} />
              {activeTooltip === 3 && <Tooltip message={"Remove JSON"} />}
            </div>
          </div>
          <div className={style.groupRight}>

            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
              <label style={{ height: "100%", aspectRatio: "1" }} htmlFor="data-upload">
                <img className={style.importHeaderButton} src={upload} />
              </label>
              <input 
                type="file"
                style={{ display: "none" }}
                id='data-upload'
                accept=".json, application/json"
                onChange={uploadDataSet}
                multiple={true}
              />
              {activeTooltip === 4 && <Tooltip message={"Upload Data Set"} />}
            </div>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave} onClick={downloadDataSet}>
              <img className={style.importHeaderButton} src={download} />
              {activeTooltip === 5 && <Tooltip message={"Download Data Set"} />}
            </div>

          </div>
        </div>

        <div className={style.importHeader2}>
            <select className={style.selectionDropdown} onChange={handleSelectChange}>
              <option unselectable="on">Upload data / dataset!</option>
              {generateOptions()}
            </select>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
              <img className={style.importHeaderButton} src={scan} />
              {activeTooltip === 1 && <Tooltip message={"Scan QR Code"} />}
            </div>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
              <label style={{ height: "100%", aspectRatio: "1" }} htmlFor="file-upload">
                <img className={style.importHeaderButton} src={add} />
              </label>
              <input 
                type="file"
                style={{ display: "none" }}
                id='file-upload'
                accept=".json, application/json"
                onChange={handleFileChange}
                multiple={true}
              />
              {activeTooltip === 2 && <Tooltip message={"Upload JSON"} />}
            </div>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
              <img className={style.importHeaderButton} src={close} onClick={() => {deleteItem(selectedValue)}} />
              {activeTooltip === 3 && <Tooltip message={"Remove JSON"} />}
            </div>

            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}>
              <label style={{ height: "100%", aspectRatio: "1" }} htmlFor="data-upload">
                <img className={style.importHeaderButton} src={upload} />
              </label>
              <input 
                type="file"
                style={{ display: "none" }}
                id='data-upload'
                accept=".json, application/json"
                onChange={uploadDataSet}
                multiple={true}
              />
              {activeTooltip === 4 && <Tooltip message={"Upload Data Set"} />}
            </div>
            <div className={style.buttonBox} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave} onClick={downloadDataSet}>
              <img className={style.importHeaderButton} src={download} />
              {activeTooltip === 5 && <Tooltip message={"Download Data Set"} />}
            </div>

        </div>

        <div className={style.teamHeader}>
          <h3 className={`bodyDarkText`}>#{teamNumber} ({teamName}), Match #{matchNumber}, {teamPosition}</h3>
        </div>

        <div className={style.teamData}>
          <div className={style.teamDataColumn}>
            <h3 className={`bodyDarkText ${style.teamDataTitle}`}>Auto</h3>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L4</h3>
              <h3 className={`bodyDarkText`}>{autoL4}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L3</h3>
              <h3 className={`bodyDarkText`}>{autoL3}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L2</h3>
              <h3 className={`bodyDarkText`}>{autoL2}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L1</h3>
              <h3 className={`bodyDarkText`}>{autoL1}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Miss</h3>
              <h3 className={`bodyDarkText`}>{autoMiss}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Net</h3>
              <h3 className={`bodyDarkText`}>{autoNet}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Processor</h3>
              <h3 className={`bodyDarkText`}>{autoProcessor}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Ground</h3>
              <h3 className={`bodyDarkText`}>{autoGround && "Yes" || "No"}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Leave</h3>
              <h3 className={`bodyDarkText`}>{autoLeave && "Yes" || "No"}</h3>
            </div>
          </div>
          <div className={style.teamDataColumn}>
            <h3 className={`bodyDarkText ${style.teamDataTitle}`}>Tele-Op</h3>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L4</h3>
              <h3 className={`bodyDarkText`}>{teleL4}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L3</h3>
              <h3 className={`bodyDarkText`}>{teleL3}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L2</h3>
              <h3 className={`bodyDarkText`}>{teleL2}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>L1</h3>
              <h3 className={`bodyDarkText`}>{teleL1}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Miss</h3>
              <h3 className={`bodyDarkText`}>{teleMiss}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Net</h3>
              <h3 className={`bodyDarkText`}>{teleNet}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Processor</h3>
              <h3 className={`bodyDarkText`}>{teleProcessor}</h3>
            </div>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Leave</h3>
              <h3 className={`bodyDarkText`}>{teleGround && "Yes" || "No"}</h3>
            </div>
          </div>
          <div className={style.teamDataColumn}>
            <h3 className={`bodyDarkText ${style.teamDataTitle}`}>Data</h3>
            <div className={style.teamDataItem}>
              <h3 className={`bodyDarkText`}>Hang</h3>
              <h3 className={`bodyDarkText`}>{teamHang}</h3>
            </div>
            <div className={style.teamDataNotes}>
              <h3 className={`bodyDarkText`}>{notes}</h3>
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