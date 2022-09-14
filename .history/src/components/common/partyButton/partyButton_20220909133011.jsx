import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import React, { useCallback, useState } from 'react';
import PartyMakerPage from '../../../pages/partyMakerPage/partyMakerPage';

import styles from './partyButton.module.css';

const PartyButton = ({
  onMakeParty,
  clickedRestaurant,
  restaurantsInfo,
  onError,
}) => {
  const [activate, setActivate] = useState(false);
  const onPartyMake = () => {
    console.log(123);
    activate ? setActivate(false) : setActivate(true);
  };

  const onActivate = useCallback((activate) => {
    activate ? setActivate(false) : setActivate(true);
  }, []);

  return (
    <>
      <button className={styles.partyBtn} onClick={onPartyMake}>
        파티 만들기
      </button>
      <PartyMakerPage
        activate={activate}
        onActivate={onActivate}
        onMakeParty={onMakeParty}
        clickedRestaurant={clickedRestaurant}
        restaurantsInfo={restaurantsInfo}
        onError={onError}
      />
    </>
  );
};

export default PartyButton;
