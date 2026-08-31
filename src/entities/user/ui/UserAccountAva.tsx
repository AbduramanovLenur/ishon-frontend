import type { FC } from "react";

import { useUser } from "../model/queries";

import { getFirstChar } from "@shared/utils";

import styles from "./UserAccount.module.scss";


const UserAccountAva: FC = () => {
  const { data: user } = useUser();

  return (
    <div className={styles['user-account__ava']}>
      { user?.fullName ? getFirstChar(user?.fullName) : "U" }
    </div>
  );
}

export default UserAccountAva;