import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import CompaniesTable from "./CompaniesTable";

import { open } from "@features/manage-company-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Companies.module.scss";

const Companies: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenManageModal = () => {
    dispatch(open(null));
  }

  return (
    <section className={styles['companies']}>
      <div className={styles["companies__inner"]}>
        <TopContent
          title={t("companies.title")}
          text={t("companies.description")}
        >
          <PrimaryButton onClick={handleOpenManageModal}>
            {t("companies.create")}
          </PrimaryButton>
        </TopContent>
        <CompaniesTable />
      </div>
    </section>
  );
}

export default Companies;
