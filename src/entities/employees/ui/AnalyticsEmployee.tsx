import type { FC } from "react";
import { Skeleton } from "antd";
import { 
  CloseOutlined,
  FieldTimeOutlined,
  ReconciliationOutlined,
  ScheduleOutlined,
  SelectOutlined
} from "@ant-design/icons";

import styles from "./AnalyticsEmployee.module.scss";

interface IAnalyticsEmployeeProps {
  workedDays: number;
  notCheckedInDays: number;
  lateArrivals: number;
  earlyLeaves: number;
  notLeftDays: number;
  isLoading: boolean;
}

const AnalyticsEmployee: FC<IAnalyticsEmployeeProps> = ({
  workedDays,
  notCheckedInDays,
  lateArrivals,
  earlyLeaves,
  notLeftDays,
  isLoading
}) => {
  const analytics = [
    {
      id: 1,
      icon: <ReconciliationOutlined />,
      label: 'Ishlangan kunlar',
      value: workedDays,
    },
    {
      id: 2,
      icon: <CloseOutlined />,
      label: 'Qoldirilgan kunlar',
      value: notCheckedInDays,
    },
    {
      id: 3,
      icon: <ScheduleOutlined />,
      label: 'Kechikib kelishlar',
      value: lateArrivals,
    },
    {
      id: 4,
      icon: <FieldTimeOutlined />,
      label: 'Erta ketishlar',
      value: earlyLeaves,
    },
    {
      id: 5,
      icon: <SelectOutlined />,
      label: 'Qayd etilmagan',
      value: notLeftDays,
    },
  ];

  return (
    <div className={styles['analytics-employee']}>
      <ul className={styles['analytics-employee__list']}>
        {analytics.map(({ id, icon, label, value }) => (
          isLoading ? (
            <Skeleton.Node className={styles['analytics-employee__skeleton']} />
          ) : (
            <li
              key={id}
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