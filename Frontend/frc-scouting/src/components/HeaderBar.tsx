// Asset Design for Component HeaderBar(NavBar)
// Typescript JSX (React Framework)
//
import { useState, useEffect } from 'react';       // Import React Packages     (Package)

import CTAButton from './CTAButton';               // Call CTAButton.tsx        (Component)
import NavBlock from './NavBlock';                 // Call NavBlock.tsx         (Component)
import AccountMenu from './AccountMenu';           // Call AccountMenu.tsx      (Component) 
import styles from './HeaderBar.module.css';       // Call HeaderBar.module.css (Style Sheet)
import defaultPFP from '../assets/userSquare.png'; // Call deafaultPFP.png      (Image)
import menu from '../assets/menu.png';             // Call menu.png             (Image)

import MobileNavigation from './MobileNavigation'; // MobileNavigation.tsx      (Component)

import { useToast } from './ToastContext';         // Import Toast Package      (Package)
import { Link } from 'react-router-dom';           // ???

// Link Map
function HeaderBar() {
    let linksMap = new Map();

    const toast = useToast(); // Use Toast(Popup)
    
    //Scouting Links - "Get Started" and "Data Collection"
    linksMap.set('Scouting', [
        {title: "Get Started", link:"/get-started"},
        {title: "Data Collection", link:"/scouting/data-collection"},
    ]);

    // Analysis Links - "Data Analysis" and "Team Analysis"
    linksMap.set('Analysis', [
        {title: "Data Analysis", link:"/analysis/data-analysis"},
        {title: "Team Analysis", link:"/analysis/team-analysis"},
    ]);

    // Tools Links - "Team Search"
    linksMap.set('Tools', [
        {title: "Team Search", link:"/tools/team-search"},
    ]);

    // "About Us" Link
    linksMap.set('About Us', [
        {title: "About Us", link:"/about-us/"},
    ]);

    // Legal Links - "Terms & Conditions", "Privacy Policy", "Contact Us"
    linksMap.set('Legal', [
        {title: "Terms and Conditions", link:"/legal/terms-and-conditions"},
        {title: "Privacy Policy", link:"/legal/privacy-policy"},
        {title: "Contact Us", link:"/legal/contact-us"},
    ]);

    const [showAccountMenu, setShowAccountMenu] = useState(false);    // ???
    const [showMobileNav, setShowMobileNav] = useState(false);        // ???

    // Function to generate header links
    function generateHeaderLinks() {
        const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

        return ( 
            <> 
                {Array.from(linksMap.entries()).map(([sectionName, sectionData], index) => (
                    <div
                        className={styles.navElement}
                        onMouseEnter={() => setHoveredIndex(index)} // Shows Links when mouse enter
                        onMouseLeave={() => setHoveredIndex(null)}  // Hides Links when mouse leave
                        key={index}
                    >
                        <h3 className="bodyDarkText">{sectionName}</h3>
                        <NavBlock isVisible={hoveredIndex === index} data={sectionData}> </NavBlock>
                    </div>
                ))} {/* Closing Pars. From "Array." --- Closing Braces From "function" --- Unmatched Closing Pars. ??? */}
            </> 
        ); 
    }      

    //Handles Click on Acount PFP
    function handleClick() {
        setShowAccountMenu(prev => !prev); // sets to TRUE
    }

    // Handles Mobile Navigation
    function toggleMobileNav() {
        setShowMobileNav(prev => !prev); // sets to TRUE
    

    // Render Toast PopUp
    useEffect(() => {
        const timer = setTimeout(() => {
            toast?.open('This website is under construction. Please be nice! :D');
        }, 4000);

        return () => clearTimeout(timer);
    }, []);


    // User Interface Output
    return (
        <>
            <div className={styles.header}>
                <div className={styles.headerLeftSection}>
                    <img src={menu} className={styles.menuImage} onClick={toggleMobileNav}></img>
                    <Link to={"/"}> {/* "(This Link is Active)" */}
                        <h2 className="titleDarkText">RoboScouts</h2> {/* "RoboScouts" Title */}
                    </Link>
                    {generateHeaderLinks()} {/* Generates Links for the Navbar */}
                </div>
                <div className={styles.headerRightSection}>
                    <Link to={"/get-started"}>
                        <CTAButton color='var(--red)' textColor="var(--text)" hoverMode="hoverMode1">Get Started</CTAButton>
                    </Link>                {/* ^ Generates "Get Started" Button ^ */}

                    <div className={styles.accountSquare} onClick={handleClick} style={{ display: "none" }}>
                        <img className={styles.accountSquareImg} src={defaultPFP} alt="User  Profile"/>
                    </div>   {/* ^ Shows the account menu when the PFP is clicked on ^ */}
                </div>
            </div>
            <AccountMenu isVisible={showAccountMenu} />
            <MobileNavigation isVisible={showMobileNav}/>
        </>
    );
}

export default HeaderBar;
