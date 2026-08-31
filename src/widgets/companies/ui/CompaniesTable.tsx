import type { FC } from "react";
import { Table, type TableProps } from "antd";
import { useDispatch } from "react-redux";

import { useDeleteCompany } from "@features/delete-company-modal";
import { ManageCompanyModal, type ICompany } from "@features/manage-company-modal";
import { open } from "@features/manage-company-modal";
import { useCompanyList } from "@entities/companies";
import { useQueryParams } from "@shared/lib";
import { queries } from "@shared/config";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { getFirstChar } from "@shared/utils";

import styles from "./CompaniesTable.module.scss";

const CompaniesTable: FC = () => {
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || '';
  const currentPage = Number(get(queries.PAGE) || 1);
  const { data, isLoading } = useCompanyList(search, currentPage);
  const dispatch = useDispatch();
  const { confirmDelete, contextHolder } = useDeleteCompany();

  const dataSource = data?.content || [];

  const openManageModalHandle = (id: number | string) => {
    dispatch(open(id));
  }

  const columns: TableProps<ICompany>['columns'] = [
    {
      title: 'KOMPANIYS NOMI',
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
      width: 350,
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
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <div className={styles['companies-table__bottom']}>
        <Paginator total={dataSource.length} />
      </div>
      {contextHolder}
      <ManageCompanyModal />
    </div>
  );
}

export default CompaniesTable;