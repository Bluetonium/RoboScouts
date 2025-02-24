import styles from './Footer.module.css';

import { useState  } from 'react';
import Confetti from 'react-confetti';
import ColorButton from './ColorButton';

import { Link } from 'react-router-dom';

function Footer() {
    const [count, setCount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [numberOfPieces, setNumberOfPieces] = useState(0);

    let confettiButton = document.getElementById("confettiButton");
    let confettiX = 0;
    let confettiY = 0;
    if(confettiButton) {
        const confettiRect = confettiButton.getBoundingClientRect();
        confettiX = confettiRect.left;
        confettiY = confettiRect.top;
    }

    function countButton() {
        setCount((count) => count + 1);

        if((count + 1) % 127 === 0) {
        console.log("Confetti");
        setNumberOfPieces(100);
        setShowConfetti(true);
        setTimeout(() => setNumberOfPieces(0), 3000);
        setTimeout(() => setShowConfetti(false), 5000);
        }
    }

    let linksMap = new Map();

    linksMap.set('Scouting', [
    {title: "Information", link:"/CSSO/learn-more"},
    {title: "Get Started", link:"/CSSO/login"},
    {title: "Register Your Team", link:"/CSSO/login"},
    ]);

    linksMap.set('Tools', [
    {title: "Team Search", link:"/CSSO/curriculums"},
    {title: "Team Statistics", link:"/CSSO/curriculums/getting-started"},
    {title: "Find Your Team", link:"/CSSO/curriculums/how-to"},
    {title: "Auton Path Checking", link:"/CSSO/curriculums/courses"},
    {title: "Manual Scouting", link:"/CSSO/curriculums/learning-paths"},
    ]);

    linksMap.set('About Us', [
    {title: "Bluetonium 127", link:"/CSSO/clubs"},
    {title: "About Us", link:"/CSSO/clubs/benefits"},
    ]);

    linksMap.set('Legal', [
    {title: "Terms and Conditions", link:"/CSSO/projects"},
    {title: "Privacy Policy", link:"/CSSO/projects"},
    {title: "Contact Us", link:"/CSSO/projects/suggestions"},
    ]);

    function generateFooterLinks() {  
        return (
            <>
                {Array.from(linksMap.entries()).map(([sectionName, sectionData], index) => (
                    <div className={styles.footerColumn}>
                        <h2 className="titleDarkText" key={index}>{sectionName}</h2>
                        {
                            sectionData.map((item: { title: string, link: string }, index1: number) => (
                                <Link to={item.link} className={styles.navLink}>
                                    <h3 className="bodyDarkText" key={index1}>{item.title}</h3>
                                </Link>
                            ))
                        }
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className={styles.footer}>
            <div className={styles.divider} />
            <div className={styles.topSection}>
                <div className={styles.footerColumn}>
                    <h2 className="titleDarkText">RoboScouts</h2>
                    <h3 className="bodyDarkText" style={{ paddingBottom: '16px' }}>From Bluetonium 127!</h3>
                    <div>
                    <ColorButton color='transparent' id='confettiButton' textColor="var(--blue)" hoverMode="hoverMode2" onClick={countButton}>Count is {count}</ColorButton>
                    {confettiButton != null && showConfetti && (
                        <Confetti
                        numberOfPieces={numberOfPieces}
                        width={document.documentElement.scrollWidth}
                        height={document.documentElement.scrollHeight}
                        gravity={0.1}
                        recycle={false}
                        confettiSource={{
                            x: confettiX + window.scrollX,
                            y: confettiY + window.scrollY,
                            w: confettiButton.offsetWidth,
                            h: confettiButton.offsetHeight
                        }}
                        />
                    )}
                    </div>
                </div>
                {generateFooterLinks()}
            </div>
            <div className={styles.divider} />
            <div className={styles.bottomSection}>
                <div className={styles.leftSection}>
                    <h3 className="bodyDarkText">© Silas Lovett 2024. All Rights Reserved.</h3>
                </div>
            </div>
        </div>
    )
}

export default Footer;