import type { FC } from "react";
import { useMapEvents } from "react-leaflet";

import type { ICoordinates } from "@shared/types";

interface IMapClickHandlerProps {
  editable: boolean;
  onPositionChange?: (
    coordinates: ICoordinates,
  ) => void;
}

const MapClickHandler: FC<IMapClickHandlerProps> = ({ editable, onPositionChange }) => {
  useMapEvents({
    click(event) {
      if (!editable || !onPositionChange) {
        return;
      }

      onPositionChange({
        latitude: event.latlng.lat,
        longitude: event.latlng.lng,
      });
    },
  });

  return null;
};

export default MapClickHandler;