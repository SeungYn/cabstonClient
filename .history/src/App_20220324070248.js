import { useEffect, useRef } from 'react';
import './App.css';

function App({ kakao }) {
  let latitude = '';
  let longitude = '';
  const mapRef = useRef();
  const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    console.log(latitude, longitude);
  };

  const error = () => {
    console.log('시래패패패패');
  };

  if (!navigator.geolocation) {
    console.log('사용불가능');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  useEffect(() => {
    const mapContainer = document.querySelector('.kakao-map');
    console.log(latitude);
    const mapOption = {
      center: new kakao.maps.LatLng(37.7507877, 127.0398281), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);
    const markerPosition = new kakao.maps.LatLng(37.7507877, 127.0398281);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);

    const target = {
      latitude: 0,
      longitude: 0,
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(success, error, options);
    console.log(id);
  }, []);
  return (
    <div className='App'>
      <div
        ref={mapRef}
        className='kakao-map'
        style={{ width: '200px', height: '800px' }}
      ></div>
    </div>
  );
}

export default App;
