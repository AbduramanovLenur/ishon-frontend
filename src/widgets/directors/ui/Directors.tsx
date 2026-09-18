import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { DirectorsTable } from "./DirectorsTable";

import { open } from "@features/manage-director-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Directors.module.scss";

const Directors: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenManageModal = () => {
    dispatch(open(null));
  }

  return (
    <section className={styles['directors']}>
      <div className={styles['directors__inner']}>
        <TopContent
          title={t("directors.title")}
          text={t("directors.description")}
        >
          <PrimaryButton onClick={handleOpenManageModal}>
            {t("directors.create")}
          </PrimaryButton>
        </TopContent>
        <DirectorsTable />
      </div>
    </section>
  );
}

export default Directors;
