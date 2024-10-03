import React, { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

interface Props {
  children?: React.ReactNode;
  isVisible: boolean;
}

function LoadingScreen(props: Props) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!props.isVisible) {
      timer = setTimeout(() => {
        setHidden(true);
      }, 490);
    } else {
      setHidden(false);
    }

    return () => clearTimeout(timer);
  }, [props.isVisible]);

  const getDisplayClass = () => {
    let className = '';
    if (props.isVisible) {
      className = styles.flex;
    } else {
      className = styles.fade;
    }

    if (hidden) {
      className += ` ${styles.hidden}`;
    }

    return className;
  };

  return (
    <div className={`${styles.loadingScreen} ${getDisplayClass()}`}>
      <div className={styles.loadingWidget}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
