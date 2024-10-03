import { useState } from 'react';
import CTAButton from './CTAButton';
import NavBlock from './NavBlock';
import styles from './HeaderBar.module.css';

function HeaderBar() {
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
                        <a href='/hello' target='_blank'>
                            <h3 className="bodyDarkText">{sectionName}</h3>
                        </a>
                        <NavBlock isVisible={hoveredIndex === index} data={sectionData}></NavBlock>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className={styles.header}>
            <div className={styles.headerLeftSection}>
                <a href='/' target='_blank'>
                    <h2 className="titleDarkText">RoboScouts</h2>
                </a>
                {generateHeaderLinks()}
            </div>
            <div className={styles.headerRightSection}>
                <CTAButton color='var(--red)' textColor="var(--text)" style={{ marginRight: '24px' }} hoverMode="hoverMode1">Get Started</CTAButton>
            </div>
        </div>
    );
}

export default HeaderBar;