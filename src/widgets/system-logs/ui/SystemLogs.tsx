import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { SystemLogsTable } from "./SystemLogsTable";

import { TopContent } from "@shared/ui";

import styles from "./SystemLogs.module.scss";

const SystemLogs: FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles['system-logs']}>
      <div className={styles['system-logs__inner']}>
        <TopContent
          title={t("logs.title")}
          text={t("logs.description")}
        />
        <SystemLogsTable />
      </div>
    </section>
  );
}

export default SystemLogs;
