import type { FC } from "react";
import { useDispatch } from "react-redux";

import CompaniesTable from "./CompaniesTable";

import { open } from "@features/manage-company-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Companies.module.scss";

const Companies: FC = () => {
  const dispatch = useDispatch();

  const openManageModalHandle = () => {
    dispatch(open(null));
  }

  return (
    <section className={styles['companies']}>
      <div className={styles["companies__inner"]}>
        <TopContent 
          title={"Kompaniyalar"} 
          text={"Korporativ mijoz tashkilotlarni boshqaring va kuzatib boring."} 
        >
          <PrimaryButton onClick={openManageModalHandle}>
            Kompaniya yaratish
          </PrimaryButton>
        </TopContent>
        <CompaniesTable />
      </div>
    </section>
  );
}

export default Companies;