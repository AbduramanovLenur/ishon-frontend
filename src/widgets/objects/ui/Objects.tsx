import type { FC } from "react";

import { ObjectsTable } from "./ObjectsTable";

import { PrimaryButton, TopContent } from "@shared/ui";

import styles from "./Objects.module.scss";

const Objects: FC = () => {
  return (
    <section className={styles['objects']}>
      <div className={styles['objects__inner']}>
        <TopContent
          title="Obyektlar"
          text="Kuzatuv uchun joylashuvlar, radiuslar va smenalarni boshqaring."
        >
          <PrimaryButton>
            Obyekt yaratish
          </PrimaryButton>
        </TopContent>
        <ObjectsTable />
      </div>
    </section>
  );
}

export default Objects;