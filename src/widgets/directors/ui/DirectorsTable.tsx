import type { FC } from "react";

import { Paginator, SearchInput } from "@shared/ui";

import styles from "./DirectorsTable.module.scss";
import { Table } from "antd";

export const DirectorsTable: FC = () => {
  const openViewModalHandle = (id: number | string) => {
    console.log(id)
  }

  return (
    <div className={styles['directors-table']}>
      <div className={styles['directors-table__top']}>
        <SearchInput placeholder="Direktorlarni qidirish..." />
      </div>
      <div className={styles['directors-table__middle']}>
        <Table 
          classNames={{
            header: {
              cell: styles['directors-table__title-cell']
            }
          }}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record.id);
            }
          })}
          // dataSource={dataSource}
          // columns={columns}
          pagination={false}
          loading={false}
          scroll={{ x: 'max-content' }}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div className={styles['directors-table__bottom']}>
        <Paginator total={50} />
      </div>
    </div>
  );
}
