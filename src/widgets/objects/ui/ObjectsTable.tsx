import type { FC } from "react";
import { Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";

import { useDeleteObject } from "@features/delete-object-modal";
import { ViewObjectModal, open as openViewModal } from "@features/view-object-modal";
import { ManageObjectModal, open as openManageModal } from "@features/manage-object-modal";
import { ExportExcelButton } from "@features/export-excel";
import { useObjectList, type IObject } from "@entities/objects";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { defaultValues, queries, status } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import type { ExportColumn } from "@shared/types";
import { formatDate, formatHoursMinutes, getFirstChar, validationPage } from "@shared/utils";

import styles from "./ObjectsTable.module.scss";

export const ObjectsTable: FC = () => {
  const dispatch = useDispatch();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useObjectList(search, currentPage);
  const { confirmDelete } = useDeleteObject();

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const openManageModalHandle = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const openViewModalHandle = (id: number | string) => {
    dispatch(openViewModal(id));
  }

  const exportColumns: ExportColumn<IObject>[] = [
    { 
      header: "Obyekt nomi", 
      accessor: (row) => row.name 
    },
    { 
      header: "Manzil", 
      accessor: (row) => row.address 
    },
    {
      header: "Ish boshlash",
      accessor: (row) => formatHoursMinutes(row.shiftStartTime),
    },
    {
      header: "Ish tugash",
      accessor: (row) => formatHoursMinutes(row.shiftEndTime),
    },
    {
      header: "Holat",
      accessor: (row) =>
        row.status === status.ACTIVE ? "Faol" : "Faol emas",
    },
    {
      header: "Yaratilgan sana",
      accessor: (row) => formatDate(row.createdAt),
    },
  ];

  const columns: TableProps<IObject>['columns'] = [
    {
      title: "Obyekt nomi",
      width: 350,
      render: (_, record) => (
        <span className={styles['objects-table__badge-cell']}>
          <span>
            { getFirstChar(record?.name) }
          </span>
          <span>
            { record?.name }
          </span>
        </span>
      )
    },
    {
      title: "Manzil",
      render: (_, record) => record?.address
    },
    {
      title: "Ish soatlari",
      width: 200,
      render: (_, record) => `${formatHoursMinutes(record?.shiftStartTime)} - ${formatHoursMinutes(record?.shiftEndTime)}`
    },
    {
      title: 'Holat',
      width: 120,
      render: (_, record) => (
        
        record?.status === status.ACTIVE ? (
          <Tag color={'#D9DFF5'} style={{ color: '#4F46E5' }}>Faol</Tag>
        ) : (
          <Tag color={'#DCE2F3'} style={{ color: '#464555' }}>Faol emas</Tag>
        )
      )
    },
    {
      title: 'Harakatlar',
      width: 100,
      render: (_, record) => (
        <ActionsDropdown 
          delete={{ 
            onClick: () => confirmDelete(record?.objectId)
          }}
          edit={{
            onClick: () => openManageModalHandle(record?.objectId)
          }}
        />
      )
    }
  ];

  return (
    <div className={styles['objects-table']}>
      <div className={styles['objects-table__top']}>
        <SearchInput placeholder="Obyektlarni qidirish..." />
        <ExportExcelButton
          data={dataSource}
          columns={exportColumns}
          fileName="obyektlar"
          sheetName="Obyektlar"
        />
      </div>
      <div className={styles['objects-table__middle']}>
        <Table<IObject>
          classNames={{
            header: {
              cell: styles['objects-table__title-cell']
            }
          }}
          rowKey="objectId"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record?.objectId);
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
      {defaultValues.pageSize < totalElems && <div className={styles['objects-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
      <ManageObjectModal />
      <ViewObjectModal />
    </div>
  );
}
