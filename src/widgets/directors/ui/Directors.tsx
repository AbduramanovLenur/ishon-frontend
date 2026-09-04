import type { FC } from "react";
import { useDispatch } from "react-redux";

import { DirectorsTable } from "./DirectorsTable";

import { open } from "@features/manage-director-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Directors.module.scss";

const Directors: FC = () => {
  const dispatch = useDispatch();

  const openManageModalHandle = () => {
    dispatch(open(null));
  }

  return (
    <section className={styles['directors']}>
      <div className={styles['directors__inner']}>
        <TopContent
          title="Direktorlar" 
          text="Direktorlarni boshqarish va nazorat qilish."
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