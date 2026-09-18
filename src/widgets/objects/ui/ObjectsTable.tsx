import type { FC } from "react";
import { Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { useDeleteObject } from "@features/delete-object-modal";
import { ViewObjectModal, open as openViewModal } from "@features/view-object-modal";
import { ManageObjectModal, open as openManageModal } from "@features/manage-object-modal";
import { useObjectList, useObjectExcel, type IObject } from "@entities/objects";
import { ActionsDropdown, ExportExcelButton, Paginator, SearchInput } from "@shared/ui";
import { defaultValues, queries, status } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import { downloadBlob, formatHoursMinutes, getFirstChar, validationPage } from "@shared/utils";

import styles from "./ObjectsTable.module.scss";

export const ObjectsTable: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useObjectList(search, currentPage);
  const { data: excelData, isLoading: isExcelLoading } = useObjectExcel(search);
  const { confirmDelete } = useDeleteObject();

  const tableData = data?.content || [];
  const totalRecords = data?.totalElements || 0;

  const handleOpenManageModal = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const handleOpenViewModal = (id: number | string) => {
    dispatch(openViewModal(id));
  }

  const handleExportExcel = () => {
    if (!excelData) return;
    downloadBlob(excelData, "obyektlar.xlsx");
  };

  const columns: TableProps<IObject>['columns'] = [
    {
      title: t("objects.name"),
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
      title: t("objects.address"),
      render: (_, record) => record?.address
    },
    {
      title: t("objects.workHours"),
      width: 200,
      render: (_, record) => `${formatHoursMinutes(record?.shiftStartTime)} - ${formatHoursMinutes(record?.shiftEndTime)}`
    },
    {
      title: t("common.status"),
      width: 120,
      render: (_, record) => (
        record?.status === status.ACTIVE ? (
          <Tag color={'#D9DFF5'} style={{ color: '#4F46E5' }}>{t("common.active")}</Tag>
        ) : (
          <Tag color={'#DCE2F3'} style={{ color: '#464555' }}>{t("common.inactive")}</Tag>
        )
      )
    },
    {
      title: t("common.actions"),
      width: 100,
      render: (_, record) => (
        <ActionsDropdown 
          delete={{ 
            onClick: () => confirmDelete(record?.objectId)
          }}
          edit={{
            onClick: () => handleOpenManageModal(record?.objectId)
          }}
        />
      )
    }
  ];

  return (
    <div className={styles['objects-table']}>
      <div className={styles['objects-table__top']}>
        <SearchInput placeholder={t("objects.search")} />
        <ExportExcelButton
          onExport={handleExportExcel}
          disabled={isExcelLoading || !excelData}
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
              handleOpenViewModal(record?.objectId);
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
      {defaultValues.pageSize < totalRecords && <div className={styles['objects-table__bottom']}>
        <Paginator total={totalRecords} />
      </div>}
      <ManageObjectModal />
      <ViewObjectModal />
    </div>
  );
}
