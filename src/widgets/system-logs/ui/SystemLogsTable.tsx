import type { FC } from "react";
import { Image, Progress, Table, Tag, type TableProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useSystemLogList, useSystemLogsExcel, type IEmployeeEvent } from "@entities/system-logs";
import { useManualObjectList } from "@entities/objects";
import { DateRangeFilter, ExportExcelButton, Paginator, SearchInput, SelectList } from "@shared/ui";
import { defaultValues, eventTypes, queries, routes } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import { downloadBlob, formatDate, formatTime, validationPage } from "@shared/utils";

import styles from "./SystemLogsTable.module.scss";

export const SystemLogsTable: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const objectId = get(queries.OBJECT) || defaultValues.object;
  const dateFrom = get(queries.DATE_FROM) || defaultValues.dateFrom;
  const dateTo = get(queries.DATE_TO) || defaultValues.dateTo;
  const { data, isLoading } = useSystemLogList(search, currentPage, objectId, dateFrom, dateTo);
  const { data: excelData, isLoading: isExcelLoading } = useSystemLogsExcel(search, objectId, dateFrom, dateTo);
  const { data: objectData, isLoading: isObjectLoading } = useManualObjectList(true);

  const objectList = objectData?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  const tableData = data?.content || [];
  const totalRecords = data?.totalElements || 0;

  const handleOpenView = (id: number | string) => {
    navigate(routes.SINGLE_EMPLOYEE(id));
  }

  const handleExportExcel = () => {
    if (!excelData) return;
    downloadBlob(excelData, "kirish-jurnali.xlsx");
  };

  const columns: TableProps<IEmployeeEvent>['columns'] = [
    {
      title: t("employees.photo"),
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
      title: t("logs.dateTime"),
      render: (_, record) => (
        <div className={styles['system-logs-table__info']}>
          <div className={styles['system-logs-table__date']}>
            { formatDate(record?.eventTime, t) }
          </div>
          <div className={styles['system-logs-table__time']}>
            { formatTime(record?.eventTime, i18n.language) }
          </div>
        </div>
      )
    },
    {
      title: t("employees.fullName"),
      width: 200,
      render: (_, record) => (
        record?.fullName ?
        record?.fullName :
        <Tag
          color={'#fff7e6'}
          style={{ color: '#d46b08' }}
        >
          {t("logs.unknownEmployee")}
        </Tag>
      )
    },
    {
      title: t("objects.coordinates"),
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
      title: t("objects.name"),
      width: 250,
      render: (_, record) => (
        record?.object?.name ?
        record?.object.name :
        <Tag
          color={'#fff7e6'}
          style={{ color: '#d46b08' }}
        >
          {t("employees.unknownObject")}
        </Tag>
      )
    },
    {
      title: t("logs.action"),
      render: (_, record) => (
        record?.eventType === eventTypes.ENTER ?
        <Tag
          color={"#f6ffed"}
          style={{ color: '#389e0d' }}
        >
          {t("logs.came")}
        </Tag> :
        <Tag
          color={"#e6f4ff"}
          style={{ color: '#1677ff' }}
        >
          {t("logs.left")}
        </Tag>
      )
    },
    {
      title: t("logs.accuracy"),
      width: 150,
      render: (_, record) => <Progress percent={record?.similarity} />
    }
  ];

  return (
    <div className={styles['system-logs-table']}>
      <div className={styles['system-logs-table__top']}>
        <SearchInput placeholder={t("employees.search")} />
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
            isLoading={isObjectLoading}
          />
          <ExportExcelButton
            onExport={handleExportExcel}
            disabled={isExcelLoading || !excelData}
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

              if (!record?.employeeId) {
                return;
              }

              handleOpenView(record.employeeId);
            },
            style: {
              cursor: record?.employeeId ? 'pointer' : 'default'
            }
          })}
          dataSource={tableData}
          columns={columns}
          pagination={false}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {defaultValues.pageSize < totalRecords && <div className={styles['system-logs-table__bottom']}>
        <Paginator total={totalRecords} />
      </div>}
    </div>
  );
}
