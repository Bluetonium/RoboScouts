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
        {title: "Data Collection", link:"/scouting/data-collection"},
        {title: "Get Started", link:"/get-started"},
    ]);

    linksMap.set('Analysis', [
        {title: "Data Analysis", link:"/analysis/data-analysis"},
        {title: "Team Analysis", link:"/analysis/team-analysis"},
    ]);

    linksMap.set('Tools', [
        {title: "Team Search", link:"/tools/team-search"},
    ]);

    linksMap.set('About Us', [
        {title: "About Us", link:"/about-us/"},
    ]);

    linksMap.set('Legal', [
        {title: "Terms and Conditions", link:"/legal/terms-and-conditions"},
        {title: "Privacy Policy", link:"/legal/privacy-policy"},
        {title: "Contact Us", link:"/legal/contact-us"},
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
                    <Link to={"/"}>
                        <h2 className="titleDarkText">RoboScouts</h2>
                    </Link>
                    <Link to={"/about-us"}>
                        <h3 className="bodyDarkText" style={{ paddingBottom: '16px' }}>From Bluetonium 127!</h3>
                    </Link>
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
                    <Link to={"/legal/terms-and-conditions"}>
                        <h3 className="bodyDarkText">© Silas Lovett 2025. All Rights Reserved.</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;