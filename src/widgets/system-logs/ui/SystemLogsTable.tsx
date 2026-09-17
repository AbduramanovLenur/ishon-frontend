import type { FC } from "react";
import { Image, Progress, Table, Tag, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";

import { useSystemLogList, type IEmployeeEvent } from "@entities/system-logs";
import { useManualObjectList } from "@entities/objects";
import { DateRangeFilter, ExportExcelButton, Paginator, SearchInput, SelectList } from "@shared/ui";
import { defaultValues, eventTypes, queries, routes } from "@shared/config";
import { exportToExcel, useQueryParams } from "@shared/lib";
import type { ExportColumn } from "@shared/types";
import { formatDate, formatTime, validationPage } from "@shared/utils";

import styles from "./SystemLogsTable.module.scss";

export const SystemLogsTable: FC = () => {
  const navigate = useNavigate();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const objectId = get(queries.OBJECT) || defaultValues.object;
  const dateFrom = get(queries.DATE_FROM) || defaultValues.dateFrom;
  const dateTo = get(queries.DATE_TO) || defaultValues.dateTo;
  const { data, isLoading } = useSystemLogList(search, currentPage, objectId, dateFrom, dateTo);
  const { data: objectDate, isLoading: isLoadingObject } = useManualObjectList(true);

  const objectList = objectDate?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const openViewHandle = (id: number | string) => {
    navigate(routes.SINGLE_EMPLOYEE(id));
  }

  const exportColumns: ExportColumn<IEmployeeEvent>[] = [
    { 
      header: "Surat", 
      accessor: (row) => row.photoUrl, 
      isImage: true 
    },
    {
      header: "Sana",
      accessor: (row) => formatDate(row.eventTime),
    },
    {
      header: "Vaqt",
      accessor: (row) => formatTime(row.eventTime),
    },
    { header: "Ism-familiya", accessor: (row) => row.fullName || "Noma'lum xodim" },
    {
      header: "Koordinatalar",
      accessor: (row) => `${row.latitude}, ${row.longitude}`,
    },
    {
      header: "Obyekt nomi",
      accessor: (row) => row.object?.name || "Noma'lum obyekt",
    },
    {
      header: "Harakat",
      accessor: (row) =>
        row.eventType === eventTypes.ENTER ? "Keldi" : "Ketdi",
    },
    { 
      header: "Aniqlik", 
      accessor: (row) => row.similarity 
    },
  ];

  const columns: TableProps<IEmployeeEvent>['columns'] = [
    {
      title: "Surat",
      render: (_, record) => (
        <Image
          className={styles['system-logs-table__ava']}
          src={record?.photoUrl}
          loading="lazy"
          width={40}
          height={40}
          alt={record?.fullName}
          onClick={(event) => event.stopPropagation()}
        />
      )
    },
    {
      title: "Sana va vaqt",
      render: (_, record) => (
        <div className={styles['system-logs-table__info']}>
          <div className={styles['system-logs-table__date']}>
            { formatDate(record?.eventTime) }
          </div>
          <div className={styles['system-logs-table__time']}>
            { formatTime(record?.eventTime) }
          </div>
        </div>
      )
    },
    {
      title: "Ism-familiya",
      width: 200,
      render: (_, record) => (
        record?.fullName ? 
        record?.fullName : 
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
          { record?.latitude }, { record?.longitude }
        </Tag>
      )
    },
    {
      title: "Obyekt nomi",
      width: 250,
      render: (_, record) => (
        record?.object?.name ? 
        record?.object.name : 
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
        record?.eventType === eventTypes.ENTER ? 
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
      width: 150,
      render: (_, record) => <Progress percent={record?.similarity} />
    }
  ];
  
  return (
    <div className={styles['system-logs-table']}>
      <div className={styles['system-logs-table__top']}>
        <SearchInput placeholder="Xodimlarni qidirish..." />
        <div className={styles['system-logs-table__wrapper']}>
          <DateRangeFilter 
            currentFromValue={dateFrom}
            currentToValue={dateTo}
          />
          <SelectList
            className={styles['system-logs-table__object-filter']}
            options={objectList}
            queryKey={queries.OBJECT}
            defaultValue={defaultValues.object}
            currentValue={objectId}
            isLoading={isLoadingObject}
          />
          <ExportExcelButton
            onExport={() =>
              exportToExcel({
                data: dataSource,
                columns: exportColumns,
                fileName: "kirish-jurnali",
                sheetName: "Kirish jurnali",
              })
            }
          />
        </div>
      </div>
      <div className={styles['system-logs-table__middle']}>
        <Table<IEmployeeEvent>
          classNames={{
            header: {
              cell: styles['system-logs-table__title-cell']
            }
          }}
          rowKey="eventId"
          onRow={(record) => ({
            onClick: (event) => {
              const target = event.target as HTMLElement;

              if (target.closest(".ant-image-preview")) {
                return;
              }

              openViewHandle(record?.employeeId);
            },
            style: {
              cursor: 'pointer'
            }
          })}
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
