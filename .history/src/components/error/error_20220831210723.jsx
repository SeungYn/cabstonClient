import React from 'react';
import styles from './error.module.css';

const Error = ({ error, onError }) => {
  return (
    <div className={styles.container}>
      <div className={styles.error__form}>
        <p className={styles.text}>{error.message}</p>
        <div9 className={styles.btn} onClick={() => onError('')}>
          확인
        </div9>
      </div>
    </div>
  );
};

export default Error;
