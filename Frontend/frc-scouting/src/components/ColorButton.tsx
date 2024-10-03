import React, { forwardRef } from 'react';
import styles from './ColorButton.module.css';

interface Props {
    children?: React.ReactNode;
    color: string;
    textColor: string;
    style?: React.CSSProperties;
    hoverMode: string;
    onClick?: () => void;
    id?: string;
}

const ColorButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    return (
        <button
            className={`${styles[props.hoverMode]} ${styles.colorButton}`}
            style={{
                color: props.textColor,
                backgroundColor: props.color,
                border: `3px solid ${props.textColor}`,
                ...props.style
            }}
            onClick={props.onClick}
            ref={ref}
            id={props.id}
        >
            {props.children}
        </button>
    );
});

export default ColorButton;
