import { useState } from 'react'
import robot from './assets/robot.png'
import ColorButton from './components/colorButton';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <div className="leftSection">
          {/* Put in "a" tags! */}
          <h2 className="titleDarkText">RoboScouts</h2>
          <h3 className="titleDarkText">Scouting</h3>
          <h3 className="titleDarkText">Tools</h3>
          <h3 className="titleDarkText">About Us</h3>
          <h3 className="titleDarkText">Legal</h3>
        </div>
        <div className="rightSection">
        <ColorButton color='var(--red)' textColor="var(--text)">Get Started</ColorButton>
        </div>
      </header>
      <main>
        <div className='hero'>
          <div className='leftSection'>
            <img src={robot}></img>
          </div>
          <div className='rightSection'>
            <h1 className='titleDarkText'>FRC RoboScouts</h1>
            <h3 className="titleDarkText">Predictions and alliances easier than ever before. Powered by Bluetonium 9081.</h3>
            <div className="buttonBox">
              <ColorButton color='var(--red)' textColor="var(--text)" style={{ marginRight: '24px' }}>Get Started</ColorButton>
              <ColorButton color='transparent' textColor="var(--blue)">Learn More</ColorButton>
            </div>
          </div>
        </div>
      </main>
      {/*<div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>RoboScouts</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>*/}
    </>
  )
}

export default App
