import styles from './NavBlock.module.css';

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
                        <a href={item.link} className={styles.navLink} target='_blank'>
                            <div key={index} className={styles.linkBlock}>
                                <h2>{item.title}</h2>
                            </div>
                        </a>
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