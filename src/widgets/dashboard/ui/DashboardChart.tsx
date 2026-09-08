import { useEffect, type FC } from "react";
import { Line } from '@ant-design/plots';

import { useStatisticsChart } from "@entities/statistics";
import { defaultValues, period, queries } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import type { TPeriod } from "@shared/types";
import { transformAttendanceDateData } from "@shared/utils";

import styles from "./DashboardChart.module.scss";
import { Spin } from "antd";

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
    height: 400,
    xField: "date",
    yField: "value",
    smooth: true,
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

  return (
    <div className={styles['dashboard-chart']}>
      <Spin spinning={isLoading}>
        <Line {...config} />
      </Spin>
    </div>
  );
}

export default DashboardChart;