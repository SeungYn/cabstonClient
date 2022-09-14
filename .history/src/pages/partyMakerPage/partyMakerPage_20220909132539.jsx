import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './partyMakerPage.module.css';

const PartyMakerPage = ({
  activate,
  onActivate,
  onMakeParty,
  clickedRestaurant,
  restaurantsInfo,
  onError,
}) => {
  const [personCount, setPersonCount] = useState(4);
  const [inputTitle, setInputTitle] = useState('');
  const onXBtn = () => {
    onActivate(activate);
  };

  const myPartyNavigate = useNavigate();

  const selectOnChange = (e) => {
    console.log(e.target.value);
    setPersonCount(e.target.value);
  };
  const inputOnChange = (e) => {
    setInputTitle(e.target.value);
  };

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;

    switch (name) {
      case 'personNum':
        return setPersonCount(value);
      case 'title':
        return setInputTitle(value);

      default:
    }
  };

  const makeParty = () => {
    if (inputTitle == '') {
      alert('제목을 입력하세요');
      return 0;
    }
    onMakeParty(inputTitle, personCount, clickedRestaurant)
      .then((party) => {
        console.log('asdf', party);
        return myPartyNavigate('/myParty', { state: { party } });
      })
      .catch((error) => onError(error)); //

    setInputTitle('');
  };

  return (
    <section
      className={`${styles.partyMakerContainer} ${
        activate ? styles.partyMakerContainerOn : styles.partyMakerContainerOff
      }`}
    >
      <header className={styles.partyMakerHeader}>
        <div className={styles.partyMakerHeader__left}>
          <span className={styles.left__span} onClick={onXBtn}>
            X
          </span>
          <span className={styles.left__span}>파티만들기</span>
        </div>
      </header>
      <div className={styles.partyMakerBody}>
        <input
          type='text'
          className={styles.partyMakerBody__title}
          placeholder='제목'
          name='title'
          value={inputTitle}
          onChange={onChange}
        ></input>

        <div className={styles.partyMakerBody__num}>
          최대 인원수 &nbsp;
          <select
            onChange={onChange}
            className={styles.partyMakerBody__num__select}
            value={personCount}
            name='personNum'
          >
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
          </select>
          &nbsp; 명
        </div>
        <ul className={styles.partyMakerBody__resInfo}>
          <p className={styles.partyMakerBody__resInfo__header}>선택된 지점</p>
          <li className={styles.partyMakerBody__resInfo__item}>
            지점명 : {restaurantsInfo.name}
          </li>
          <li className={styles.partyMakerBody__resInfo__item}>
            위치 : {restaurantsInfo.address}
          </li>
          <li className={styles.partyMakerBody__resInfo__item}>
            카테고리 : {restaurantsInfo.category}
          </li>
        </ul>
        <button className={styles.makerBtn} onClick={makeParty}>
          만들기
        </button>
      </div>
    </section>
  );
};

export default PartyMakerPage;
