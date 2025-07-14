import React, { useEffect } from 'react';
import styles from './Notification.module.css';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
}; 