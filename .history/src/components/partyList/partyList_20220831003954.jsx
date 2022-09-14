import React, { memo } from 'react';
import styles from './partyList.module.css';
const PartyList = memo(({ partyList, onJoinParty }) => {
  console.log('PartyList.jsx');
  return (
    <ul className={styles.partyContainer}>
      {partyList.map((data) => {
        return (
          <li
            key={data.id}
            className={styles.partyItem}
            onClick={() => onJoinParty(data.id)}
          >
            <h3>{data.title}</h3>
            <p>식당 : {data.restaurantName}</p>
            <p>
              현재인원 : {data.currentNumber}/{data.maxNumber} | {data.createAt}{' '}
              | {`매칭상태 : ${data.status}`}
            </p>
          </li>
        );
      })}
    </ul>
  );
});

export default PartyList;
