import type { FC } from "react";
import type { SegmentedProps } from "antd";

import { useTodaysPresenceListCount } from "@entities/todays-presence";
import { Tabs } from "@shared/ui";
import { workStatus } from "@shared/config";

const TodaysPresenceStatusFilter: FC = () => {
  const { data, isLoading } = useTodaysPresenceListCount();

  const atWorkStatus = data?.atWork || 0;
  const leftStatus = data?.left || 0;
  const notCheckedInStatus = data?.notCheckedIn || 0;

  const options: SegmentedProps<string>["options"] = [
    { label: `Ishda (${atWorkStatus})`, value: workStatus.AT_WORK },
    { label: `Ketgan (${leftStatus})`, value: workStatus.LEFT },
    { label: `Kirish qayd etilmagan (${notCheckedInStatus})`, value: workStatus.NOT_CHECKED_IN },
  ];

  return (
    <Tabs options={options} isLoading={isLoading} />
  );
}

export default TodaysPresenceStatusFilter;