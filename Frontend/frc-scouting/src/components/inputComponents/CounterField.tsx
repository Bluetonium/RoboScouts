import { forwardRef } from 'react';
import styles from './CounterField.module.css';
import subtract from '../../assets/ionicons/subtract.svg';
import add from '../../assets/ionicons/add.svg';

interface Props {
    text: string;
    value: number; // Prop to hold the input value
    onChange: (newValue: number) => void; // Prop to handle value changes\
    right?: boolean;
}

const CounterField = forwardRef<HTMLInputElement, Props>(({ text, value, onChange}) => {
    const handleDecrement = () => {
        onChange(value - 1); // Decrement the value
    };

    const handleIncrement = () => {
        onChange(value + 1); // Increment the value
    };

    return (
        <div className={styles.box}>

            <div className={`${styles.counterField} noSelect`}>
                <img 
                    src={subtract} 
                    className={`${styles.buttonLeft} noSelect`} 
                    onClick={handleDecrement} // Call the decrement function on click
                    alt="Decrement"
                />
                <h3 className={`bodyDarkText`}>{text + " " + value}</h3>
                <img 
                    src={add} 
                    className={`${styles.buttonRight} noSelect`} 
                    onClick={handleIncrement} // Call the increment function on click
                    alt="Increment"
                />
            </div>

        </div>
    );
});

export default CounterField;