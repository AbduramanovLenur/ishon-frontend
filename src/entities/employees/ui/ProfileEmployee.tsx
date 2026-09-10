import type { FC } from "react";
import { Image, Tag } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

import styles from "./ProfileEmployee.module.scss";

interface IProfileEmployeeProps {
  fullName: string;
  object: string;
  position: string;
  photoUrl: string;
  isLoading: boolean;
};

const ProfileEmployee: FC<IProfileEmployeeProps> = ({ fullName, object, position, photoUrl, isLoading }) => {
  return (
    isLoading ? (
      <Skeleton.Node className={styles['profile-employee__skeleton']} />
    ) : (
      <div className={styles['profile-employee']}>
        <Image 
          classNames={{
            root: styles['profile-employee__ava']
          }}
          className={styles['profile-employee__ava-image']}
          src={photoUrl}
          alt={fullName}
          loading="lazy"
          width={192}
          height={192}
        />
        <div className={styles['profile-employee__content']}>
          <h1 className={styles['profile-employee__title']}>
            {fullName}
          </h1>
          <div className={styles['profile-employee__object']}>
            <HomeOutlined />
            <div className={styles['profile-employee__object-name']}>
              {object}
            </div>
          </div>
          <Tag 
            className={styles['profile-employee__position']}
            color={'#2db7f5'} 
            variant="solid"
          >
            {position}
          </Tag>
        </div>
      </div>
    )
  );
}

export default ProfileEmployee;