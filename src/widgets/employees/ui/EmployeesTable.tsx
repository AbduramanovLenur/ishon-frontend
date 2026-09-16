import type { FC } from "react";
import { Image, Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";
import { KeyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumberIntl } from 'react-phone-number-input';

import { ManageEmployeeModal, open as openManageModal } from "@features/manage-employee-modal";
import { ResetPasswordEmployeeModal, open as openResetPasswordModal } from "@features/reset-password-employee-modal";
import { GrantAccessModal, open as openGrantAccessModal } from "@features/grant-access-modal";
import { useDeleteAccess } from "@features/delete-access-modal";
import { useDeleteEmployee } from "@features/delete-employee-modal";
import { ExportExcelButton } from "@features/export-excel";
import { useEmployeeList, type IEmployee } from "@entities/employees";
import { ActionsDropdown, Paginator, SearchInput, SelectList } from "@shared/ui";
import { defaultValues, queries, roles, routes, status } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import type { ExportColumn } from "@shared/types";
import { validationPage } from "@shared/utils";

import styles from "./EmployeesTable.module.scss";
import { useManualObjectList } from "@/entities/objects";

const EmployeesTable: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const objectId = get(queries.OBJECT) || defaultValues.object;
  const { data, isLoading } = useEmployeeList(search, currentPage, objectId);
  const { data: objectDate, isLoading: isLoadingObject } = useManualObjectList(true);
  const { confirmDelete: confirmDeleteEmployee } = useDeleteEmployee();
  const { confirmDelete: confirmDeleteAccess } = useDeleteAccess();

  const objectList = objectDate?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const exportColumns: ExportColumn<IEmployee>[] = [
    { 
      header: "Surat", 
      accessor: (row) => row.fileUrl, isImage: true 
    },
    { 
      header: "Ism-familiya", 
      accessor: (row) => row.fullName 
    },
    { 
      header: "Lavozimi", 
      accessor: (row) => row.position 
    },
    { 
      header: "Telefon raqami", 
      accessor: (row) => formatPhoneNumberIntl(row.phone) },
    {
      header: "Obyekt nomi",
      accessor: (row) => row.assignedObject?.name || "Noma'lum obyekt",
    },
    {
      header: "Holat",
      accessor: (row) =>
        row.status === status.ACTIVE ? "Faol" : "Faol emas",
    },
  ];

  const openManageModalHandle = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const openViewHandle = (id: number | string) => {
    navigate(routes.SINGLE_EMPLOYEE(id));
  }

  const openGrantAccessModalHandle = (id: number | string) => {
    dispatch(openGrantAccessModal(id));
  }

  const openResetPasswordModalHandle = (id: number | string) => {
    dispatch(openResetPasswordModal(id));
  }

  const columns: TableProps<IEmployee>['columns'] = [
    {
      title: "Surat",
      render: (_, record) => (
        <Image
          className={styles['employees-table__ava']}
          src={record?.fileUrl}
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
      render: (_, record) => (
        <div className={styles['employees-table__name']}>
          {record?.fullName}
          {record?.type === roles.COMPANY_ADMIN && <KeyOutlined className={styles['employees-table__name-icon']} />}
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
          { record?.position }
        </Tag>
      )
    },
    {
      title: 'Telefon raqami',
      width: 220,
      render: (_, record) =>  formatPhoneNumberIntl(record?.phone)
    },
    {
      title: "Obyekt nomi",
      width: 200,
      render: (_, record) => (
        !record?.assignedObject?.name ? (
          <Tag 
            color={'#fff7e6'} 
            style={{ color: '#d46b08' }}
          >
            Noma’lum obyekt
          </Tag>
        ) : (
          <Tag 
            color={'#EEF2FF'} 
            style={{ color: '#6D5ACF', whiteSpace: 'normal' }}
          >
            { record.assignedObject.name }
          </Tag>
        )
      )
    },
    {
      title: 'Holat',
      width: 100,
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
            onClick: () => confirmDeleteEmployee(record?.employeeId) 
          }}
          edit={{
            onClick: () => openManageModalHandle(record?.employeeId)
          }}
          access={{
            visible: record?.type === roles.EMPLOYEE,
            onClick: () => openGrantAccessModalHandle(record?.employeeId)
          }}
          reset={{
            visible: record?.type === roles.COMPANY_ADMIN,
            onClick: () => openResetPasswordModalHandle(record?.employeeId)
          }}
          revoke={{
            visible: record?.type === roles.COMPANY_ADMIN,
            onClick: () => confirmDeleteAccess(record?.employeeId)
          }}
        />
      )
    }
  ];
  
  return (
    <div className={styles['employees-table']}>
      <div className={styles['employees-table__top']}>
        <SearchInput placeholder="Xodimlarni qidirish..." />
        <div className={styles['employees-table__wrapper']}>
          <SelectList
            className={styles['employees-table__object-filter']}
            options={objectList}
            queryKey={queries.OBJECT}
            defaultValue={defaultValues.object}
            currentValue={objectId}
            isLoading={isLoadingObject}
          />
          <ExportExcelButton
            data={dataSource}
            columns={exportColumns}
            fileName="xodimlar"
            sheetName="Xodimlar"
          />
        </div>
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
      {defaultValues.pageSize < totalElems && <div className={styles['employees-table__bottom']}>
        <Paginator total={totalElems} />
      </div>}
      <ManageEmployeeModal />
      <GrantAccessModal />
      <ResetPasswordEmployeeModal />
    </div>
  );
}

export default EmployeesTable;