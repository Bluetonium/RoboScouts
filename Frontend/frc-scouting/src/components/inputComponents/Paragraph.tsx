import React, { forwardRef } from 'react';
import styles from './Paragraph.module.css';

interface Props {
    text: string;
    value: string; // Prop to hold the input value
    onChange: (newValue: string) => void; // Prop to handle value changes
    placeholder?: string; // Optional prop for placeholder text
    maxLength?: number;
}

const Paragraph = forwardRef<HTMLTextAreaElement, Props>(({ text, value, onChange, maxLength, placeholder }, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value); // Call the onChange prop with the new value
    };

    return (
        <div className={`${styles.textField} noSelect`}>
            <h3 className={`bodyDarkText ${styles.title}`}>{text}</h3>
            <textarea
                ref={ref} // Attach the ref to the textarea element
                className={`bodyDarkText ${styles.input}`}
                value={value} // Set the input value from the prop
                onChange={handleChange} // Handle input changes
                placeholder={placeholder} // Set the placeholder text
                rows={5} // Set the number of visible rows (optional)
                cols={30} // Set the number of visible columns (optional)
                maxLength={maxLength}
            />
        </div>
    );
});

export default Paragraph;
