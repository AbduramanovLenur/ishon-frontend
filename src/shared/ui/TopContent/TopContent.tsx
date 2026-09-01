import { type FC, type ReactNode } from "react";

import styles from "./TopContent.module.scss";

interface ITopContentProps {
  title: string;
  text: string;
  children?: ReactNode;
};

const TopContent: FC<ITopContentProps> = ({ title, text, children }) => {
  return (
    <div className={styles["top-content"]}>
      <div className={styles["top-content__overlay"]}>
        <h1 className={styles["top-content__title"]}>
          { title }
        </h1>
        <div className={styles["top-content__text"]}>
          { text }
        </div>
      </div>
      { children }
    </div>
  );
}

export default TopContent;