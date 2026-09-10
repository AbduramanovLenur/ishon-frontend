import type { FC } from "react";
import { useParams } from "react-router-dom";

import { useEmployeeHistory } from "@entities/employees";
import { useQueryParams } from "@shared/lib";
import { defaultValues, earlyValues, lateValues, queries } from "@shared/config";
import { validationPage } from "@shared/utils";
import { Paginator } from "@shared/ui";

import styles from "./EmployeeHistoryList.module.scss";

const EmployeeHistoryList: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { get } = useQueryParams();
  const eventType = get(queries.EVENT) || defaultValues.event;
  const late = get(queries.LATE)
    ? get(queries.LATE) === String(lateValues.TRUE)
    : defaultValues.late;
  const early = get(queries.EARLY)
    ? get(queries.EARLY) === String(earlyValues.TRUE)
    : defaultValues.early;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useEmployeeHistory(
    id!,
    eventType,
    late,
    early,
    currentPage
  );

  const historyData = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;

  return (
    <div className={styles['history-employee']}>
      <ul className={styles['history-employee__list']}>
        
      </ul>
      {defaultValues.pageSize < totalElements && <div className={styles['objects-table__bottom']}>
        <Paginator total={totalElements} />
      </div>}
    </div>
  );
}

export default EmployeeHistoryList;