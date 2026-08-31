import type { FC } from "react";
import { Pagination, type PaginationProps } from 'antd';

import { useQueryParams } from "../../lib/useQueryParams";
import { queries } from "../../config";

interface IPaginationProps {
  total: number;
  defaultCurrent?: number;
  align?: 'start' | 'center' | 'end'
};

const Paginator: FC<IPaginationProps> = ({ total,  defaultCurrent = 0, align = 'center' }) => {
  const { set, get } = useQueryParams();
  const current = Number(get(queries.PAGE) ?? 1);
  
  const onChangeHandle: PaginationProps['onChange'] = (page) => {
    set(queries.PAGE, page);
  };

  return (
    <Pagination 
      align={align}
      defaultCurrent={defaultCurrent} 
      total={total}
      current={current}
      onChange={onChangeHandle}
    />
  );
}

export default Paginator;