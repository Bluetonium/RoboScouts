import React from 'react';
import styles from './Tooltip.module.css';

interface Props {
  children?: React.ReactNode;
  message: String;
}

function Tooltip(props: Props) {

  return (
    <h3 className={`bodyDarkText ${styles.tooltip}`}>{props.message}</h3>
  );
}

export default Tooltip;