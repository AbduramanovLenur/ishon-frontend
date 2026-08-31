import type { FC } from "react";
import { Pagination, type PaginationProps } from 'antd';

import { useQueryParams } from "../../lib/useQueryParams";
import { queries } from "../../config";

interface IPaginationProps {
  total: number;
  defaultCurrent?: number;
  align?: 'start' | 'center' | 'end',
  pageSize?: number,
};

const Paginator: FC<IPaginationProps> = ({ total,  defaultCurrent = 0, align = 'center', pageSize = 10 }) => {
  const { set, get } = useQueryParams();
  const page = Number(get(queries.PAGE));
  const current = page >= 0 ? page + 1 : 1;
  
  const onChangeHandle: PaginationProps['onChange'] = (page) => {
    set(queries.PAGE, page - 1);
  };

  return (
    <Pagination 
      align={align}
      defaultCurrent={defaultCurrent} 
      total={total}
      current={current}
      onChange={onChangeHandle}
      pageSize={pageSize}
    />
  );
}

export default Paginator;