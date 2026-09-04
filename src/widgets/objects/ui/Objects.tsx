import type { FC } from "react";
import { useDispatch } from "react-redux";

import { ObjectsTable } from "./ObjectsTable";

import { open } from "@features/manage-object-modal";
import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Objects.module.scss";

const Objects: FC = () => {
  const dispatch = useDispatch();

  const openManageModalHandle = () => {
    dispatch(open(null));
  }
  return (
    <section className={styles['objects']}>
      <div className={styles['objects__inner']}>
        <TopContent
          title="Obyektlar"
          text="Kuzatuv uchun joylashuvlar, radiuslar va smenalarni boshqaring."
        >
          <PrimaryButton onClick={openManageModalHandle}>
            Obyekt yaratish
          </PrimaryButton>
        </TopContent>
        <ObjectsTable />
      </div>
    </section>
  );
}

export default Objects;