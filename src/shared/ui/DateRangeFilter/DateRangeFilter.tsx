import type { FC } from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";

import { queries } from "@shared/config";
import { useQueryParams } from "@shared/lib";

interface IDateRangeFilterProps {
  currentFromValue?: string;
  currentToValue?: string;
}

const DateRangeFilter: FC<IDateRangeFilterProps> = ({
  currentFromValue = "",
  currentToValue = "",
}) => {
  const { setMany } = useQueryParams();

  const onChangeHandle: RangePickerProps["onChange"] = (dates) => {
    const [from, to] = dates ?? [];

    setMany({
      [queries.DATE_FROM]: from
        ? from.format("DD-MM-YYYY")
        : null,
      [queries.DATE_TO]: to
        ? to.format("DD-MM-YYYY")
        : null,
    });
  };

  const value: [Dayjs | null, Dayjs | null] | null =
    currentFromValue || currentToValue
      ? [
          currentFromValue
            ? dayjs(currentFromValue, "DD-MM-YYYY")
            : null,
          currentToValue
            ? dayjs(currentToValue, "DD-MM-YYYY")
            : null,
        ]
      : null;

  return (
    <DatePicker.RangePicker
      placeholder={["Sana", "Sana"]}
      format="DD-MM-YYYY"
      onChange={onChangeHandle}
      value={value}
    />
  );
};

export default DateRangeFilter;