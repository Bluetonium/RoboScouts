import styles from './NavBlock.module.css';

import { Link } from 'react-router-dom';

interface Props {
    children?: React.ReactNode;
    isVisible?: boolean;
    data?: any[];
}

function NavBlock(props: Props) {
    const displayClass = props.isVisible ? styles.flex : styles.none;

    function generateLinks() {
        let data = props.data;
    
        if (data) {
            return (
                <>
                    {data.map((item, index) => (
                        <Link to={item.link} className={styles.navLink}>
                            <div key={index} className={styles.linkBlock}>
                                <h2>{item.title}</h2>
                            </div>
                        </Link>
                    ))}
                </>
            );
        }
    }
    

    return (
        <div className={`${styles.navBlock} ${displayClass}`}>
            {generateLinks()}
            {props.children}
        </div>
    )
}

export default NavBlock;