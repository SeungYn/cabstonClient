import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './myParty.module.css';
import MyPartyItem from './myPartyItem';
import { GiSiren } from 'react-icons/gi';
import { IconContext } from 'react-icons';
const MyParty = ({ partyService }) => {
  const [party, setParty] = useState();
  const { state } = useLocation();
  const [memberCount, setMemberCount] = useState('');
  const nav = useNavigate();
  //true: 준비완료 false: 준비X
  const [ready, setReady] = useState(false);
  const navigation = useNavigate();

  const onChat = () => {
    console.log(party);
    navigation(`/chat`);
  };

  const onReady = useCallback(() => {
    partyService.partyReady().then((data) =>
      //party.members.map((i) => console.log(i))
      setParty((partys) => {
        const up = partys.members.map((i) => {
          if (i.id === data.userId) {
            i.isReady = 1;
            return i;
          } else {
            return i;
          }
        });
        console.log({ ...partys, members: up });
        setReady(true);
        return { ...partys, members: up };
      })
    );
  }, [partyService]);

  const unReady = useCallback(() => {
    partyService.partyUnReady().then((data) =>
      setParty((partys) => {
        const up = partys.members.map((i) => {
          if (i.id === data.userId) {
            i.isReady = 0;
            return i;
          } else {
            return i;
          }
        });
        console.log({ ...partys, members: up });
        setReady(false);
        return { ...partys, members: up };
      })
    );
  }, [partyService]);

  const outParty = () => {
    partyService.outParty(party.id).then((data) => {
      return nav('/');
    });
  };

  useEffect(() => {
    let mount = true;
    if (state) {
      console.log(state);
      setParty({ ...state.party });
      return;
    }

    partyService
      .getMyParty() //
      .then((data) => {
        //length = data.members.length;
        console.log('qwd', data);
        if (data == null) {
          console.log('파티 x');
          return nav('/partyEmpty');
        }
        if (mount) {
          setParty({ ...data });
          setMemberCount(memberCount);
        }
      })
      .catch((error) => {
        console.log(error);
        return nav('/partyEmpty');
      });

    return () => {
      mount = false;
    };
  }, [partyService]);

  return (
    <section className={styles.myParty__container}>
      {party && <MyPartyItem onReady={onReady} party={party} />}

      {party && (
        <div className={styles.myParty__middle}>
          <ul className={styles.partyInfo}>
            <h2 className={styles.party__info}>Info</h2>
            <li className={styles.partyInfo__title}>제목 : {party.title}</li>
            {/* <li className={styles.partyInfo__resTitle}>{party.</li>
        <li className={styles.partyInfo__address}></li> */}
            <li className={styles.partyInfo__partyMaster}>
              방장 : {party.owner}
            </li>
            <li className={styles.partyInfo__count}>
              인원수 : {`${party.currentCount} / ${party.maximumCount}`}
            </li>
          </ul>
          <div className={styles.report}>
            {ready ? (
              <button
                className={`${styles.btnGroup__btn} ${styles.unReady__btn}`}
                onClick={unReady}
              >
                준비해제
              </button>
            ) : (
              <button
                className={`${styles.btnGroup__btn} ${styles.unReady__btn}`}
                onClick={onReady}
              >
                준비하기
              </button>
            )}
          </div>
        </div>
      )}

      <div className={styles.btnGroup}>
        <div className={styles.btnGroup__right}>
          <button className={styles.btnGroup__btn} onClick={onChat}>
            채팅하기
          </button>
          <button className={styles.btnGroup__btn} onClick={outParty}>
            나가기
          </button>
        </div>
      </div>
    </section>
  );
};

export default MyParty;
