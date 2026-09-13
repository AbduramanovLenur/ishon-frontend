import type { FC } from "react";
import { DatePicker, type DatePickerProps } from "antd";
import dayjs from "dayjs";

import { useQueryParams } from "@shared/lib";
import { defaultValues, queries } from "@shared/config";

interface IDateFilterProps {
  className?: string;
}

const DateFilter: FC<IDateFilterProps> = ({ className = "" }) => {
  const { get, set, remove } = useQueryParams();
  const value = get(queries.DATE) ?? defaultValues.date;

  const onChangeHandle: DatePickerProps["onChange"] = (date) => {
    if (!date || Array.isArray(date)) {
      remove(queries.DATE);
      return;
    }

    set(queries.DATE, date.format("DD-MM-YYYY"));
  };

  return (
    <DatePicker
      className={className}
      placeholder="Sana tanlang"
      onChange={onChangeHandle}
      format="DD-MM-YYYY"
      value={value ? dayjs(value, "DD-MM-YYYY") : null}
    />
  );
};

export default DateFilter;