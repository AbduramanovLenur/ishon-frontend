import type { FC } from "react";

import EmployeesTable from "./EmployeesTable";

import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Employees.module.scss";

const Employees: FC = () => {

  const openManageModalHandle = () => {
  }
  return (
    <section className={styles['employees']}>
      <div className={styles['employees__inner']}>
        <TopContent
          title="Xodimlar"
          text="Barcha obyektlarda xodimlar kirish huquqlari va biometrik profillarini boshqaring."
        >
          <PrimaryButton onClick={openManageModalHandle}>
            Xodim yaratish
          </PrimaryButton>
        </TopContent>
        <EmployeesTable />
      </div>
    </section>
  );
}

export default Employees;