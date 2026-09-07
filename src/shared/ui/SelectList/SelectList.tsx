import type { FC } from "react";
import { Select, type SelectProps } from "antd";

import { useQueryParams } from "@shared/lib";
import { defaultValues, queries } from "@shared/config";

import styles from "./SelectList.module.scss";

interface ISelectListProps {
  options: SelectProps['options'];
  isLoading?: boolean;
};

const SelectList: FC<ISelectListProps> = ({ options, isLoading = false }) => {
  const { set, get } = useQueryParams();

  const objectId = get(queries.OBJECT) || defaultValues.object;

  const onChangeHandle = (value: string) => {
    set(queries.OBJECT, value);
  }

  return (
    <Select 
      className={styles['select-list']}
      value={objectId}
      options={options} 
      onChange={onChangeHandle}
      disabled={isLoading}
    />
  );
}

export default SelectList;