import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { ObjectsTable } from "./ObjectsTable";

import { open } from "@features/manage-object-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Objects.module.scss";

const Objects: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenManageModal = () => {
    dispatch(open(null));
  }

  return (
    <section className={styles['objects']}>
      <div className={styles['objects__inner']}>
        <TopContent
          title={t("objects.title")}
          text={t("objects.description")}
        >
          <PrimaryButton onClick={handleOpenManageModal}>
            {t("objects.create")}
          </PrimaryButton>
        </TopContent>
        <ObjectsTable />
      </div>
    </section>
  );
}

export default Objects;
