import type { FC } from "react";
import { Select, type SelectProps } from "antd";

import { useQueryParams } from "../../lib";

import styles from "./SelectList.module.scss";

interface ISelectListProps {
  options: SelectProps['options'];
  queryKey: string;
  defaultValue?: string;
  showAll?: boolean;
  isLoading?: boolean;
};

const SelectList: FC<ISelectListProps> = ({
  options = [],
  queryKey,
  defaultValue = '',
  showAll = true,
  isLoading = false,
}) => {
  const { set, get, remove } = useQueryParams();

  const currentValue = get(queryKey) || defaultValue;

  const onChangeHandle = (value: string) => {
    if (!value) {
      remove(queryKey);
      return;
    }

    set(queryKey, value);
  };

  const allOptions = showAll
    ? [{ label: 'Barchasi', value: '' }, ...options]
    : options;

  return (
    <Select 
      className={styles['select-list']}
      value={currentValue}
      options={allOptions} 
      onChange={onChangeHandle}
      disabled={isLoading}
    />
  );
}

export default SelectList;