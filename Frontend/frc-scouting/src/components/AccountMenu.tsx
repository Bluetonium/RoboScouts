import React from 'react';
import styles from './AccountMenu.module.css';
import defaultPFP from '../assets/userSquare.png';
import cog from '../assets/ionicons/cog.svg';
import apps from '../assets/ionicons/apps-sharp.svg';
import doc from '../assets/ionicons/document-text.svg';

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

  return (
    <div className={`${styles.accountMenu} ${getDisplayClass()}`}>
        <img className={styles.accountImg} src={defaultPFP} />
        <div className={styles.rightSection}>
            <div className={styles.topSection}>
                <h2 className="titleDarkText">Maverick Dick</h2>
            </div>
            <div className={styles.bottomSection}>
                <img src={apps} className={styles.imageButton} style={{padding: "3px"}}/>
                <img src={doc} className={styles.imageButton} />
                <img src={cog} className={styles.imageButton} />
            </div>
        </div>
    </div>
  );
}

export default AccountMenu;