import type { FC } from "react";
import { useDispatch } from "react-redux";

import EmployeesTable from "./EmployeesTable";

import { open } from "@features/manage-employee-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Employees.module.scss";

const Employees: FC = () => {
  const dispatch = useDispatch();

  const openManageModalHandle = () => {
    dispatch(open(null));
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