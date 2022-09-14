import React from 'react';
import styles from './loadingSpin.module.css';

const LoadingSpin = memo(({ loading }) => (
  <div
    className={`${styles.container} ${
      loading ? styles.loading_on : styles.loading_off
    }`}
  >
    <div className={styles.loading}></div>
    <p className={styles.loading_content}>로딩중..</p>
  </div>
));

export default LoadingSpin;
