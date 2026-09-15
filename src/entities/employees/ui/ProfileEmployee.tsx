import type { FC } from "react";
import { Image, Tag } from "antd";
import { HomeOutlined, PhoneOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { formatPhoneNumberIntl } from "react-phone-number-input";

import type { TDays } from "@shared/types";
import { formatHoursMinutes } from "@shared/utils";
import { daysLabels } from "@shared/config";

import styles from "./ProfileEmployee.module.scss";

interface IProfileEmployeeProps {
  fullName: string;
  object: string;
  position: string;
  photoUrl: string;
  phoneNumber: string;
  workdayStartTime: string;
  workdayEndTime: string;
  workingDays: TDays[];
  isLoading: boolean;
}

const ProfileEmployee: FC<IProfileEmployeeProps> = ({
  fullName,
  object,
  position,
  photoUrl,
  phoneNumber,
  workdayStartTime,
  workdayEndTime,
  workingDays,
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton.Node className={styles["profile-employee__skeleton"]} />;
  }

  return (
    <div className={styles["profile-employee"]}>
      <Image
        classNames={{ root: styles["profile-employee__ava"] }}
        className={styles["profile-employee__ava-image"]}
        src={photoUrl}
        alt={fullName}
        loading="lazy"
        width={192}
        height={192}
      />
      <div className={styles["profile-employee__content"]}>
        <h1 className={styles["profile-employee__title"]}>{fullName}</h1>
        <div className={styles["profile-employee__object"]}>
          <HomeOutlined />
          <span className={styles["profile-employee__object-name"]}>{object}</span>
        </div>
        <Tag className={styles["profile-employee__position"]} color="#2db7f5" variant="solid">
          {position}
        </Tag>

        <div className={styles["profile-employee__info"]}>
          <div className={styles["profile-employee__info-item"]}>
            <PhoneOutlined className={styles["profile-employee__info-icon"]} />
            <span>{formatPhoneNumberIntl(phoneNumber)}</span>
          </div>
          <div className={styles["profile-employee__info-item"]}>
            <ClockCircleOutlined className={styles["profile-employee__info-icon"]} />
            <span>{formatHoursMinutes(workdayStartTime)} — {formatHoursMinutes(workdayEndTime)}</span>
          </div>
          <div className={styles["profile-employee__days"]}>
            {workingDays.map((day) => (
              <Tag key={day} className={styles["profile-employee__day-tag"]}>
                {daysLabels[day]}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEmployee;