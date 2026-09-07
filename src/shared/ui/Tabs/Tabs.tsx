import type { FC } from "react";
import { Segmented, type SegmentedProps } from "antd";

import { useQueryParams } from "../../lib";
import { defaultValues, queries } from "../../config";

import styles from "./Tabs.module.scss";

interface ITabsProps {
  options: SegmentedProps<string>['options'],
  isLoading?: boolean;
};

const Tabs: FC<ITabsProps> = ({ options, isLoading = false }) => {
  const { get, set } = useQueryParams();
  const statusWork = get(queries.STATUS_WORK) || defaultValues.statusWork;

  const onChangeHandle = (value: string) => {
    set(queries.STATUS_WORK, value);
  }

  return (
    <Segmented 
      classNames={{
        root: styles['tabs'],
        item: styles['tabs__item'],
        label: styles['tabs__label']
      }}
      value={statusWork} 
      options={options} 
      onChange={onChangeHandle}
      disabled={isLoading}
    />
  );
}

export default Tabs;