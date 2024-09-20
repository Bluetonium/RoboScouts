import styles from './ColorButton.module.css';

interface Props {
    children?: React.ReactNode;
    color: string;
    textColor: string;
    style?: React.CSSProperties;
}

function ColorButton(props: Props) {
    return (
    <>
        <button className={styles.colorButton} style={{ color: props.textColor,
            backgroundColor: props.color,
            border: `3px solid ${props.textColor}`,
            ...props.style
        }}>{props.children}</button>
    </>
    );
}

export default ColorButton;