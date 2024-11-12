import { useState, useEffect } from 'react';

import CTAButton from './CTAButton';
import NavBlock from './NavBlock';
import AccountMenu from './AccountMenu';
import styles from './HeaderBar.module.css';
import defaultPFP from '../assets/userSquare.png';
import menu from '../assets/menu.png';

import MobileNavigation from './MobileNavigation';

import { useToast } from './ToastContext';

function HeaderBar() {
    let linksMap = new Map();

    const toast = useToast();

    linksMap.set('Scouting', [
        { title: "Information", link: "/CSSO/learn-more" },
        { title: "Get Started", link: "/CSSO/login" },
        { title: "Register Your Team", link: "/CSSO/login" },
    ]);

    linksMap.set('Tools', [
        { title: "Team Search", link: "/CSSO/curriculums" },
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
                    <a href='/' target='_blank'>
                        <h2 className="titleDarkText">RoboScouts</h2>
                    </a>
                    {generateHeaderLinks()}
                </div>
                <div className={styles.headerRightSection}>
                    <CTAButton color='var(--red)' textColor="var(--text)" hoverMode="hoverMode1">Get Started</CTAButton>

                    <div className={styles.accountSquare} onClick={handleClick}>
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