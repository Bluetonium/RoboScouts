import React, { forwardRef } from 'react';
import styles from './TextField.module.css';

interface Props {
    text: string;
    value: string; // Prop to hold the input value
    onChange: (newValue: string) => void; // Prop to handle value changes
    placeholder?: string; // Optional prop for placeholder text
}

const TextField = forwardRef<HTMLInputElement, Props>(({ text, value, onChange, placeholder }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); // Call the onChange prop with the new value
    };

    return (
        <div className={`${styles.textField} noSelect`}>
            <h3 className={`bodyDarkText ${styles.title}`}>{text}</h3>
            <input
                ref={ref} // Attach the ref to the input element
                className={`bodyDarkText ${styles.input}`}
                type='text'
                value={value} // Set the input value from the prop
                onChange={handleChange} // Handle input changes
                placeholder={placeholder} // Set the placeholder text
            />
        </div>
    );
});

export default TextField;
