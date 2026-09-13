export interface ITelegramLocationData {
  latitude: number;
  longitude: number;
  altitude?: number;
  course?: number;
  speed?: number;
  horizontal_accuracy?: number;
  vertical_accuracy?: number;
  course_accuracy?: number;
  speed_accuracy?: number;
}

export interface IUseTelegramLocationResult {
  latitude: number | undefined;
  longitude: number | undefined;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
  requestLocation: () => void;
  isRequesting: boolean;
}
