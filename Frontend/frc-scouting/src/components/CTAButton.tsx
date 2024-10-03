import React, { forwardRef } from 'react';
import styles from './CTAButton.module.css';

interface Props {
    children?: React.ReactNode;
    color: string;
    textColor: string;
    style?: React.CSSProperties;
    hoverMode: string;
    onClick?: () => void;
    id?: string;
}

const CTAButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
    return (
        <>
            <div className={styles.CTAButtonBox}
            style={{
                ...props.style
            }}>
                <button
                className={styles.CTAButton}
                style={{
                    color: props.textColor,
                    backgroundColor: props.color
                }}
                onClick={props.onClick}
                ref={ref}
                id={props.id}
                >
                    {props.children}
                </button>
                <div className={styles.CTAButtonBack}>

                </div>
            </div>
        </>
    );
});

export default CTAButton;
