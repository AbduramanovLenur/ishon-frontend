import type { FC } from "react";
// import { useDispatch } from "react-redux";

import { DirectorsTable } from "./DirectorsTable";

import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Directors.module.scss";

const Directors: FC = () => {
  // const dispatch = useDispatch();

  const openManageModalHandle = () => {
    // dispatch();
  }

  return (
    <section className={styles['directors']}>
      <div className={styles['directors__inner']}>
        <TopContent
          title={"Direktorlar"} 
          text={"Direktorlarni boshqarish va nazorat qilish."}
        >
          <PrimaryButton onClick={openManageModalHandle}>
            Direktor yaratish
          </PrimaryButton>
        </TopContent>
        <DirectorsTable />
      </div>
    </section>
  );
}

export default Directors;