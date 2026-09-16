import type { FC } from "react";
import { Segmented, type SegmentedProps } from "antd";

import { useQueryParams } from "../../lib";

import styles from "./Tabs.module.scss";

interface ITabsProps {
  options: SegmentedProps<string>['options'],
  isLoading?: boolean;
  queryKey: string;
  defaultValue: string;
  className?: string;
  currentValue: string;
};

const Tabs: FC<ITabsProps> = ({ 
  options, 
  isLoading = false, 
  queryKey, 
  defaultValue, 
  className = '',
  currentValue = ''
}) => {
  const { set } = useQueryParams();

  const onChangeHandle = (value: string) => {
    set(queryKey, value);
  }

  return (
    <Segmented 
      classNames={{
        root: `${styles['tabs']} ${className}`,
        item: styles['tabs__item'],
        label: styles['tabs__label']
      }}
      defaultValue={defaultValue}
      value={currentValue} 
      options={options} 
      onChange={onChangeHandle}
      disabled={isLoading}
    />
  );
}

export default Tabs;