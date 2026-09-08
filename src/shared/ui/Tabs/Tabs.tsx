import type { FC } from "react";
import { Segmented, type SegmentedProps } from "antd";

import { useQueryParams } from "../../lib";

import styles from "./Tabs.module.scss";

interface ITabsProps {
  options: SegmentedProps<string>['options'],
  isLoading?: boolean;
  nameQuery: string;
  defaultValue: string;
  className?: string;
};

const Tabs: FC<ITabsProps> = ({ options, isLoading = false, nameQuery, defaultValue, className = '' }) => {
  const { get, set } = useQueryParams();
  const value = get(nameQuery) || defaultValue;

  const onChangeHandle = (value: string) => {
    set(nameQuery, value);
  }

  return (
    <Segmented 
      classNames={{
        root: `${styles['tabs']} ${className}`,
        item: styles['tabs__item'],
        label: styles['tabs__label']
      }}
      value={value} 
      options={options} 
      onChange={onChangeHandle}
      disabled={isLoading}
    />
  );
}

export default Tabs;