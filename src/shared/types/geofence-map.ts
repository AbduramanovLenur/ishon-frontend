export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IGeofenceMapProps {
  latitude?: number;
  longitude?: number;
  radius?: number;
  editable?: boolean;
  onPositionChange?: (
    coordinates: ICoordinates,
  ) => void;
  height?: number;
  zoom?: number;
}