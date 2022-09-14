import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './chat.module.css';

const Chat = ({}) => {
  //1 채팅 소켓 연결
  //2 채팅 내역 가져오기
  const { partyId } = useParams();
  useEffect(() => {
    console.log(partyId);
  });
  return (
    <section className={styles.container}>
      <div className={styles.content}></div>
      <div className={styles.input__bar}></div>
    </section>
  );
};

export default Chat;
