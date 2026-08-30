import {
  useRef,
  type ChangeEvent,
  type FC,
} from "react";
import { Input } from "antd";

import { queries } from "../../config";
import { useQueryParams } from "../../lib";

import styles from "./SearchInput.module.scss";

interface ISearchProps {
  placeholder: string;
  className?: string;
  paramKey?: string;
  delay?: number;
}

const SearchInput: FC<ISearchProps> = ({
  placeholder,
  className = '',
  paramKey = queries.SEARCH,
  delay = 500,
}) => {
  const { get, set, remove } = useQueryParams();

  const urlValue = get(paramKey) ?? "";

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(0);

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const next = value.trim();

      if (next) {
        set(paramKey, next);
      } else {
        remove(paramKey);
      }
    }, delay);
  };

  return (
    <Input.Search
      className={`${styles['search-input']} ${className}`}
      placeholder={placeholder}
      defaultValue={urlValue}
      onChange={onChangeHandle}
      allowClear
    />
  );
};

export default SearchInput;