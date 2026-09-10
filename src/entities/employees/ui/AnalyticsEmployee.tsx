import type { FC } from "react";
import { 
  CloseOutlined, 
  FieldTimeOutlined, 
  ReconciliationOutlined, 
  ScheduleOutlined, 
  // SelectOutlined 
} from "@ant-design/icons";

import styles from "./AnalyticsEmployee.module.scss";
import { Skeleton } from "antd";

interface IAnalyticsEmployeeProps {
  workedDays: number;
  notCheckedInDays: number;
  lateArrivals: number;
  earlyLeaves: number;
  isLoading: boolean;
}

const AnalyticsEmployee: FC<IAnalyticsEmployeeProps> = ({
  workedDays,
  notCheckedInDays,
  lateArrivals,
  earlyLeaves,
  isLoading
}) => {
  const analytics = [
    {
      icon: <ReconciliationOutlined />,
      label: 'Ishlangan kunlar',
      value: workedDays,
    },
    {
      icon: <CloseOutlined />,
      label: 'Qoldirilgan kunlar',
      value: notCheckedInDays,
    },
    {
      icon: <ScheduleOutlined />,
      label: 'Kechikib kelishlar',
      value: lateArrivals,
    },
    {
      icon: <FieldTimeOutlined />,
      label: 'Erta ketishlar',
      value: earlyLeaves,
    },
    // {
    //   icon: <SelectOutlined />,
    //   label: 'Qayd etilmagan',
    //   value: earlyLeaves,
    // }
  ];

  return (
    <div className={styles['analytics-employee']}>
      <ul className={styles['analytics-employee__list']}>
        {analytics.map(({ icon, label, value }) => (
          isLoading ? (
            <Skeleton.Node className={styles['analytics-employee__skeleton']} />
          ) : (
            <li
              key={label}
              className={styles['analytics-employee__item']}
            >
              <div className={styles['analytics-employee__box']}>
                <div className={styles['analytics-employee__info']}>
                  {icon}
                  <div className={styles['analytics-employee__text']}>
                    {label}
                  </div>
                </div>
                <div className={styles['analytics-employee__value']}>
                  {value}
                </div>
              </div>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsEmployee;