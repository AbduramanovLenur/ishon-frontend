import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";

import { Result, Button } from "antd";

import { Attendance } from "@widgets/attendance";
import { useSession } from "@features/face-verification";
import { LanguageSwitcher } from "@features/language-switcher";
import { initData, startParam } from "@shared/lib/telegram";

import styles from "./AttendancePage.module.scss";

const AttendancePage: FC = () => {
  const { t } = useTranslation();
  const {
    mutateAsync,
    isError,
    isPending,
    isSuccess
  } = useSession();

  useEffect(() => {
    if (!startParam || !initData) {
      return;
    }

    mutateAsync({
      companyToken: startParam,
      initData,
    });
  }, [mutateAsync]);

  if (isPending) {
    return (
      <div className={styles['attendance-page']}>
        <div className={styles['attendance-page__switcher']}>
          <LanguageSwitcher />
        </div>
        <Result status="info" title={t("attendance.sessionPending")} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles['attendance-page']}>
        <div className={styles['attendance-page__switcher']}>
          <LanguageSwitcher />
        </div>
        <Result
          status="error"
          title={t("attendance.sessionError")}
          subTitle={t("attendance.sessionErrorDescription")}
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              {t("attendance.retry")}
            </Button>
          }
        />
      </div>
    );
  }

  if (isSuccess) {
    return <Attendance />;
  }

  return null;
};

export default AttendancePage;
