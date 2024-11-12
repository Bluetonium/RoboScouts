import React, { useState, useMemo } from 'react';
import styles from './Toast.module.css';
import alert from '../assets/alert.png';
import close from '../assets/close.png';
import { ToastContext } from './ToastContext';

interface Props {
  children?: React.ReactNode;
  message: String;
  close: () => void;
}

function Toast(props: Props) {

  return (
    <div className={styles.notification}>
      <img className={styles.notificationImg} src={alert} />
      <div className={styles.textSection}>
        <h3 className={`bodyDarkText ${styles.smallText}`}>{props.message}</h3>
      </div>
      <img className={styles.notificationClose} src={close} onClick={props.close} />
    </div>
  );
}

export default Toast;

type ToastProviderProperties = {
  children: React.ReactElement;
}

type ToastType = {
  message: string;
  id: number;
}

export function ToastProvider({ children }: ToastProviderProperties) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  function openToast(message: string) {
    const newToast = {
      id: Date.now(),
      message: message
    }
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }

  function closeToast(id: number) {
    setToasts((previousToasts) => 
      previousToasts.filter((toast) => toast.id !== id)
    );
  }

  const ContextValue = useMemo(() => ({
    open: openToast,
    close: closeToast
  }), [])

  return (
    <>
      <ToastContext.Provider value={ContextValue}>
        {children}
        <div className={styles.toasts}>
          {toasts &&
            toasts.map((toast) => {
              return(
                <Toast
                  key={toast.id}
                  message={toast.message}
                  close={() => closeToast(toast.id)}
                />
              );
            })
          }
        </div>
      </ToastContext.Provider>
    </>
  )
}