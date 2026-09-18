import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { getEvents, getLateStatuses, getEarlyStatuses } from "../model/config";

import { SelectList } from "@shared/ui";
import { useQueryParams } from "@shared/lib";
import { defaultValues, eventTypes, queries } from "@shared/config";

import styles from "./EmployeeHistoryFilters.module.scss";

const EmployeeHistoryFilters: FC = () => {
  const { t } = useTranslation();
  const { get, setMany } = useQueryParams();
  const eventType = get(queries.EVENT) || defaultValues.event;
  const late = get(queries.LATE) || defaultValues.late;
  const early = get(queries.EARLY) || defaultValues.early;

  const events = getEvents(t);
  const lateStatuses = getLateStatuses(t);
  const earlyStatuses = getEarlyStatuses(t);

  const handleChange = (value: string) => {
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
        currentValue={eventType}
        onChange={handleChange}
      />
      {eventType === eventTypes.ENTER && <SelectList
        options={lateStatuses}
        queryKey={queries.LATE}
        defaultValue={defaultValues.late}
        currentValue={late}
      />}
      {eventType === eventTypes.EXIT && <SelectList
        options={earlyStatuses}
        queryKey={queries.EARLY}
        defaultValue={defaultValues.early}
        currentValue={early}
      />}
    </div>
  );
}

export default EmployeeHistoryFilters;