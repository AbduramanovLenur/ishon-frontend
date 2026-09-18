import type { FC } from "react";
import { Select, type SelectProps } from "antd";
import { useTranslation } from "react-i18next";

import { useQueryParams } from "../../lib";

import styles from "./SelectList.module.scss";

interface ISelectListProps {
  options: SelectProps['options'];
  queryKey: string;
  defaultValue?: string | null;
  showAll?: boolean;
  isLoading?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  currentValue?: string;
};

const SelectList: FC<ISelectListProps> = ({
  options = [],
  queryKey,
  defaultValue = '',
  showAll = true,
  isLoading = false,
  onChange,
  className = '',
  currentValue = ''
}) => {
  const { t } = useTranslation();
  const { set, remove } = useQueryParams();

  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
      return;
    }

    if (!value) {
      remove(queryKey);
      return;
    }

    set(queryKey, value);
  };

  const allOptions = showAll
    ? [{ label: t("common.all"), value: '' }, ...options]
    : options;

  return (
    <Select
      className={`${styles['select-list']} ${className}`}
      defaultValue={defaultValue}
      value={currentValue}
      options={allOptions}
      onChange={handleChange}
      disabled={isLoading}
    />
  );
}

export default SelectList;
