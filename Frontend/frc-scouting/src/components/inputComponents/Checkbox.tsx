import React, { forwardRef } from 'react';
import styles from './Checkbox.module.css';

interface Props {
    text: string;
    checked: boolean; // Prop to hold the checked state
    onChange: (newValue: boolean) => void; // Prop to handle value changes
}

const Checkbox = forwardRef<HTMLInputElement, Props>(({ text, checked, onChange }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked); // Call the onChange prop with the new checked state
    };

    return (
        <div className={`${styles.checkBox} noSelect`}>
            <h3 className={`bodyDarkText ${styles.title}`}>{text}{checked && "Yes" || "No"}</h3>
            <input
                ref={ref} // Attach the ref to the input element
                className={styles.input}
                type='checkbox'
                checked={checked} // Set the checked state from the prop
                onChange={handleChange} // Handle input changes
            />
        </div>
    );
});

export default Checkbox;
