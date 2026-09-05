import type { FC } from "react";
import { EnvironmentOutlined } from "@ant-design/icons";

import { useObjectById } from "../model/queries";

import { GeofenceMap } from "@shared/ui";

import styles from "./ObjectDetails.module.scss";
import { Skeleton } from "antd";

interface IObjectDetailsProps {
  objectId: string | number;
};

const ObjectDetails: FC<IObjectDetailsProps> = ({ objectId }) => {
  const hasId = !!objectId;
  const { data, isLoading } = useObjectById(objectId, hasId);

  const hasLocation =
    data?.name != null && 
    data?.address != null

  const hasGeofence =
    data?.latitude != null &&
    data?.longitude != null &&
    data?.geofenceRadiusMeters != null;

  const hasCoordinates =
    data?.latitude != null &&
    data?.longitude != null;

  const hasShiftTime =
    data?.shiftStartTime != null &&
    data?.shiftEndTime != null;

  const hasShift =
    hasShiftTime &&
    data?.lateEntryGraceMinutes != null &&
    data?.earlyLeaveGraceMinutes != null;

  return (
    <div className={styles['object-details']}>
      {hasLocation && (
        <div className={styles['object-details__label']}>
          Joylashuv ma’lumotlari
        </div>
      )}
      {isLoading ? (
        <Skeleton.Node className={`${styles['object-details__skeleton']} ${styles['object-details__margened']}`} />
      ) : (
        hasLocation && (
          <div className={`${styles["object-details__wrapper"]} ${styles["object-details__location"]}`}>
            <EnvironmentOutlined className={styles["object-details__location-icon"]} />
            <div className={styles["object-details__location-info"]}>
              <div className={styles["object-details__location-name"]}>
                { data.name }
              </div>
              <div className={styles["object-details__location-address"]}>
                { data.address }
              </div>
            </div>
          </div>
        )
      )}
      {isLoading ? (
        <Skeleton.Node className={`${styles['object-details__big-skeleton']} ${styles['object-details__margened']}`} />
      ) : (
        hasGeofence && (
          <div className={styles["object-details__map"]}>
            <GeofenceMap
              latitude={data.latitude !== undefined ? Number(data.latitude) : undefined}
              longitude={data.longitude !== undefined ? Number(data.longitude) : undefined}
              radius={data.geofenceRadiusMeters ?? 0}
              height={150}
            />
          </div>
        )
      )}
      {hasGeofence && (
        <div className={styles['object-details__label']}>
          Geofence parametrlari
        </div>
      )}
      <div className={`${styles['object-details__overlay']} ${styles['object-details__coordinates']}`}>
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          hasCoordinates && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                Koordinatalar
              </div>
              <div className={styles['object-details__value']}>
                { data.latitude }, { data.longitude }
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          data?.geofenceRadiusMeters && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                Radius
              </div>
              <div className={styles['object-details__value']}>
                { data.geofenceRadiusMeters } m
              </div>
            </div>
          )
        )}
      </div>
      {hasShift && (
        <div className={styles['object-details__label']}>
          Ish jadvali
        </div>
      )}
      <div className={styles['object-details__overlay']}>
      {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          hasShiftTime && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                Ish vaqti
              </div>
              <div className={styles['object-details__value']}>
                { data.shiftStartTime } - { data.shiftEndTime }
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          data?.lateEntryGraceMinutes && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                Kechikish uchun ruxsat etilgan vaqt
              </div>
              <div className={styles['object-details__value']}>
                { data.lateEntryGraceMinutes } daq
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          data?.earlyLeaveGraceMinutes && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                Erta ketish uchun ruxsat etilgan vaqt
              </div>
              <div className={styles['object-details__value']}>
                { data.earlyLeaveGraceMinutes } daq
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ObjectDetails;