import React, { useEffect, useRef, useState } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useWatchLocation from '../../hooks/useWatchLocation';
import { geolocationOptions } from '../../constants/geolocationOptions';
import styles from './firstPage.module.css';
import LoadingSpin from '../../components/loadingSpin/loadingSpin';
const FirstPage = ({ kakao }) => {
  const { location: currentLocation, error: currentError } =
    useCurrentLocation(geolocationOptions);
  const mapRef = useRef();
  const [loading, setLoading] = useState(false);

  //๋๋๊ทธ state
  const dragRef = useRef();
  const reizeContainerRef = useRef();
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);

  const displayMaker = (place) => {
    const maker = new kakao.maps.Marker({
      map: 1,
    });
  };
  const test = () => {
    console.log(dragRef.current);
    console.log(dragRef);

    console.log('asd', mapRef.current.style.height);
  };
  const dragInitial = (e) => {
    setInitialPos(e.clientY);
    setInitialSize(mapRef.current.offsetHeight);
  };

  const dragResize = (e) => {
    console.log(parseInt(initialSize) + parseInt(e.clientY - initialPos));
    mapRef.current.style.height = `${
      parseInt(initialSize) + parseInt(e.clientY - initialPos)
    }px`;
  };

  useEffect(() => {
    if (!currentLocation) {
      console.log(currentLocation);
      setLoading(true);
      return;
    }
    setLoading(false);
    // Cancel location watch after 3sec
    // setTimeout(() => {
    //   cancelLocationWatch();
    //   setIsWatchForLocation(false);
    // }, 3000);

    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      ),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const markerPosition = new kakao.maps.LatLng(
      currentLocation.latitude,
      currentLocation.longitude
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    var ps = new kakao.maps.services.Places();

    // ํค์๋๋ก ์ฅ์๋ฅผ ๊ฒ์ํฉ๋๋ค
  }, [currentLocation]);
  return (
    <section className={styles.container}>
      <div className={styles.map__group}>
        asdasd
        <div ref={mapRef} className={styles.map_container}>
          <LoadingSpin loading={loading} />
        </div>
        <div
          ref={dragRef}
          onDrag={dragResize}
          onDragStart={dragInitial}
          draggable={true}
          className={styles.dragBtn}
          onClick={test}
        ></div>
      </div>
    </section>
  );
};

export default FirstPage;
