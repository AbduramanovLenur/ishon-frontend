import type { FC } from "react";

import TodaysPresenceStatusFilter from "./TodaysPresenceStatusFilter";
import TodaysPresenceObjectFilter from "./TodaysPresenceObjectFilter";

import styles from "./TodaysPresenceFilters.module.scss";

const TodaysPresenceFilters: FC = () => {
  
  return (
    <div className={styles['todays-presence-filters']}>
      <TodaysPresenceStatusFilter />
      <TodaysPresenceObjectFilter />
    </div>
  );
}

export default TodaysPresenceFilters;