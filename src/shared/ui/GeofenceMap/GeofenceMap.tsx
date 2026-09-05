import { type FC } from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import MapController from "./MapController";
import MapClickHandler from "./MapClickHandler";

import type { IGeofenceMapProps } from "@shared/types";
import { defaultValues } from "@shared/config";

import "leaflet/dist/leaflet.css";

import styles from "./GeofenceMap.module.scss";

const markerIconOptions = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const GeofenceMap: FC<IGeofenceMapProps> = ({
  latitude,
  longitude,
  radius = 0,
  editable = false,
  onPositionChange,
  height = 350,
  zoom = defaultValues.zoom,
}) => {
  const hasValidPosition =
    latitude !== undefined &&
    longitude !== undefined &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude);

  if (!hasValidPosition) {
    return (
      <div
        className={styles.empty}
        style={{
          height
        }}
      >
        <span>
          Joylashuv aniqlanmagan
        </span>
      </div>
    );
  }

  const position: [number, number] = [
    latitude,
    longitude,
  ];

  const handleDragEnd = (event: L.DragEndEvent) => {
    if (!editable || !onPositionChange) {
      return;
    }

    const marker = event.target as L.Marker;

    const coordinates = marker.getLatLng();

    onPositionChange({
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });
  };

  return (
    <div
      className={styles.map}
      style={{
        height,
      }}
    >
      <MapContainer
        center={position}
        zoom={zoom}
        className={styles.container}
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
        />

        <MapClickHandler
          editable={editable}
          onPositionChange={onPositionChange}
        />

        <Marker
          position={position}
          icon={markerIconOptions}
          draggable={editable}
          eventHandlers={{
            dragend: handleDragEnd,
          }}
        />

        {radius > 0 && (
          <Circle
            center={position}
            radius={radius}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default GeofenceMap;