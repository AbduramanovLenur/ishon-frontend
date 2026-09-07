import type { FC } from "react";

import { SystemLogsTable } from "./SystemLogsTable";

import { TopContent } from "@shared/ui";

import styles from "./SystemLogs.module.scss";

const SystemLogs: FC = () => {
  return (
    <section className={styles['system-logs']}>
      <div className={styles['system-logs__inner']}>
        <TopContent
          title="Kirish jurnali"
          text="Xodimlarning kirish-chiqishlarini kuzatib boring va nazorat qiling."
        />
        <SystemLogsTable />
      </div>
    </section>
  );
}

export default SystemLogs;