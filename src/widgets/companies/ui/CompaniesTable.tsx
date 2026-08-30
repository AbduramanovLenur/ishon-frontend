import type { FC } from "react";
import { Table, type TableProps } from "antd";
import { useDispatch } from "react-redux";

import { useDeleteCompany } from "@/features/delete-company-modal";
import { ManageCompanyModal } from "@features/manage-company-modal";
import { open } from "@features/manage-company-modal/model/manageCompanySlice";
// import { useQueryParams } from "@shared/lib";
// import { queries } from "@shared/config";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { getFirstChar } from "@shared/utils";

import styles from "./CompaniesTable.module.scss";

interface DataType {
  id: number;
  company: string;
  address: string;
  objects: number;
  employees: number;
}

const dataSource: DataType[] = [
  {
    id: 1,
    company: 'Acme Corp',
    address: '123 Innovation Dr, Tech City',
    objects: 32,
    employees: 40,
  },
  {
    id: 2,
    company: 'Acme Corp',
    address: '123 Innovation Dr, Tech City',
    objects: 32,
    employees: 2,
  },
];

const CompaniesTable: FC = () => {
  // const { get } = useQueryParams();
  // const search = get(queries.SEARCH);
  // const currentPage = get(queries.PAGE);
  const dispatch = useDispatch();
  const { confirmDelete, contextHolder } = useDeleteCompany();

  const openManageModalHandle = (id: number) => {
    dispatch(open(id));
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'KOMPANIYS NOMI',
      width: 350,
      render: (_, record) => (
        <span className={styles['companies-table__badge-cell']}>
          <span>
            { getFirstChar(record.company) }
          </span>
          <span>
            { record.company }
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
      // width: '15%',
      render: (_, record) => record.objects,
    },
    {
      title: 'Xodimlar',
      // width: '15%',
      render: (_, record) => record.employees,
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
        <Table<DataType>
          classNames={{
            header: {
              cell: styles['companies-table__title-cell']
            }
          }}
          rowKey="id"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={false}
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