import React, { forwardRef } from 'react';
import styles from './Dropdown.module.css';

interface Option {
    value: string;
    label: string;
}

interface Props {
    text: string;
    value: string; // Prop to hold the selected value
    onChange: (newValue: string) => void; // Prop to handle value changes
    options: Option[]; // Prop to hold the dropdown options
}

const Dropdown2 = forwardRef<HTMLSelectElement, Props>(({ text, value, onChange, options }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value); // Call the onChange prop with the new value
    };

    return (
        <div className={`${styles.dropdown} noSelect`}>
            <h3 className={`bodyDarkText ${styles.title}`}>{text}</h3>
            <select
                ref={ref} // Attach the ref to the select element
                className={`bodyDarkText ${styles.select}`}
                value={value} // Set the selected value from the prop
                onChange={handleChange} // Handle value changes
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Dropdown2;
