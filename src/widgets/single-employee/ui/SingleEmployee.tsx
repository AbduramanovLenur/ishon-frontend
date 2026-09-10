import type { FC } from "react";

import styles from "./SingleEmployee.module.scss";

const SingleEmployee: FC = () => {
  return (
    <section className={styles['single-employee']}>
      <div className={styles['single-employee__inner']}></div>
    </section>
  );
}

export default SingleEmployee;