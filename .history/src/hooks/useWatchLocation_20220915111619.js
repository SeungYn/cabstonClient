import { useState, useEffect, useRef } from 'react';

const useWatchLocation = (options = {}) => {
  // store location in state
  const [location, setLocation] = useState();
  // 첫번째 위치
  const [firstLocation, setFirstLocation] = useState();
  // store error message in state
  const [error, setError] = useState();
  // save the returned id from the geolocation's `watchPosition` to be able to cancel the watch instance
  const locationWatchId = useRef(null);

  // Success handler for geolocation's `watchPosition` method
  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    console.log('현재위치 : ', latitude, longitude);
    alert('안쪽에서');
    setLocation({
      latitude,
      longitude,
    });
  };
  const firstSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setFirstLocation({
      latitude,
      longitude,
    });
  };
  // Error handler for geolocation's `watchPosition` method
  const handleError = (error) => {
    console.log('error', error);
    setError(error.message);
  };

  // Clears the watch instance based on the saved watch id
  const cancelLocationWatcha = () => {
    const { geolocation } = navigator;
    console.log('안쪽에서 종료');
    if (locationWatchId.current && geolocation) {
      geolocation.clearWatch(locationWatchId.current);
    }
  };

  useEffect(() => {
    alert('시작');
    const { geolocation } = navigator;
    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }

    // 첫번쨰 위치 얻기
    geolocation.getCurrentPosition(firstSuccess, handleError, options);
    // Start to watch the location with the Geolocation API
    locationWatchId.current = geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );
    console.log(locationWatchId);
    // Clear the location watch instance when React unmounts the used component
    return cancelLocationWatcha;
  }, [options]);

  return {
    location,
    cancelLocationWatcha,
    error,
    firstLocation2,
  };
};

export default useWatchLocation;
