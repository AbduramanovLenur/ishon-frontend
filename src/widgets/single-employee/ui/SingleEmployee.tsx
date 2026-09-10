import type { FC } from "react";

import EmployeeProfile from "./EmployeeProfile";
import EmployeeHistory from "./EmployeeHistory";

import styles from "./SingleEmployee.module.scss";

const SingleEmployee: FC = () => {
  return (
    <section className={styles['single-employee']}>
      <div className={styles['single-employee__inner']}>
        <EmployeeProfile />
        <EmployeeHistory />
      </div>
    </section>
  );
}

export default SingleEmployee;