import { App } from "antd";
import { useEffect, useState } from "react";

interface ILocation {
  latitude: number | null;
  longitude: number | null;
}

export const useCurrentLocation = (): ILocation => {
  const { message } = App.useApp();
  const [location, setLocation] = useState<ILocation>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser");
      message.error("Geolocation is not supported by this browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error("Geolokatsiya xatosi:", error);
        message.error(`Geolokatsiya xatosi: ${error}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [message]);

  return location;
};