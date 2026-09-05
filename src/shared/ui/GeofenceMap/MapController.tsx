import { useEffect, type FC } from "react";
import { useMap } from "react-leaflet";

interface IMapControllerProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const MapController: FC<IMapControllerProps> = ({ latitude, longitude, zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], zoom);

    const timeoutId = setTimeout(() => { 
      map.invalidateSize();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [latitude, longitude, zoom, map]);

  return null;
};

export default MapController;