import type { FC } from "react";
import { Table, type TableProps, Tag } from "antd";
import { useDispatch } from "react-redux";

import { useDeleteCompanyOwner } from "@features/delete-director-modal";
import { ManageDirectorModal, open as openManageModal  } from "@features/manage-director-modal";
import { useCompanyOwnerList, type ICompanyOwner } from "@entities/directors";
import { ActionsDropdown, Paginator, SearchInput } from "@shared/ui";
import { getFirstChar, validationPage } from "@shared/utils";
import { useQueryParams } from "@shared/lib";
import { queries } from "@shared/config";

import styles from "./DirectorsTable.module.scss";

const dataElems: ICompanyOwner[] = [
  {
    companyOwnerId: "1",
    companyId: "OOO International Technology Solutions Group",
    username: "akmal.rahimov",
    fullName: "Акмал Рахимов",
    phone: "+998901234567",
    position: "Директор",
    active: true,
    createdAt: "2026-08-15T10:30:00Z",
  },
  {
    companyOwnerId: "2",
    companyId: "Uzbekistan Trade and Logistics Development Company",
    username: "dilshod.karimov",
    fullName: "Дилшод Каримов",
    phone: "+998911234567",
    position: "Генеральный директор",
    active: true,
    createdAt: "2026-08-18T08:15:00Z",
  },
  {
    companyOwnerId: "3",
    companyId: "Navoi Industrial Construction and Development Group",
    username: "sardor.tursunov",
    fullName: "Сардор Турсунов",
    phone: "+998931234567",
    position: "Управляющий директор",
    active: false,
    createdAt: "2026-08-20T14:45:00Z",
  },
  {
    companyOwnerId: "4",
    companyId: "Central Asia Digital Solutions and Technologies",
    username: "bekzod.aliyev",
    fullName: "Бекзод Алиев",
    phone: "+998941234567",
    position: "Исполнительный директор",
    active: true,
    createdAt: "2026-08-22T11:20:00Z",
  },
  {
    companyOwnerId: "5",
    companyId: "Smart Business Management and Consulting Services",
    username: "jasur.nazarov",
    fullName: "Жасур Назаров",
    phone: "+998951234567",
    position: "Финансовый директор",
    active: true,
    createdAt: "2026-08-25T09:00:00Z",
  },
];

export const DirectorsTable: FC = () => {
  const dispatch = useDispatch();
  const { get } = useQueryParams();
  const search = get(queries.SEARCH) || '';
  const currentPage = validationPage(Number(get(queries.PAGE)));
  const { data, isLoading } = useCompanyOwnerList(search, currentPage);
  const { confirmDelete } = useDeleteCompanyOwner();

  const dataSource = data?.content || [];
  const totalElems = data?.totalElements || 0;

  const openManageModalHandle = (id: number | string) => {
    dispatch(openManageModal(id));
  }

  const openViewModalHandle = (id: number | string) => {
    console.log(id)
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
          {record.companyId}
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
            onClick: () => {}
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
          rowKey="id"
          onRow={(record) => ({
            onClick: () => {
              openViewModalHandle(record.companyOwnerId);
            },
            style: { 
              cursor: 'pointer' 
            }
          })}
          dataSource={dataSource.length ? dataSource : dataElems}
          columns={columns}
          pagination={false}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <div className={styles['directors-table__bottom']}>
        <Paginator total={totalElems} />
      </div>
      <ManageDirectorModal />
    </div>
  );
}
