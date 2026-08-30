import type { FC } from "react";
import { Skeleton } from "antd";

import styles from "./UserAccount.module.scss";
import { useUser } from "../model/queries";

import { getFirstChar } from "@shared/utils";

const UserAccount: FC = () => {
    const { data: user, isLoading } = useUser();

    if (isLoading) {
        return <Skeleton.Node className={styles['user-account__skeleton']} />;
    }

    return (
        <div className={styles['user-account']}>
            <div className={styles['user-account__ava']}>
                { user?.fullName ? getFirstChar(user.fullName) : "U" }
            </div>
            <div className={styles['user-account__info']}>
                {user?.fullName && <div className={styles['user-account__fullname']}>
                    { user.fullName }
                </div>}
                {user?.position && <div className={styles['user-account__position']}>
                    { user.position }
                </div>}
            </div>
        </div>
    );
}

export default UserAccount;