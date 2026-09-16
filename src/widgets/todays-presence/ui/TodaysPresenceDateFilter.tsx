import type { FC } from "react";

import { DateFilter } from "@shared/ui";
import { defaultValues, queries } from "@shared/config";
import { useQueryParams } from "@shared/lib";

import styles from "./TodaysPresenceDateFilter.module.scss";

const TodaysPresenceDateFilter: FC = () => {
  const { get } = useQueryParams();
  const currentValue = get(queries.DATE) ?? defaultValues.date;

  return (
    <DateFilter 
      className={styles['todays-presence-date-filter']} 
      queryKey={queries.DATE}
      defaultValue={defaultValues.date}
      currentValue={currentValue}
    />
  );
}

export default TodaysPresenceDateFilter;