import type { FC, ReactNode } from "react";

import { formatNumber } from "@shared/utils";

import styles from "./StatisticsCard.module.scss";
import { Skeleton } from "antd";

interface IStatisticsCardProps {
  icon: ReactNode,
  iconBg: string;
  title: string;
  isLoading: boolean;
  count: number;
}

const StatisticsCard: FC<IStatisticsCardProps> = ({ icon, iconBg, title, isLoading, count }) => {
  return (
    <div className={styles['statistics-card']}>
      <div className={styles['statistics-card__icon']} style={{ backgroundColor: iconBg }}>
        { icon }
      </div>
      <div className={styles['statistics-card__title']}>
        { title }
      </div>
      {isLoading ? (
        <Skeleton.Node className={styles['statistics-card__skeleton']} />
      ) : (
        <div className={styles['statistics-card__count']}>
          { formatNumber(count) }
        </div>
      )}
    </div>
  );
}

export default StatisticsCard;