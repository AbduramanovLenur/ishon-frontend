import type { FC } from "react";

import { useUser } from "../model/queries";

import styles from "./UserAccount.module.scss";

import { getFirstChar } from "@shared/utils";

const UserAccountAva: FC = () => {
  const { data: user } = useUser();

  return (
    <div className={styles['user-account__ava']}>
      { user?.fullName ? getFirstChar(user?.fullName) : "U" }
    </div>
  );
}

export default UserAccountAva;