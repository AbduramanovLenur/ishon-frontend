import type { FC } from "react";

import { DateFilter } from "@shared/ui";

import styles from "./TodaysPresenceDateFilter.module.scss";

const TodaysPresenceDateFilter: FC = () => {
  return (
    <DateFilter 
      className={styles['todays-presence-date-filter']} 
    />
  );
}

export default TodaysPresenceDateFilter;