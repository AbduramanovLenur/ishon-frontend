import { type FC } from "react";

import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";

import styles from "./DashboardBody.module.scss";

const DashboardBody: FC = () => {
  return (
    <div className={styles['dashboard-body']}>
      <DashboardStats />
      <DashboardChart />
    </div>
  );
}

export default DashboardBody;