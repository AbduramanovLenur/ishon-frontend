import type { FC } from "react";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";

import { useCompanyById } from "../model/queries";

import styles from "./CompanyDetails.module.scss";

interface ICompanyDetailsProps {
  companyId: string | number;
};

const CompanyDetails: FC<ICompanyDetailsProps> = ({ companyId }) => {
  const { t } = useTranslation();
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
                  {t("companies.name")}
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
                  {t("companies.address")}
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
                  {t("companies.objectLimit")}
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
                  {t("companies.employeeLimit")}
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
