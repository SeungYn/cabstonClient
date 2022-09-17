import React from 'react';
import styles from './emptyPartyPage.module.css';
import { TbMoodEmpty } from 'react-icons/tb';
const EmptyPartyPage = (props) => (
  <section className={styles.empty}>
    <div className={styles.content}>가입된 파티가 없습니니다.</div>
    <TbMoodEmpty size={'1.6rem'} />
  </section>
);

export default EmptyPartyPage;
