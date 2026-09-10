import type { FC } from "react";

import EmployeeHistoryFilters from "./EmployeeHistoryFilters";
import EmployeeHistoryList from "./EmployeeHistoryList";

import styles from "./EmployeeHistory.module.scss";

const EmployeeHistory: FC = () => {
  return (
    <div className={styles['employee-history']}>
      <EmployeeHistoryFilters />
      <EmployeeHistoryList />
    </div>
  );
}

export default EmployeeHistory;