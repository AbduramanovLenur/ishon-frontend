import type { FC } from "react";
import type { SegmentedProps, SelectProps } from "antd";

import { useTodaysPresenceListCount } from "@entities/todays-presence";
import { SelectList, Tabs } from "@shared/ui";
import { defaultValues, queries, workStatus } from "@shared/config";
import { useMediaQuery } from "@shared/lib";

import styles from "./TodaysPresenceStatusFilter.module.scss";

const TodaysPresenceStatusFilter: FC = () => {
  const { data, isLoading } = useTodaysPresenceListCount();
  const isMobile = useMediaQuery('(max-width: 1200px)');

  const atWorkStatus = data?.atWork || 0;
  const leftStatus = data?.left || 0;
  const notCheckedInStatus = data?.notCheckedIn || 0;
  const notLeftStatus = data?.notLeft || 0;

  const segmentedOptions: SegmentedProps<string>["options"] = [
    { label: `Ishda (${atWorkStatus})`, value: workStatus.AT_WORK },
    { label: `Ketgan (${leftStatus})`, value: workStatus.LEFT },
    { label: `Kirish qayd etilmagan (${notCheckedInStatus})`, value: workStatus.NOT_CHECKED_IN },
    { label: `Chiqish qayd etilmagan (${notLeftStatus})`, value: workStatus.NOT_LEFT },
  ];

  const selectOptions: SelectProps<string>["options"] = [
    { label: `Ishda (${atWorkStatus})`, value: workStatus.AT_WORK },
    { label: `Ketgan (${leftStatus})`, value: workStatus.LEFT },
    { label: `Kirish qayd etilmagan (${notCheckedInStatus})`, value: workStatus.NOT_CHECKED_IN },
    { label: `Chiqish qayd etilmagan (${notLeftStatus})`, value: workStatus.NOT_LEFT },
  ];

  if (isMobile) {
    return (
      <SelectList
        className={styles['todays-presence-status-filter']}
        options={selectOptions}
        queryKey={queries.STATUS_WORK}
        defaultValue={defaultValues.statusWork}
        showAll={false}
        isLoading={isLoading}
      />
    );
  }

  return <Tabs 
    options={segmentedOptions} 
    isLoading={isLoading} 
    nameQuery={queries.STATUS_WORK}
    defaultValue={defaultValues.statusWork}
  />;
}

export default TodaysPresenceStatusFilter;