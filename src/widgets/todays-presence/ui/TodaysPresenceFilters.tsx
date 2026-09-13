import type { FC } from "react";

import TodaysPresenceStatusFilter from "./TodaysPresenceStatusFilter";
import TodaysPresenceObjectFilter from "./TodaysPresenceObjectFilter";
import TodaysPresenceDateFilter from "./TodaysPresenceDateFilter";

import styles from "./TodaysPresenceFilters.module.scss";

const TodaysPresenceFilters: FC = () => {
  
  return (
    <div className={styles['todays-presence-filters']}>
      <TodaysPresenceStatusFilter />
      <TodaysPresenceDateFilter />
      <TodaysPresenceObjectFilter />
    </div>
  );
}

export default TodaysPresenceFilters;