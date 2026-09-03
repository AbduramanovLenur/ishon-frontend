import type { FC } from "react";
import { Table, type TableProps, Tag } from "antd";
import { useDispatch } from "react-redux";

import { ResetPasswordCompanyOwnerModal } from "@features/reset-password-company-owner-modal";
import { useDeleteCompanyOwner } from "@features/delete-director-modal";
import { ManageDirectorModal, open as openManageModal  } from "@features/manage-director-modal";
import { open as openResetPasswordModal } from "@features/reset-password-company-owner-modal";
import { open as openViewModal, ViewCompanyOwnerModal } from "@features/view-company-owner-modal";
import { useCompanyOwnerList, type ICompanyOwner } from "@entities/directors";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { getFirstChar, validationPage } from "@shared/utils";
import { useQueryParams } from "@shared/lib";
import { defaultValues, queries } from "@shared/config";

import styles from "./DirectorsTable.module.scss";

export const DirectorsTable: FC = () => {
  const dispatch = useDispatch();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useCompanyOwnerList(search, currentPage);
  const { confirmDelete } = useDeleteCompanyOwner();

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const openManageModalHandle = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const openResetPasswordModalHandle = (id: number | string) => {
    dispatch(openResetPasswordModal(id));
  }

  const openViewModalHandle = (id: number | string) => {
    dispatch(openViewModal(id));
  }

  const columns: TableProps<ICompanyOwner>['columns'] = [
    {
      title: 'Kompaniya nomi',
      width: 300,
      render: (_, record) => (
        <span className={styles['directors-table__badge-cell']}>
          <span>
            { getFirstChar(record.fullName) }
          </span>
          <span>
            { record.fullName }
          </span>
        </span>
      ),
    },
    {
      title: 'Login',
      render: (_, record) => (
        <Tag 
          className={styles['directors-table__tag']}
          color={'#2db7f5'} 
          variant="solid"
        >
          {record.username}
        </Tag>
      ),
    },
    {
      title: 'Lavozimi',
      width: 200,
      render: (_, record) => record.position
    },
    {
      title: 'Kompaniya',
      width: 250,
      render: (_, record) => (
        <Tag 
          className={styles['directors-table__tag']}
          color={'#D9DFF5'} 
          variant="solid"
          style={{ color: "#5C6274" }}
        >
          {record.companyName}
        </Tag>
      ),
    },
    {
      title: 'Telefon raqami',
      render: (_, record) => record.phone
    },
    {
      title: 'Harakatlar',
      width: 100,
      render: (_, record) => (
        <ActionsDropdown 
          delete={{ 
            onClick: () => confirmDelete(record.companyOwnerId)
          }}
          edit={{
            onClick: () => openManageModalHandle(record.companyOwnerId)
          }}
          reset={{
            visible: true,
            onClick: () => openResetPasswordModalHandle(record.companyOwnerId)
          }}
        />
      )
    }
  ];

  return (
    <div className={styles['directors-table']}>
      <div className={styles['directors-table__top']}>
        <SearchInput placeholder="Direktorlarni qidirish..." />
      </div>
      <div className={styles['directors-table__middle']}>
        <Table<ICompanyOwner> 
          classNames={{
            header: {
              cell: styles['directors-table__title-cell']
            }
          }}
          rowKey="companyOwnerId"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record.companyOwnerId);
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
      {defaultValues.pageSize < totalElems && <div className={styles['directors-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
      <ManageDirectorModal />
      <ResetPasswordCompanyOwnerModal />
      <ViewCompanyOwnerModal />
    </div>
  );
}
