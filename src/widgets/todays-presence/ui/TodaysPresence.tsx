import { type FC } from "react";
import { useTranslation } from "react-i18next";

import TodaysPresenceFilters from "./TodaysPresenceFilters";
import TodaysPresenceTable from "./TodaysPresenceTable";

import { TopContent } from "@shared/ui";

import styles from "./TodaysPresence.module.scss";

const TodaysPresence: FC = () => {
  const { t } = useTranslation();

  return (
    <section className={styles['todays-presence']}>
      <div className={styles['todays-presence']}>
        <TopContent
          title={t("todaysPresence.title")}
          text={t("todaysPresence.description")}
        />
        <TodaysPresenceFilters />
        <TodaysPresenceTable />
      </div>
    </section>
  );
}

export default TodaysPresence;
