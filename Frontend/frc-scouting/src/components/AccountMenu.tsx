import React, { useState } from 'react';
import styles from './AccountMenu.module.css';
import defaultPFP from '../assets/userSquare.png';
import cog from '../assets/ionicons/cog.svg';
import apps from '../assets/ionicons/apps-sharp.svg';
import doc from '../assets/ionicons/document-text.svg';

import Tooltip from './Tooltip.tsx';

interface Props {
  children?: React.ReactNode;
  isVisible: boolean;
}

function AccountMenu(props: Props) {

  const getDisplayClass = () => {
    let className = '';

    const accountMenu = document.querySelector(`.${styles.accountMenu}`);

    if(accountMenu) {
        const computedStyle = getComputedStyle(accountMenu); 
        const topValue = parseFloat(computedStyle.top);

        if (props.isVisible) {
            className = styles.fadeIn;
        } else if(topValue > 0) {
            className = styles.fadeOut;
        }
    }

    return className;
  };

  const [activeTooltip, setActiveTooltip] = useState<number | null>(null); 
  
  const handleMouseEnter = (index: number) => { 
    setActiveTooltip(index); 
  }; 
  
  const handleMouseLeave = () => { 
    setActiveTooltip(null);
  };

  return (
    <div className={`${styles.accountMenu} ${getDisplayClass()}`}>
        <img className={styles.accountImg} src={defaultPFP} />
        <div className={styles.rightSection}>
            <div className={styles.topSection}>
                <h2 className="titleDarkText">Username</h2>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.auto} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                  <img src={apps} className={styles.imageButton} style={{padding: "3px"}}/>
                  {activeTooltip === 1 && <Tooltip message={"Dashboard"} />}
                </div>
                <div className={styles.auto} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                  <img src={doc} className={styles.imageButton} />
                  {activeTooltip === 2 && <Tooltip message={"View Account"} />}
                </div>
                <div className={styles.auto} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
                  <img src={cog} className={styles.imageButton} />
                  {activeTooltip === 3 && <Tooltip message={"Edit Settings"} />}
                </div>
            </div>
        </div>
    </div>
  );
}

export default AccountMenu;