import { useEffect, type FC } from "react";
import { Image, Table, Tag, type TableProps } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { useTodaysPresenceList, useTodaysPresenceExcel, type IEmployee } from "@entities/todays-presence";
import { ExportExcelButton, Paginator, SearchInput } from "@shared/ui";
import { defaultValues, queries, routes, workStatus } from "@shared/config";
import { downloadBlob, useQueryParams } from "@shared/lib";
import type { TWorkStatus } from "@shared/types";
import { formatDateToDisplay, formatTime, validationPage } from "@shared/utils";

import styles from "./TodaysPresenceTable.module.scss";

const TodaysPresenceTable: FC = () => {
  const navigate = useNavigate();
  const { get, set } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const statusWork = (get(queries.STATUS_WORK) || defaultValues.statusWork) as TWorkStatus;
  const objectId = get(queries.OBJECT) || defaultValues.object;
  const date = get(queries.DATE) || defaultValues.date;
  const { data, isLoading } = useTodaysPresenceList(search, currentPage, statusWork, objectId, date);
  const { data: dataExcel, isLoading: isLoadingExcel } = useTodaysPresenceExcel(statusWork, objectId, date, search);

  const dataSource = data?.employees?.content || [];
  const totalElems = data?.employees?.totalElements || 0;

  useEffect(() => {
    if (!statusWork) {
      set(queries.STATUS_WORK, workStatus.AT_WORK);
    }

    if (!date) {
      set(queries.DATE, dayjs().format("DD-MM-YYYY"));
    }
  }, [date, set, statusWork]);

  const openViewHandle = (id: number | string) => {
    navigate(routes.SINGLE_EMPLOYEE(id));
  }

  const handleExportExcel = () => {
    if (!dataExcel) return;
    downloadBlob(dataExcel, "bugungi-davomat.xlsx");
  };

  const columns: TableProps<IEmployee>['columns'] = [
    {
      title: "Surat",
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
      title: "Ism-familiya",
      render: (_, record) => record?.fullName
    },
    {
      title: "Lavozimi",
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
      title: "Obyekt nomi",
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
            title: "Kirish vaqti",
            render: (_: unknown, record: IEmployee) =>
              formatTime(record?.checkInTime),
          },
        ]
      : []),
    ...(statusWork === workStatus.LEFT
      ? [
          {
            title: "Chiqish vaqti",
            render: (_: unknown, record: IEmployee) =>
              formatTime(record?.checkOutTime),
          },
        ]
      : []),
    ...(statusWork === workStatus.NOT_CHECKED_IN
      ? [
          {
            title: "Oxirgi ko‘rilgan sana",
            render: (_: unknown, record: IEmployee) =>
              formatDateToDisplay(record?.lastSeenDate),
          },
        ]
      : []),
  ];

  return (
    <div className={styles['todays-presence-table']}>
      <div className={styles['todays-presence-table__top']}>
        <SearchInput placeholder="Xodimlarni qidirish..." />
        <ExportExcelButton
          onExport={handleExportExcel}
          disabled={isLoadingExcel || !dataExcel}
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
      {defaultValues.pageSize < totalElems && <div className={styles['todays-presence-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
    </div>
  );
}

export default TodaysPresenceTable;