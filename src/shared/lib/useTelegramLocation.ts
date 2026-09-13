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

  const insideTMA = isTMA();
  const tgLocationSupported = insideTMA && locationManager.isSupported();
  const tgLocationAvailable = insideTMA && locationManager.isAvailable();

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
  }, [tgLocationSupported]);

  const requestLocation = useCallback(() => {
    if (!tgLocationSupported || !tgLocationAvailable) {
      return;
    }

    setIsRequesting(true);

    locationManager.requestLocation().then(
      (location: ITelegramLocationData | null) => {
        if (location) {
          setCoords({
            latitude: location.latitude,
            longitude: location.longitude,
          });
        }
        setIsRequesting(false);
      },
      () => {
        setPermissionDenied(true);
        setIsRequesting(false);
      },
    );
  }, [tgLocationSupported, tgLocationAvailable]);

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
