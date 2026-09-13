import { useCallback, useEffect, useState } from "react";
import {
  isTMA,
  locationManager,
} from "@telegram-apps/sdk";

import type { ITelegramLocationData, IUseTelegramLocationResult } from "@shared/types";
import { message } from "antd";

export const useTelegramLocation = (): IUseTelegramLocationResult => {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const insideTMA = isTMA();
  const tgLocationSupported = insideTMA && locationManager.isSupported();
  const tgLocationAvailable = insideTMA && locationManager.isAvailable();

  const requestLocation = useCallback(async () => {
    message.error('123')

    if (!tgLocationSupported || !tgLocationAvailable) {
      return;
    }

    message.error('requestLocation')

    setIsRequesting(true);
    setPermissionDenied(false);

    try {
      if (!locationManager.isMounted()) {
        message.error('mount')
        await locationManager.mount();
      }

      const location: ITelegramLocationData | null = await locationManager.requestLocation();

      if (location) {
        message.error('location')
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
  }, [tgLocationSupported, tgLocationAvailable]);

  useEffect(() => {
    if (!tgLocationSupported) return;

    const mountAndRequest = async () => {
      try {
        if (!locationManager.isMounted()) {
          await locationManager.mount();
        }
        setIsRequesting(true);
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
      isGeolocationAvailable: tgLocationAvailable,
      isGeolocationEnabled: tgLocationAvailable && !permissionDenied,
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
