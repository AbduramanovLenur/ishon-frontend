import type { FC } from "react";

import styles from "./UserAccount.module.scss";

const UserAccount: FC = () => {
    return (
        <div className={styles['user-account']}>
            <div className={styles['user-account__ava']}>
                А
            </div>
            <div className={styles['user-account__info']}>
                <div className={styles['user-account__fullname']}>
                    Абдураманов Ленур Мустафаевич
                </div>
                <div className={styles['user-account__position']}>
                    Директор
                </div>
            </div>
        </div>
    );
}

export default UserAccount;