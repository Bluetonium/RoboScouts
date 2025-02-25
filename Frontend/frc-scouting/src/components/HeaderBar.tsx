import { useState, useEffect } from 'react';

import CTAButton from './CTAButton';
import NavBlock from './NavBlock';
import AccountMenu from './AccountMenu';
import styles from './HeaderBar.module.css';
import defaultPFP from '../assets/userSquare.png';
import menu from '../assets/menu.png';

import MobileNavigation from './MobileNavigation';

import { useToast } from './ToastContext';
import { Link } from 'react-router-dom';

function HeaderBar() {
    let linksMap = new Map();

    const toast = useToast();

    linksMap.set('Scouting', [
        {title: "Data Collection", link:"/scouting/data-collection"},
    ]);

    linksMap.set('Analysis', [
        {title: "Data Analysis", link:"/analysis/data-analysis"},
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

    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);

    // Function to generate header links
    function generateHeaderLinks() {
        const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

        return (
            <>
                {Array.from(linksMap.entries()).map(([sectionName, sectionData], index) => (
                    <div
                        className={styles.navElement}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        key={index}
                    >
                        <h3 className="bodyDarkText">{sectionName}</h3>
                        <NavBlock isVisible={hoveredIndex === index} data={sectionData}></NavBlock>
                    </div>
                ))}
            </>
        );
    }

    function handleClick() {
        setShowAccountMenu(prev => !prev);
    }

    function toggleMobileNav() {
        setShowMobileNav(prev => !prev);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            toast?.open('This website is under construction. Please be nice! :D');
        }, 4000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerLeftSection}>
                    <img src={menu} className={styles.menuImage} onClick={toggleMobileNav}></img>
                    <Link to={"/"}>
                        <h2 className="titleDarkText">RoboScouts</h2>
                    </Link>
                    {generateHeaderLinks()}
                </div>
                <div className={styles.headerRightSection}>
                    <CTAButton color='var(--red)' textColor="var(--text)" hoverMode="hoverMode1">Get Started</CTAButton>

                    <div className={styles.accountSquare} onClick={handleClick} style={{ display: "none" }}>
                        <img className={styles.accountSquareImg} src={defaultPFP} alt="User  Profile"/>
                    </div>
                </div>
            </div>
            <AccountMenu isVisible={showAccountMenu} />
            <MobileNavigation isVisible={showMobileNav}/>
        </>
    );
}

export default HeaderBar;