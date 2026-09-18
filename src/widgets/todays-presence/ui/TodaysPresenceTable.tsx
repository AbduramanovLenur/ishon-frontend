import { useEffect, type FC } from "react";
import { Image, Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useTodaysPresenceList, useTodaysPresenceExcel, type IEmployee } from "@entities/todays-presence";
import { ExportExcelButton, Paginator, SearchInput } from "@shared/ui";
import { defaultValues, queries, routes, workStatus } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import type { TWorkStatus } from "@shared/types";
import { downloadBlob, formatDateToDisplay, formatTime, validationPage } from "@shared/utils";

import styles from "./TodaysPresenceTable.module.scss";

const TodaysPresenceTable: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { get, set } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const statusWork = (get(queries.STATUS_WORK) || defaultValues.statusWork) as TWorkStatus;
  const objectId = get(queries.OBJECT) || defaultValues.object;
  const date = get(queries.DATE) || defaultValues.date;
  const { data, isLoading } = useTodaysPresenceList(search, currentPage, statusWork, objectId, date);
  const { data: excelData, isLoading: isExcelLoading } = useTodaysPresenceExcel(statusWork, objectId, date, search);

  const tableData = data?.employees?.content || [];
  const totalRecords = data?.employees?.totalElements || 0;

  useEffect(() => {
    if (!statusWork) {
      set(queries.STATUS_WORK, workStatus.AT_WORK);
    }

    if (!date) {
      set(queries.DATE, dayjs().format("DD-MM-YYYY"));
    }
  }, [date, set, statusWork]);

  const handleOpenView = (id: number | string) => {
    navigate(routes.SINGLE_EMPLOYEE(id));
  }

  const handleExportExcel = () => {
    if (!excelData) return;
    downloadBlob(excelData, "bugungi-davomat.xlsx");
  };

  const columns: TableProps<IEmployee>['columns'] = [
    {
      title: t("employees.photo"),
      width: 50,
      render: (_, record) => (
        <Image
          className={styles['todays-presence-table__ava']}
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
      title: t("employees.fullName"),
      render: (_, record) => record?.fullName
    },
    {
      title: t("employees.position"),
      width: 200,
      render: (_, record) => (
        <Tag
          color={'#D9DFF5'}
          style={{ color: '#4F46E5', whiteSpace: 'normal' }}
        >
          { record?.position }
        </Tag>
      )
    },
    {
      title: t("objects.name"),
      width: 250,
      render: (_, record) => (
        <Tag
          color={'#f0f9ff'}
          style={{ color: '#0284c7', whiteSpace: 'normal' }}
        >
          { record?.objectName }
        </Tag>
      )
    },
    ...(statusWork === workStatus.AT_WORK
      ? [
          {
            title: t("todaysPresence.checkInTime"),
            render: (_: unknown, record: IEmployee) =>
              formatTime(record?.checkInTime, i18n.language),
          },
        ]
      : []),
    ...(statusWork === workStatus.LEFT
      ? [
          {
            title: t("todaysPresence.checkOutTime"),
            render: (_: unknown, record: IEmployee) =>
              formatTime(record?.checkOutTime, i18n.language),
          },
        ]
      : []),
    ...(statusWork === workStatus.NOT_CHECKED_IN
      ? [
          {
            title: t("todaysPresence.lastSeenDate"),
            render: (_: unknown, record: IEmployee) =>
              formatDateToDisplay(record?.lastSeenDate, t),
          },
        ]
      : []),
  ];

  return (
    <div className={styles['todays-presence-table']}>
      <div className={styles['todays-presence-table__top']}>
        <SearchInput placeholder={t("employees.search")} />
        <ExportExcelButton
          onExport={handleExportExcel}
          disabled={isExcelLoading || !excelData}
        />
      </div>
      <div className={styles['todays-presence-table__middle']}>
        <Table<IEmployee>
          classNames={{
            header: {
              cell: styles['todays-presence-table__title-cell']
            }
          }}
          rowKey="employeeId"
          onRow={(record) => ({
            onClick: (event) => {
              const target = event.target as HTMLElement;

              if (target.closest(".ant-image-preview")) {
                return;
              }

              handleOpenView(record?.employeeId);
            },
            style: {
              cursor: 'pointer'
            }
          })}
          dataSource={tableData}
          columns={columns}
          pagination={false}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      {defaultValues.pageSize < totalRecords && <div className={styles['todays-presence-table__bottom']}>
        <Paginator total={totalRecords} />
      </div>}
    </div>
  );
}

export default TodaysPresenceTable;
