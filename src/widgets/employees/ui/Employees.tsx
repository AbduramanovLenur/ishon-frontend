import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import EmployeesTable from "./EmployeesTable";

import { open } from "@features/manage-employee-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Employees.module.scss";

const Employees: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleOpenManageModal = () => {
    dispatch(open(null));
  }

  return (
    <section className={styles['employees']}>
      <div className={styles['employees__inner']}>
        <TopContent
          title={t("employees.title")}
          text={t("employees.description")}
        >
          <PrimaryButton onClick={handleOpenManageModal}>
            {t("employees.create")}
          </PrimaryButton>
        </TopContent>
        <EmployeesTable />
      </div>
    </section>
  );
}

export default Employees;
