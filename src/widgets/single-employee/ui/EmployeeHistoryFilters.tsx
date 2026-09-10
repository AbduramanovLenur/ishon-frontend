import type { FC } from "react";

import { earlyStatuses, events, lateStatuses } from "../model/config";

import { SelectList } from "@shared/ui";
import { useQueryParams } from "@shared/lib";
import { defaultValues, eventTypes, queries } from "@shared/config";

import styles from "./EmployeeHistoryFilters.module.scss";

const EmployeeHistoryFilters: FC = () => {
  const { get, setMany } = useQueryParams();
  const eventType = get(queries.EVENT) || defaultValues.event;
  
  const onChangeHandle = (value: string) => {
    if (!value) {
      setMany({
        [queries.EVENT]: null,
        [queries.LATE]: null,
        [queries.EARLY]: null,
      });
      return;
    }

    setMany({
      [queries.EVENT]: value,
      [queries.LATE]: null,
      [queries.EARLY]: null,
    });
  };

  return (
    <div className={styles['history-filters']}>
      <SelectList
        options={events}
        queryKey={queries.EVENT}
        defaultValue={defaultValues.event}
        onChange={onChangeHandle}
      />
      {eventType === eventTypes.ENTER && <SelectList
        options={lateStatuses}
        queryKey={queries.LATE}
        defaultValue={defaultValues.late}
      />}
      {eventType === eventTypes.EXIT && <SelectList
        options={earlyStatuses}
        queryKey={queries.EARLY}
        defaultValue={defaultValues.early}
      />}
    </div>
  );
}

export default EmployeeHistoryFilters;