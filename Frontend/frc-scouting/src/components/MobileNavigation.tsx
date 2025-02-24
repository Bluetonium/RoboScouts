import {  useState } from 'react';
import styles from './MobileNavigation.module.css';

import arrow from '../assets/arrow.png';

import MobileNavSection from './MobileNavSection';

import { Link } from 'react-router-dom';


interface Props {
  children?: React.ReactNode;
  isVisible: boolean;
}

function MobileNavigation(props: Props) {

  const getDisplayClass = () => {
    let className = '';

    const mobileNavigation = document.querySelector(`.${styles.mobileNavigation}`);

    if(mobileNavigation) {
        const computedStyle = getComputedStyle(mobileNavigation); 
        const leftValue = parseFloat(computedStyle.left);

        if (props.isVisible) {
            className = styles.fadeIn;
        } else if(leftValue >= 0) {
            className = styles.fadeOut;
        }
    }

    return className;
  };

  let linksMap = new Map();

  linksMap.set('Scouting', [
      { title: "Information", link: "/CSSO/learn-more" },
      { title: "Get Started", link: "/CSSO/login" },
      { title: "Register Your Team", link: "/CSSO/login" },
  ]);

  linksMap.set('Tools', [
      { title: "Team Search", link: "/search-teams" },
      { title: "Team Statistics", link: "/CSSO/curriculums/getting-started" },
      { title: "Find Your Team", link: "/CSSO/curriculums/how-to" },
      { title: "Auton Path Checking", link: "/CSSO/curriculums/courses" },
      { title: "Manual Scouting", link: "/CSSO/curriculums/learning-paths" },
  ]);

  linksMap.set('About Us', [
      { title: "Bluetonium 127", link: "/CSSO/clubs" },
      { title: "About Us", link: "/CSSO/clubs/benefits" },
  ]);

  linksMap.set('Legal', [
      { title: "Terms and Conditions", link: "/CSSO/projects" },
      { title: "Privacy Policy", link: "/CSSO/projects" },
      { title: "Contact Us", link: "/CSSO/projects/suggestions" },
  ]);

  interface ItemType { 
    title: string; 
    link: string;
  }

  // Function to generate header links
  function generateMobileLinks() {
      const [activeIndices, setActiveIndices] = useState<number[]>([]);

      function handleClick(index: number) {
        setActiveIndices(prevState => {
          if (prevState.includes(index)) { 
            return prevState.filter(i => i !== index); 
          } else { 
            return [...prevState, index]; 
          }
        });
      }

      const getDisplayClass = (index: number) => {
        let className = '';
    
        if(activeIndices.includes(index)) {
          className = styles.dark;
        } else {
          className = styles.light;
        }
    
        return className;
      };

      return (
        <>
          <Link to={"/"} className={styles.link}>
            <div className={`${styles.navigationHeader}`}>
                <h2 className={`${styles.navigationHeaderText} titleDarkText`}>Home</h2>
            </div>
          </Link>
          {Array.from(linksMap.entries()).map(([headerString, sectionData]: [string, ItemType[]], index) => (
            <div className={`${styles.navigationSection} noSelect`} key={index}>
              <div className={`${styles.navigationHeader} ${getDisplayClass(index)}`} onClick={() => handleClick(index)}>
                  <h2 className={`${styles.navigationHeaderText} titleDarkText`}>{headerString}</h2>
                  <img src={arrow} className={styles.navigationHeaderImage}></img>
              </div>
              <MobileNavSection data={sectionData} active={activeIndices.includes(index)}></MobileNavSection>
            </div>
          ))}
        </>
      );
  }
  

  return (
    <div className={`${styles.mobileNavigation} ${getDisplayClass()}`}>
      <div className={styles.navigationLinks}>
        {generateMobileLinks()}
      </div>
    </div>
  );
}

export default MobileNavigation;