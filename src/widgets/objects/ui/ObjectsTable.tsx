import type { FC } from "react";
import { Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";

import { useDeleteObject } from "@features/delete-object-modal";
import { ManageObjectModal, open as openManageModal } from "@features/manage-object-modal";
import { useObjectList, type IObject } from "@entities/objects";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { defaultValues, queries, status } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import { getFirstChar, validationPage } from "@shared/utils";

import styles from "./ObjectsTable.module.scss";

const objectsMock: IObject[] = [
  {
    objectId: "3fa85f64-5717-4562-b3fc-2c963f66afa1",
    companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Главный офис",
    status: "ACTIVE",
    address: "г. Ташкент, ул. Амира Темура, 108",
    latitude: "41.311151",
    longitude: "69.279737",
    geofenceRadiusMeters: 200,
    shiftStartTime: "09:00",
    shiftEndTime: "18:00",
    lateEntryGraceMinutes: 15,
    earlyLeaveGraceMinutes: 15,
    createdAt: "2026-09-01T09:00:00.000Z",
    updatedAt: "2026-09-01T09:00:00.000Z",
  },
  {
    objectId: "3fa85f64-5717-4562-b3fc-2c963f66afa2",
    companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Филиал №1",
    status: "ACTIVE",
    address: "г. Ташкент, ул. Шота Руставели, 45",
    latitude: "41.285680",
    longitude: "69.250320",
    geofenceRadiusMeters: 150,
    shiftStartTime: "08:30",
    shiftEndTime: "17:30",
    lateEntryGraceMinutes: 10,
    earlyLeaveGraceMinutes: 10,
    createdAt: "2026-09-02T10:30:00.000Z",
    updatedAt: "2026-09-02T10:30:00.000Z",
  },
  {
    objectId: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
    companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Склад",
    status: "INACTIVE",
    address: "г. Ташкент, ул. Бектемир, 12",
    latitude: "41.232450",
    longitude: "69.334120",
    geofenceRadiusMeters: 300,
    shiftStartTime: "08:00",
    shiftEndTime: "17:00",
    lateEntryGraceMinutes: 15,
    earlyLeaveGraceMinutes: 15,
    createdAt: "2026-09-03T08:15:00.000Z",
    updatedAt: "2026-09-03T08:15:00.000Z",
  },
  {
    objectId: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
    companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Производственный цех",
    status: "ACTIVE",
    address: "г. Ташкент, ул. Янги Сергели, 25",
    latitude: "41.214780",
    longitude: "69.212340",
    geofenceRadiusMeters: 500,
    shiftStartTime: "07:30",
    shiftEndTime: "16:30",
    lateEntryGraceMinutes: 20,
    earlyLeaveGraceMinutes: 20,
    createdAt: "2026-09-04T07:00:00.000Z",
    updatedAt: "2026-09-04T07:00:00.000Z",
  },
  {
    objectId: "3fa85f64-5717-4562-b3fc-2c963f66afa5",
    companyId: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
    name: "Региональный офис",
    status: "ACTIVE",
    address: "г. Самарканд, ул. Регистан, 10",
    latitude: "39.654200",
    longitude: "66.959700",
    geofenceRadiusMeters: 250,
    shiftStartTime: "09:00",
    shiftEndTime: "18:00",
    lateEntryGraceMinutes: 15,
    earlyLeaveGraceMinutes: 15,
    createdAt: "2026-09-04T09:00:00.000Z",
    updatedAt: "2026-09-04T09:00:00.000Z",
  },
];

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
    console.log(id);
    // dispatch(openViewModal(id));
  }

  const columns: TableProps<IObject>['columns'] = [
    {
      title: "Obyekt nomi",
      width: 350,
      render: (_, record) => (
        <span className={styles['objects-table__badge-cell']}>
          <span>
            { getFirstChar(record.name) }
          </span>
          <span>
            { record.name }
          </span>
        </span>
      )
    },
    {
      title: "Manzil",
      render: (_, record) => record.address
    },
    {
      title: "Ish soatlari",
      width: 200,
      render: (_, record) => `${record.shiftStartTime} - ${record.shiftEndTime}`
    },
    {
      title: 'Holat',
      width: 120,
      render: (_, record) => (
        
        record.status === status.ACTIVE ? (
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
            onClick: () => confirmDelete(record.objectId)
          }}
          edit={{
            onClick: () => openManageModalHandle(record.objectId)
          }}
        />
      )
    }
  ];

  return (
    <div className={styles['objects-table']}>
      <div className={styles['objects-table__top']}>
        <SearchInput placeholder="Obyektlarni qidirish..." />
      </div>
      <div className={styles['objects-table__middle']}>
        <Table<IObject>
          classNames={{
            header: {
              cell: styles['objects-table__title-cell']
            }
          }}
          rowKey="companyOwnerId"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record.objectId);
            },
            style: { 
              cursor: 'pointer' 
            }
          })}
          dataSource={dataSource.length ? dataSource : objectsMock}
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
    </div>
  );
}
