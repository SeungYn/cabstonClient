import React, { useState } from 'react';
import styles from './myPartyItem.module.css';
import { FaFemale, FaMale } from 'react-icons/fa';
import { MdFemale, MdMale, MdEmojiPeople } from 'react-icons/md';
import { useCallback } from 'react';
const MyPartyItem = ({ peoples, onReady, party }) => {
  const { currentCount, matchingStatus, maximumCount, title, members } = party;

  const blank = useCallback((currentCount) => {
    let i = currentCount;
    const htmlCode = [];
    for (i; i < 8; i++) {
      htmlCode.push(
        <li key={i} className={`${styles.myParty__peoples__people} `}>
          <div className={styles.blank}>
            <MdEmojiPeople size={100} />
          </div>
        </li>
      );
    }

    return htmlCode;
  }, []);

  return (
    <ul className={styles.myParty__peoples__grid}>
      {members.map((item) => (
        <li key={item.sno} className={styles.myParty__peoples__people}>
          <div
            className={item.isReady === 1 ? styles.readyOn : styles.readyOff}
          >
            준비
          </div>
          <div className={styles.contents}>
            <span className={styles.contents__det}>학과 : {item.dept}</span>
            <span className={styles.contents__sno}>학번 : {item.sno}</span>
            <span className={styles.contents__nickName}>
              닉네임 : {item.nickname}{' '}
              {item.sex === 'male' ? (
                <span className={styles.male}>
                  <MdMale />
                </span>
              ) : (
                <span className={styles.female}>
                  <MdFemale />
                </span>
              )}
            </span>
            <span className={styles.contents__reliability}>
              신뢰도 : {item.reliability}
            </span>
          </div>
        </li>
      ))}
      {party && blank(currentCount)}
    </ul>
  );
};

export default MyPartyItem;
