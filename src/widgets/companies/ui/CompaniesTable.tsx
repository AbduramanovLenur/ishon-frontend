import type { FC } from "react";
import { Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";

import { useDeleteCompany } from "@features/delete-company-modal";
import { ManageCompanyModal } from "@features/manage-company-modal";
import { open as openManageModal } from "@features/manage-company-modal";
import { open as openViewModal, ViewCompanyModal } from "@features/view-company-modal";
import { useCompanyList, type ICompany } from "@entities/companies";
import { useQueryParams } from "@shared/lib";
import { defaultValues, queries, status } from "@shared/config";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { getFirstChar, validationPage } from "@shared/utils";

import styles from "./CompaniesTable.module.scss";

const CompaniesTable: FC = () => {
  const dispatch = useDispatch();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useCompanyList(search, currentPage);
  const { confirmDelete } = useDeleteCompany();

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const openManageModalHandle = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const openViewModalHandle = (id: number | string) => {
    dispatch(openViewModal(id));
  }

  const columns: TableProps<ICompany>['columns'] = [
    {
      title: 'Kompaniya nomi',
      width: 350,
      render: (_, record) => (
        <span className={styles['companies-table__badge-cell']}>
          <span>
            { getFirstChar(record.name) }
          </span>
          <span>
            { record.name }
          </span>
        </span>
      ),
    },
    {
      title: 'Manzil',
      width: 250,
      render: (_, record) => record.address,
    },
    {
      title: 'Obyektlar',
      render: (_, record) => record.objectLimit,
    },
    {
      title: 'Xodimlar',
      render: (_, record) => record.employeeLimit,
    },
    {
      title: 'Holat',
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
            onClick: () => confirmDelete(record.id) 
          }}
          edit={{
            onClick: () => openManageModalHandle(record.id)
          }}
        />
      )
    }
  ];

  return (
    <div className={styles['companies-table']}>
      <div className={styles['companies-table__top']}>
        <SearchInput placeholder="Kompaniyalarni qidirish..." />
      </div>
      <div className={styles['companies-table__middle']}>
        <Table<ICompany>
          classNames={{
            header: {
              cell: styles['companies-table__title-cell']
            }
          }}
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record.id);
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
      {defaultValues.pageSize < totalElems && <div className={styles['companies-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
      <ManageCompanyModal />
      <ViewCompanyModal />
    </div>
  );
}

export default CompaniesTable;