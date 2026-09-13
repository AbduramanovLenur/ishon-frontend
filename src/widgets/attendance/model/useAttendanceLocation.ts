import { useGeolocated } from 'react-geolocated';

import { useTelegramLocation } from '@shared/lib';

export interface IAttendanceLocationResult {
  latitude: number | undefined;
  longitude: number | undefined;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
}

export const useAttendanceLocation = (): IAttendanceLocationResult => {
  const tgLocation = useTelegramLocation();
  const {
    coords: browserCoords,
    isGeolocationAvailable: browserGeoAvailable,
    isGeolocationEnabled: browserGeoEnabled,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 10000,
    isOptimisticGeolocationEnabled: false,
    watchPosition: false,
    suppressLocationOnMount: tgLocation.isGeolocationAvailable,
  });

  if (tgLocation.isGeolocationAvailable) {
    return {
      latitude: tgLocation.latitude,
      longitude: tgLocation.longitude,
      isGeolocationAvailable: tgLocation.isGeolocationAvailable,
      isGeolocationEnabled: tgLocation.isGeolocationEnabled,
    };
  }

  return {
    latitude: browserCoords?.latitude,
    longitude: browserCoords?.longitude,
    isGeolocationAvailable: browserGeoAvailable,
    isGeolocationEnabled: browserGeoEnabled,
  };
};
