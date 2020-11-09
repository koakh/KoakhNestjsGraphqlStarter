/**
 * https://norbertbartos.tech/blog/use-geolocation-api-with-react-hooks/
 * https://github.com/NorbertB29/geolocation-api-hook
 */

import { useState, useEffect } from 'react';

export const useCurrentLocation = (options = {}) => {
  // store location in state
  const [location, setLocation] = useState<{ latitude: string, longitude: string }>();
  // store error message in state
  const [error, setError] = useState<string>();
  // Success handler for geoLocation's `getCurrentPosition` method
  const handleSuccess = (pos: any) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude });
  };

  // Error handler for geoLocation's `getCurrentPosition` method
  const handleError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    // If the geolocation is not defined in the used browser we handle it as an error
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};
