import React from 'react';
import styles from './MapAgreeAlert.module.css';

const MapAgreeAlert = ({ setAgree }) => (
  <main className={styles.container}>
    <section className={styles.alert__container}>
      <h2 className={styles.alert__header}>주의!</h2>
      <p className={styles.alert__text}>
        다른 사람의 위치를 지도에서 보려면 사용자의 위치도 공유해야 합니다.
        <br />
        (5000원을 결제하시면 사용자의 위치공유 없이 다른 사람의 위치를 볼 수
        있습니다.)
      </p>
    </section>
  </main>
);

export default MapAgreeAlert;
