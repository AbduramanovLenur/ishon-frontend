import type { FC } from "react";
import { Image, Progress, Table, Tag, type TableProps } from "antd";

import { useSystemLogList, type IEmployeeEvent } from "@entities/system-logs";
import { Paginator, SearchInput } from "@shared/ui";
import { defaultValues, eventTypes, queries } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import { formatDate, formatTime, validationPage } from "@shared/utils";

import styles from "./SystemLogsTable.module.scss";

export const SystemLogsTable: FC = () => {
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useSystemLogList(search, currentPage);

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const columns: TableProps<IEmployeeEvent>['columns'] = [
    {
      title: "Surat",
      render: (_, record) => (
        <Image
          className={styles['system-logs-table__ava']}
          src={record.photoUrl}
          loading="lazy"
          width={40}
          height={40}
          alt={record.fullName}
        />
      )
    },
    {
      title: "Sana va vaqt",
      render: (_, record) => (
        <div className={styles['system-logs-table__info']}>
          <div className={styles['system-logs-table__date']}>
            { formatDate(record.eventTime) }
          </div>
          <div className={styles['system-logs-table__time']}>
            { formatTime(record.eventTime) }
          </div>
        </div>
      )
    },
    {
      title: "Ism-familiya",
      width: 200,
      render: (_, record) => (
        record.fullName ? 
        record.fullName : 
        <Tag 
          color={'#fff7e6'} 
          style={{ color: '#d46b08' }}
        >
          Noma’lum xodim
        </Tag>
      )
    },
    {
      title: "Koordinatalar",
      render: (_, record) => (
        <Tag 
          color={'#D9DFF5'} 
          style={{ color: '#4F46E5' }}
        >
          { record.latitude }, { record.longitude }
        </Tag>
      )
    },
    {
      title: "Obyekt nomi",
      width: 250,
      render: (_, record) => (
        record.object?.name ? 
        record.object.name : 
        <Tag 
          color={'#fff7e6'} 
          style={{ color: '#d46b08' }}
        >
          Noma’lum obyekt
        </Tag>
      )
    },
    {
      title: "Harakat",
      render: (_, record) => (
        record.eventType === eventTypes.ENTER ? 
        <Tag 
          color={"#f6ffed"} 
          style={{ color: '#389e0d' }}
        >
          Keldi
        </Tag> : 
        <Tag 
          color={"#e6f4ff"} 
          style={{ color: '#1677ff' }}
        >
          Ketdi
        </Tag>
      )
    },
    {
      title: "Aniqlik",
      render: (_, record) => <Progress percent={record.similarity} />
    }
  ];
  
  return (
    <div className={styles['system-logs-table']}>
      <div className={styles['system-logs-table__top']}>
        <SearchInput placeholder="Xodimlarni qidirish..." />
      </div>
      <div className={styles['system-logs-table__middle']}>
        <Table<IEmployeeEvent>
          classNames={{
            header: {
              cell: styles['system-logs-table__title-cell']
            }
          }}
          rowKey="eventId"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {defaultValues.pageSize < totalElems && <div className={styles['system-logs-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
    </div>
  );
}
