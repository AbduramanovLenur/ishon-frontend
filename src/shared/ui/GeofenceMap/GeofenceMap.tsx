import { type FC } from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import MapController from "./MapController";
import MapClickHandler from "./MapClickHandler";

import type { IGeofenceMapProps } from "../../types";
import { defaultValues } from "../../config";

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
  dragging = true,
  scrollWheelZoom = true,
  doubleClickZoom = true,
  touchZoom = true,
  zoomControl = true
}) => {
  const hasValidPosition =
    latitude !== undefined &&
    longitude !== undefined &&
    !Number.isNaN(latitude) &&
    !Number.isNaN(longitude);

  const position: [number, number] = hasValidPosition
    ? [latitude, longitude]
    : [...defaultValues.uzbekistanCenter] as [number, number];

  const effectiveZoom = hasValidPosition ? zoom : defaultValues.uzbekistanZoom;

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
        zoom={effectiveZoom}
        className={styles.container}
        scrollWheelZoom={scrollWheelZoom}
        dragging={dragging}
        doubleClickZoom={doubleClickZoom}
        touchZoom={touchZoom}
        zoomControl={zoomControl}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hasValidPosition && (
          <MapController
            latitude={latitude}
            longitude={longitude}
            zoom={effectiveZoom}
          />
        )}

        <MapClickHandler
          editable={editable}
          onPositionChange={onPositionChange}
        />

        {hasValidPosition && (
          <Marker
            position={position}
            icon={markerIconOptions}
            draggable={editable}
            eventHandlers={{
              dragend: handleDragEnd,
            }}
          />
        )}

        {hasValidPosition && radius > 0 && (
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
