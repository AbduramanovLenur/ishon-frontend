import type { FC } from "react";
import type { SegmentedProps, SelectProps } from "antd";
import { useTranslation } from "react-i18next";

import { useTodaysPresenceListCount } from "@entities/todays-presence";
import { SelectList, Tabs } from "@shared/ui";
import { defaultValues, queries, workStatus } from "@shared/config";
import { useMediaQuery, useQueryParams } from "@shared/lib";
import type { TWorkStatus } from "@shared/types";

import styles from "./TodaysPresenceStatusFilter.module.scss";

const TodaysPresenceStatusFilter: FC = () => {
  const { t } = useTranslation();
  const { get } = useQueryParams();
  const date = get(queries.DATE) || defaultValues.date;
  const statusWork = (get(queries.STATUS_WORK) || defaultValues.statusWork) as TWorkStatus;
  const { data, isLoading } = useTodaysPresenceListCount(date);
  const isMobile = useMediaQuery('(max-width: 1200px)');

  const atWorkStatus = data?.atWork || 0;
  const leftStatus = data?.left || 0;
  const notCheckedInStatus = data?.notCheckedIn || 0;
  const notLeftStatus = data?.notLeft || 0;

  const segmentedOptions: SegmentedProps<string>["options"] = [
    { label: `${t("todaysPresence.atWork")} (${atWorkStatus})`, value: workStatus.AT_WORK },
    { label: `${t("todaysPresence.left")} (${leftStatus})`, value: workStatus.LEFT },
    { label: `${t("todaysPresence.notCheckedIn")} (${notCheckedInStatus})`, value: workStatus.NOT_CHECKED_IN },
    { label: `${t("todaysPresence.notLeft")} (${notLeftStatus})`, value: workStatus.NOT_LEFT },
  ];

  const selectOptions: SelectProps<string>["options"] = [
    { label: `${t("todaysPresence.atWork")} (${atWorkStatus})`, value: workStatus.AT_WORK },
    { label: `${t("todaysPresence.left")} (${leftStatus})`, value: workStatus.LEFT },
    { label: `${t("todaysPresence.notCheckedIn")} (${notCheckedInStatus})`, value: workStatus.NOT_CHECKED_IN },
    { label: `${t("todaysPresence.notLeft")} (${notLeftStatus})`, value: workStatus.NOT_LEFT },
  ];

  if (isMobile) {
    return (
      <SelectList
        className={styles['todays-presence-status-filter']}
        options={selectOptions}
        queryKey={queries.STATUS_WORK}
        defaultValue={defaultValues.statusWork}
        currentValue={statusWork}
        showAll={false}
        isLoading={isLoading}
      />
    );
  }

  return <Tabs
    options={segmentedOptions}
    isLoading={isLoading}
    queryKey={queries.STATUS_WORK}
    defaultValue={defaultValues.statusWork}
    currentValue={statusWork}
  />;
}

export default TodaysPresenceStatusFilter;
