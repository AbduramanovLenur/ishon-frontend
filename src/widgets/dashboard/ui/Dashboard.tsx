import type { FC } from "react";

import DashboardBody from "./DashboardBody";

import { TopContent } from "@shared/ui";

import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  return (
    <section className={styles['dashboard']}>
      <div className={styles['dashboard__inner']}>
        <TopContent
          title="Dashboard"
          text="Davomat va ishchi kuchi tahlilini real vaqt rejimida kuzatish."
        />
        <DashboardBody />
      </div>
    </section>
  );
}

export default Dashboard;