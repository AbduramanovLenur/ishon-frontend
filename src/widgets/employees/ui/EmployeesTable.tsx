import type { FC } from "react";
import { Image, Table, Tag, type TableProps } from "antd";
import { useDispatch } from "react-redux";
import { KeyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useTranslation } from "react-i18next";

import { ManageEmployeeModal, open as openManageModal } from "@features/manage-employee-modal";
import { ResetPasswordEmployeeModal, open as openResetPasswordModal } from "@features/reset-password-employee-modal";
import { GrantAccessModal, open as openGrantAccessModal } from "@features/grant-access-modal";
import { useDeleteAccess } from "@features/delete-access-modal";
import { useDeleteEmployee } from "@features/delete-employee-modal";
import { ActionsDropdown, ExportExcelButton, Paginator, SearchInput, SelectList } from "@shared/ui";
import { useEmployeeExcel, useEmployeeList, type IEmployee } from "@entities/employees";
import { useManualObjectList } from "@entities/objects";
import { defaultValues, queries, roles, routes, status } from "@shared/config";
import { useQueryParams } from "@shared/lib";
import { downloadBlob, validationPage } from "@shared/utils";

import styles from "./EmployeesTable.module.scss";

const EmployeesTable: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || defaultValues.search;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const objectId = get(queries.OBJECT) || defaultValues.object;
  const { data, isLoading } = useEmployeeList(search, currentPage, objectId);
  const { data: excelData, isLoading: isExcelLoading } = useEmployeeExcel(search, objectId);
  const { data: objectData, isLoading: isObjectLoading } = useManualObjectList(true);
  const { confirmDelete: confirmDeleteEmployee } = useDeleteEmployee();
  const { confirmDelete: confirmDeleteAccess } = useDeleteAccess();

  const objectList = objectData?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  const tableData = data?.content || [];
  const totalRecords = data?.totalElements || 0;

  const handleOpenManageModal = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const handleOpenView = (id: number | string) => {
    navigate(routes.SINGLE_EMPLOYEE(id));
  }

  const handleOpenGrantAccessModal = (id: number | string) => {
    dispatch(openGrantAccessModal(id));
  }

  const handleOpenResetPasswordModal = (id: number | string) => {
    dispatch(openResetPasswordModal(id));
  }

  const handleExportExcel = () => {
    if (!excelData) return;
    downloadBlob(excelData, "xodimlar.xlsx");
  };

  const columns: TableProps<IEmployee>['columns'] = [
    {
      title: t("employees.photo"),
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
      title: t("employees.fullName"),
      render: (_, record) => (
        <div className={styles['employees-table__name']}>
          {record?.fullName}
          {record?.type === roles.COMPANY_ADMIN && <KeyOutlined className={styles['employees-table__name-icon']} />}
        </div>
      )
    },
    {
      title: t("employees.position"),
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
      title: t("employees.phone"),
      width: 220,
      render: (_, record) =>  formatPhoneNumberIntl(record?.phone)
    },
    {
      title: t("objects.name"),
      width: 200,
      render: (_, record) => (
        !record?.assignedObject?.name ? (
          <Tag
            color={'#fff7e6'}
            style={{ color: '#d46b08' }}
          >
            {t("employees.unknownObject")}
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
      title: t("common.status"),
      width: 100,
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
            onClick: () => confirmDeleteEmployee(record?.employeeId)
          }}
          edit={{
            onClick: () => handleOpenManageModal(record?.employeeId)
          }}
          access={{
            visible: record?.type === roles.EMPLOYEE,
            onClick: () => handleOpenGrantAccessModal(record?.employeeId)
          }}
          reset={{
            visible: record?.type === roles.COMPANY_ADMIN,
            onClick: () => handleOpenResetPasswordModal(record?.employeeId)
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
        <SearchInput placeholder={t("employees.search")} />
        <div className={styles['employees-table__wrapper']}>
          <SelectList
            className={styles['employees-table__object-filter']}
            options={objectList}
            queryKey={queries.OBJECT}
            defaultValue={defaultValues.object}
            currentValue={objectId}
            isLoading={isObjectLoading}
          />
          <ExportExcelButton
            onExport={handleExportExcel}
            disabled={isExcelLoading || !excelData}
          />
        </div>
      </div>
      <div className={styles['employees-table__middle']}>
        <Table<IEmployee>
          classNames={{
            header: {
              cell: styles['employees-table__title-cell']
            }
          }}
          rowKey="employeeId"
          onRow={(record) => ({
            onClick: (event) => {
              const target = event.target as HTMLElement;

              if (target.closest(".ant-image-preview")) {
                return;
              }

              handleOpenView(record?.employeeId);
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
      {defaultValues.pageSize < totalRecords && <div className={styles['employees-table__bottom']}>
        <Paginator total={totalRecords} />
      </div>}
      <ManageEmployeeModal />
      <GrantAccessModal />
      <ResetPasswordEmployeeModal />
    </div>
  );
}

export default EmployeesTable;
