import type { FC } from "react";
import { useTranslation } from "react-i18next";

import DashboardBody from "./DashboardBody";

import { TopContent } from "@shared/ui";

import styles from "./Dashboard.module.scss";

const Dashboard: FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles['dashboard']}>
      <div className={styles['dashboard__inner']}>
        <TopContent
          title={t("dashboard.title")}
          text={t("dashboard.description")}
        />
        <DashboardBody />
      </div>
    </section>
  );
}

export default Dashboard;
