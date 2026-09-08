import { useEffect, type FC } from "react";
import { Line } from '@ant-design/plots';
import { Spin, type SegmentedProps } from "antd";

import { useStatisticsChart } from "@entities/statistics";
import { defaultValues, period, queries } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import type { TPeriod } from "@shared/types";
import { transformAttendanceDateData } from "@shared/utils";
import { Tabs } from "@shared/ui";

import styles from "./DashboardChart.module.scss";

const DashboardChart: FC = () => {
  const { get, set } = useQueryParams();
  const periodValue = (get(queries.PERIOD) || defaultValues.period) as TPeriod;
  const { data, isLoading } = useStatisticsChart(periodValue);

  useEffect(() => {
    if (periodValue) return;

    set(queries.PERIOD, period.WEEK);
  }, [periodValue, set]);
  
  const chartData = transformAttendanceDateData(data?.chart ?? []);

  const config = {
    data: chartData,
    xField: "date",
    yField: "value",
    smooth: true,
    className: styles['dashboard-chart__line'],
    style: {
      stroke: "#1677FF",
      lineWidth: 2,
    },
    point: {
      size: 6,
      shape: "circle",
      style: {
        fill: "#fff",
        stroke: "#1677FF",
        lineWidth: 2,
      },
    },
    tooltip: {
      items: [
        {
          name: "Davomat",
          channel: "y",
        },
      ],
    },
  };

  const options: SegmentedProps<string>["options"] = [
    { label: "Hafta", value: period.WEEK },
    { label: "Oy", value: period.MONTH },
  ];

  return (
    <div className={styles['dashboard-chart']}>
      <Tabs 
        className={styles['dashboard-chart__tabs']}
        options={options} 
        nameQuery={queries.PERIOD}
        defaultValue={defaultValues.period}
      />
      <Spin spinning={isLoading}>
        <Line {...config} />
      </Spin>
    </div>
  );
}

export default DashboardChart;