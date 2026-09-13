import { useCallback, useEffect, useState } from "react";
import {
  isTMA,
  locationManager,
} from "@telegram-apps/sdk";

import type { ITelegramLocationData, IUseTelegramLocationResult } from "@shared/types";

export const useTelegramLocation = (): IUseTelegramLocationResult => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [locationAvailable, setLocationAvailable] = useState(false);

  const insideTMA = isTMA();
  const tgLocationSupported = insideTMA && locationManager.isSupported();

  const requestLocation = useCallback(async () => {
    if (!tgLocationSupported || !locationAvailable) {
      return;
    }

    setIsRequesting(true);
    setPermissionDenied(false);

    try {
      if (!locationManager.isMounted()) {
        await locationManager.mount();
      }

      const location: ITelegramLocationData | null = await locationManager.requestLocation();

      if (location) {
        setCoords({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      }
    } catch {
      setPermissionDenied(true);
    } finally {
      setIsRequesting(false);
    }
  }, [tgLocationSupported, locationAvailable]);

  useEffect(() => {
    if (!tgLocationSupported) return;

    const mountAndRequest = async () => {
      try {
        if (!locationManager.isMounted()) {
          await locationManager.mount();
        }
        setIsRequesting(true);
        setLocationAvailable(locationManager.isAvailable());
        const location: ITelegramLocationData | null = await locationManager.requestLocation();
        if (location) {
          setCoords({
            latitude: location.latitude,
            longitude: location.longitude,
          });
        }
      } catch {
        setPermissionDenied(true);
      } finally {
        setIsRequesting(false);
      }
    };

    mountAndRequest();
  }, [tgLocationSupported]);

  useEffect(() => {
    if (!tgLocationSupported) return;

    const unsubAccessGranted = locationManager.isAccessGranted.sub((current) => {
      if (current) {
        setPermissionDenied(false);
        requestLocation();
      }
    });

    const unsubAvailable = locationManager.isAvailable.sub((current) => {
      setLocationAvailable(current);
      if (!current) {
        setPermissionDenied(true);
      }
    });

    return () => {
      unsubAccessGranted();
      unsubAvailable();
    };
  }, [tgLocationSupported, requestLocation]);

  if (tgLocationSupported) {
    return {
      latitude: coords?.latitude,
      longitude: coords?.longitude,
      isGeolocationAvailable: locationAvailable,
      isGeolocationEnabled: locationAvailable && !permissionDenied,
      requestLocation,
      isRequesting,
    };
  }

  return {
    latitude: undefined,
    longitude: undefined,
    isGeolocationAvailable: false,
    isGeolocationEnabled: false,
    requestLocation,
    isRequesting: false,
  };
};
