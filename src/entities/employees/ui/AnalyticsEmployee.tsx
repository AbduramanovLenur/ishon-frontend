import type { FC } from "react";
import { 
  CloseOutlined, 
  FieldTimeOutlined, 
  ReconciliationOutlined, 
  ScheduleOutlined, 
  // SelectOutlined 
} from "@ant-design/icons";

import styles from "./AnalyticsEmployee.module.scss";

interface IAnalyticsEmployeeProps {
  workedDays: number;
  notCheckedInDays: number;
  lateArrivals: number;
  earlyLeaves: number;
}

const AnalyticsEmployee: FC<IAnalyticsEmployeeProps> = ({
  workedDays,
  notCheckedInDays,
  lateArrivals,
  earlyLeaves,
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
      <h2 className={styles['analytics-employee__title']}>
        Analitika sharhi
      </h2>
      <ul className={styles['analytics-employee__list']}>
        {analytics.map(({ icon, label, value }) => (
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
        ))}
      </ul>
    </div>
  );
};

export default AnalyticsEmployee;