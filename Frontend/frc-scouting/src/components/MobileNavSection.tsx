import styles from './MobileNavSection.module.css';

import { Link } from 'react-router-dom';

interface Props {
    data: any[];
    active: boolean;
}

function MobileNavSection(props: Props) {

    function generateLinks() {
        if(props.active) {
             return (
                <div className={styles.navigationBody}>
                    {props.data.map((item, idx) => (
                        <Link to={item.link} className={styles.link}>
                            <h2 className={`${styles.navigationLink} bodyDarkText`} key={idx}>{item.title}</h2>
                        </Link>
                    ))}
                </div>
            );
        }
    }

    return (
        <>
            {generateLinks()}
        </>
    )
}

export default MobileNavSection;