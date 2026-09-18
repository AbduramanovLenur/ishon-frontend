import type { FC } from "react";
import { Skeleton } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import { useObjectById } from "../model/queries";

import { GeofenceMap } from "@shared/ui";
import { formatHoursMinutes } from "@shared/utils";

import styles from "./ObjectDetails.module.scss";

interface IObjectDetailsProps {
  objectId: string | number;
};

const ObjectDetails: FC<IObjectDetailsProps> = ({ objectId }) => {
  const { t } = useTranslation();
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
          {t("objects.locationInfo")}
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
          {t("objects.geofenceParams")}
        </div>
      )}
      <div className={`${styles['object-details__overlay']} ${styles['object-details__coordinates']}`}>
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          hasCoordinates && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                {t("objects.coordinates")}
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
                {t("objects.radiusLabel")}
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
          {t("objects.workSchedule")}
        </div>
      )}
      <div className={styles['object-details__overlay']}>
      {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          hasShiftTime && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                {t("objects.workTime")}
              </div>
              <div className={styles['object-details__value']}>
                { formatHoursMinutes(data.shiftStartTime) } - { formatHoursMinutes(data.shiftEndTime) }
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          data?.attendanceClosingTime && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                {t("objects.closingTime")}
              </div>
              <div className={styles['object-details__value']}>
                { formatHoursMinutes(data.attendanceClosingTime) }
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          data?.lateEntryGraceMinutes !== null && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                {t("objects.lateGracePeriod")}
              </div>
              <div className={styles['object-details__value']}>
                { data?.lateEntryGraceMinutes } {t("objects.minutes")}
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['object-details__skeleton']} />
        ) : (
          data?.earlyLeaveGraceMinutes !== null && (
            <div className={styles['object-details__wrapper']}>
              <div className={styles['object-details__small-title']}>
                {t("objects.earlyGracePeriod")}
              </div>
              <div className={styles['object-details__value']}>
                { data?.earlyLeaveGraceMinutes } {t("objects.minutes")}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ObjectDetails;
