import type { FC } from "react";

import type { IEmployeeEvent } from "../model/types";

import { defaultValues, eventTypes, queries } from "@shared/config";
import { Paginator, SelectList } from "@shared/ui";

import styles from "./HistoryEmployee.module.scss";

interface IHistoryEmployeeProps {
  history: IEmployeeEvent[];
  isLoading: boolean;
  totalElements: number;
};

const HistoryEmployee: FC<IHistoryEmployeeProps> = ({ history, isLoading, totalElements }) => {
  console.log(history);

  const events = [
    {
      label: 'Kirish',
      value: eventTypes.ENTER
    },
    {
      label: 'Chiqish',
      value: eventTypes.EXIT
    }
  ];
  
  return (
    !!history.length && (
      <div className={styles['history-employee']}>
        <div className={styles['history-employee__top']}>
          <SelectList
            options={events}
            queryKey={queries.EVENT}
            defaultValue={defaultValues.event}
            isLoading={isLoading}
          />
        </div>
        <ul className={styles['history-employee__list']}></ul>
        {defaultValues.pageSize < totalElements && <div className={styles['objects-table__bottom']}>
          <Paginator total={totalElements} />
        </div>}
      </div>
    )
  );
}

export default HistoryEmployee;