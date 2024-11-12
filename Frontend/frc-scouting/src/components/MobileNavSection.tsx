import styles from './MobileNavSection.module.css';

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
                        <a href={item.link} target='_blank' className={styles.link}>
                            <h2 className={`${styles.navigationLink} bodyDarkText`} key={idx}>{item.title}</h2>
                        </a>
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