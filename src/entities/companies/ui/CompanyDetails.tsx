import type { FC } from "react";
import { Skeleton } from "antd";

import { useCompanyById } from "../model/queries";

import styles from "./CompanyDetails.module.scss";

interface ICompanyDetailsProps {
  companyId: string | number;
};

const CompanyDetails: FC<ICompanyDetailsProps> = ({ companyId }) => {
  const hasId = !!companyId;
  const { data, isLoading } = useCompanyById(companyId, hasId);

  return (
    <div className={styles['company-details']}>
      {
        isLoading ? 
          <Skeleton.Node className={styles['company-details__skeleton']} /> : 
          (
            data?.name && (
              <div className={styles['company-details__value']}>
                <div className={styles['company-details__value-label']}>
                  Kompaniya nomi
                </div>
                <div className={styles['company-details__value-text']}>
                  {data.name}
                </div>
              </div>
            )
          )
      }
      {
        isLoading ? 
          <Skeleton.Node className={styles['company-details__skeleton']} /> : 
          (
            data?.address && (
              <div className={styles['company-details__value']}>
                <div className={styles['company-details__value-label']}>
                Kompaniya manzili
                </div>
                <div className={styles['company-details__value-text']}>
                  {data.address}
                </div>
              </div>
            )
          )
      }
      {
        isLoading ? 
          <Skeleton.Node className={styles['company-details__skeleton']} /> : 
          (
            data?.objectLimit && (
              <div className={styles['company-details__value']}>
                <div className={styles['company-details__value-label']}>
                Obyektlar soni
                </div>
                <div className={styles['company-details__value-text']}>
                  {data.objectLimit}
                </div>
              </div>
            )
          )
      }
      {
        isLoading ? 
          <Skeleton.Node className={styles['company-details__skeleton']} /> : 
          (
            data?.employeeLimit && (
              <div className={styles['company-details__value']}>
                <div className={styles['company-details__value-label']}>
                Xodimlar soni
                </div>
                <div className={styles['company-details__value-text']}>
                  {data.employeeLimit}
                </div>
              </div>
            )
          )
      }
    </div>
  );
}

export default CompanyDetails;