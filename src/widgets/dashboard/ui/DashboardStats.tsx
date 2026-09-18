import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { TeamOutlined, UsergroupAddOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";

import { StatisticsCard, useStatistics } from "@entities/statistics";

import styles from "./DashboardStats.module.scss";

const DashboardStats: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useStatistics();

  return (
    <ul className={styles['dashboard-stats']}>
      <li className={styles['dashboard-stats__value']}>
        <StatisticsCard
          icon={<TeamOutlined style={{ color: '#151C27' }} />}
          iconBg="#E2E8F8"
          title={t("dashboard.totalEmployees")}
          isLoading={isLoading}
          count={data?.totalEmployees || 0}
        />
      </li>
      <li className={styles['dashboard-stats__value']}>
        <StatisticsCard
          icon={<UsergroupAddOutlined color={'#68B990'} />}
          iconBg="#E5F5ED"
          title={t("dashboard.currentlyWorking")}
          isLoading={isLoading}
          count={data?.currentlyWorking || 0}
        />
      </li>
      <li className={styles['dashboard-stats__value']}>
        <StatisticsCard
          icon={<UsergroupDeleteOutlined style={{ color: '#BA1A1A' }} />}
          iconBg="#ffdad64d"
          title={t("dashboard.notCheckedIn")}
          isLoading={isLoading}
          count={data?.notCheckedIn || 0}
        />
      </li>
    </ul>
  );
}

export default DashboardStats;
