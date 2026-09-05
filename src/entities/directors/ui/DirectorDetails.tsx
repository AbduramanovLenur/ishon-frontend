import type { FC } from "react";
import { ContactsOutlined } from "@ant-design/icons";
import { Skeleton, Tag } from "antd";

import { useCompanyOwnerById } from "../model/queries";

import styles from "./DirectorDetails.module.scss";

interface IDirectorDetailsProps {
  companyOwnerId: string | number;
};

const DirectorDetails: FC<IDirectorDetailsProps> = ({ companyOwnerId }) => {
  const hasId = !!companyOwnerId;
  const { data, isLoading } = useCompanyOwnerById(companyOwnerId, hasId);

  return (
    <div className={styles['company-owner-details']}>
      {isLoading ? (
        <Skeleton.Node className={styles['company-owner-details__big-skeleton']} />
      ) : (
        data?.fullName && (
          <div className={styles['company-owner-details__name']}>
            { data.fullName }
          </div>
        )
      )}
      {isLoading ? (
        <Skeleton.Node className={styles['company-owner-details__skeleton']} />
      ) : (
        data?.position && (
          <div className={styles['company-owner-details__position']}>
            <div className={styles['company-owner-details__position-icon']}>
              <ContactsOutlined />
            </div>
            <div className="company-owner-details__position-name">
              { data.position }
            </div>
          </div>
        )
      )}
      <div className={styles['company-owner-details__grid']}>
        {isLoading ? (
          <Skeleton.Node className={styles['company-owner-details__skeleton']} />
        ) : (
          data?.username && (
            <div className={styles['company-owner-details__info']}>
              <div className={styles['company-owner-details__info-label']}>
                Login
              </div>
              <div className={styles['company-owner-details__info-value']}>
                <Tag 
                  color={'#2db7f5'} 
                  variant="solid"
                >
                  { data.username }
                </Tag>
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['company-owner-details__skeleton']} />
        ) : (
          data?.companyName && (
            <div className={styles['company-owner-details__info']}>
              <div className={styles['company-owner-details__info-label']}>
                Kompaniya nomi
              </div>
              <div className={styles['company-owner-details__info-value']}>
                { data.companyName }
              </div>
            </div>
          )
        )}
        {isLoading ? (
          <Skeleton.Node className={styles['company-owner-details__skeleton']} />
        ) : (
          data?.phone && (
            <div className={styles['company-owner-details__info']}>
              <div className={styles['company-owner-details__info-label']}>
                Telefon raqami
              </div>
              <div className={styles['company-owner-details__info-value']}>
                { data.phone }
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default DirectorDetails;