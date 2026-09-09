import type { FC } from "react";
import { Image, Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";
import { KeyOutlined } from "@ant-design/icons";

import { GrantAccessModal, open as openGrantAccessModal } from "@features/grant-access-modal";
import { useDeleteAccess } from "@features/delete-access-modal";
import { useDeleteEmployee } from "@features/delete-employee-modal";
import { useEmployeeList, type IEmployee } from "@entities/employees";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { defaultValues, queries, roles, status } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import { validationPage } from "@shared/utils";

import styles from "./EmployeesTable.module.scss";

const EmployeesTable: FC = () => {
  const dispatch = useDispatch();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data, isLoading } = useEmployeeList(search, currentPage);
  const { confirmDelete: confirmDeleteEmployee } = useDeleteEmployee();
  const { confirmDelete: confirmDeleteAccess } = useDeleteAccess();

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const openManageModalHandle = (id: number | string) => {
    // dispatch(openManageModal(id));
    console.log(id)
  }

  const openViewModalHandle = (id: number | string) => {
    // dispatch(openViewModal(id));
    console.log(id)
  }

  const openGrantAccessModalHandle = (id: number | string) => {
    dispatch(openGrantAccessModal(id));
  }

  const columns: TableProps<IEmployee>['columns'] = [
    {
      title: "Surat",
      render: (_, record) => (
        <Image
          className={styles['employees-table__ava']}
          src={record.fileUrl}
          loading="lazy"
          width={40}
          height={40}
          alt={record.fullName}
        />
      )
    },
    {
      title: "Ism-familiya",
      render: (_, record) => (
        <div className={styles['employees-table__name']}>
          {record.fullName}
          {record.type === roles.COMPANY_ADMIN && <KeyOutlined className={styles['employees-table__name-icon']} />}
        </div>
      )
    },
    {
      title: "Lavozimi",
      width: 220,
      render: (_, record) => (
        <Tag 
          color={'#D9DFF5'} 
          style={{ color: '#4F46E5', whiteSpace: 'normal' }}
        >
          { record.position }
        </Tag>
      )
    },
    {
      title: 'Telefon raqami',
      width: 220,
      render: (_, record) => record.phone
    },
    {
      title: "Obyekt nomi",
      width: 200,
      render: (_, record) => (
        <Tag 
          color={'#EEF2FF'} 
          style={{ color: '#6D5ACF', whiteSpace: 'normal' }}
        >
          { record.assignedObject.name }
        </Tag>
      )
    },
    {
      title: 'Holat',
      width: 100,
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
            onClick: () => confirmDeleteEmployee(record.employeeId) 
          }}
          edit={{
            onClick: () => openManageModalHandle(record.employeeId)
          }}
          access={{
            visible: record.type === roles.EMPLOYEE,
            onClick: () => openGrantAccessModalHandle(record.employeeId)
          }}
          reset={{
            visible: record.type === roles.COMPANY_ADMIN
          }}
          revoke={{
            visible: record.type === roles.COMPANY_ADMIN,
            onClick: () => confirmDeleteAccess(record.employeeId)
          }}
        />
      )
    }
  ]
  
  return (
    <div className={styles['employees-table']}>
      <div className={styles['employees-table__top']}>
        <SearchInput placeholder="Xodimlarni qidirish..." />
      </div>
      <div className={styles['employees-table__middle']}>
        <Table<IEmployee>
          classNames={{
            header: {
              cell: styles['companies-table__title-cell']
            }
          }}
          rowKey="employeeId"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record.employeeId);
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
      {defaultValues.pageSize < totalElems && <div className={styles['employees-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
      <GrantAccessModal />
    </div>
  );
}

export default EmployeesTable;