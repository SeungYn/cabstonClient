import { useEffect, useRef, useState } from 'react';
import './App.css';
import useCurrentLocation from './hooks/useCurrentLocation';
import useWatchLocation from './hooks/useWatchLocation';
import { geolocationOptions } from './constants/geolocationOptions';

function App({ kakao }) {
  const mapRef = useRef();

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [cancelLocationWatch, setCancelLocationWatch] = useState(null);
  // const [mapOption, setmapOption] = useState({
  //   center: new kakao.maps.LatLng(location.latitude, location.longitude),
  //   level: 3,
  // });

  useEffect(() => {
    if (!location) return;

    const a = useWatchLocation();
    console.log(a);
    // Cancel location watch after 3sec
    // setTimeout(() => {
    //   cancelLocationWatch();
    //   setIsWatchForLocation(false);
    // }, 3000);

    // const mapContainer = mapRef.current;
    // const map = new kakao.maps.Map(mapContainer, mapOption);
    // const markerPosition = new kakao.maps.LatLng(
    //   location.latitude,
    //   location.longitude
    // );
    // const marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
    // marker.setMap(map);
  }, []);
  return (
    <div className='App'>
      <div
        ref={mapRef}
        className='kakao-map'
        style={{ width: '300px', height: '300px' }}
      ></div>
    </div>
  );
}

export default App;
