import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { TelegramIntegration, useGetTelegramSettings } from "@entities/settings";
import { TopContent } from "@shared/ui";

import styles from "./Settings.module.scss";

const Settings: FC = () => {
  const { t } = useTranslation();
  const { data: telegramData, isLoading: isLoadingTelegram } = useGetTelegramSettings();

  return (
    <section className={styles['settings']}>
      <div className={styles['settings__inner']}>
        <TopContent
          title={t("settings.title")}
          text={t("settings.description")}
        />
        <TelegramIntegration
          telegramLink={telegramData?.telegramLink}
          isLoading={isLoadingTelegram}
        />
      </div>
    </section>
  );
}

export default Settings;
