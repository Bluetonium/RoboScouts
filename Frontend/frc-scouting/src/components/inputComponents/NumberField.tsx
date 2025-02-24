import React, { forwardRef } from 'react';
import styles from './NumberField.module.css';

interface Props {
    text: string;
    value: number; // Add value prop to hold the input value
    onChange: (newValue: number) => void; // Add onChange prop to handle value changes
}

const NumberField = forwardRef<HTMLButtonElement, Props>(({ text, value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        onChange(newValue); // Call the onChange prop with the new value
    };

    return (
        <div className={`${styles.numberField} noSelect`}>
            <h3 className={`bodyDarkText ${styles.title}`}>{text}</h3>
            <input
                className={`bodyDarkText ${styles.input}`}
                type='number'
                value={value} // Set the input value from the prop
                onChange={handleChange} // Handle input changes
            />
        </div>
    );
});

export default NumberField;
