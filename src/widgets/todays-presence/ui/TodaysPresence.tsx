import { type FC } from "react";

import TodaysPresenceFilters from "./TodaysPresenceFilters";
import TodaysPresenceTable from "./TodaysPresenceTable";

import { TopContent } from "@shared/ui";

import styles from "./TodaysPresence.module.scss";

const TodaysPresence: FC = () => {
  return (
    <section className={styles['todays-presence']}>
      <div className={styles['todays-presence']}>
        <TopContent
          title="Bugungi davomat"
          text="Xodimlarning davomatini va holatini real vaqt rejimida kuzatib boring."
        />
        <TodaysPresenceFilters />
        <TodaysPresenceTable />
      </div>
    </section>
  );
}

export default TodaysPresence;