import type { FC } from "react";

import { TelegramIntegration, useGetTelegramSettings } from "@entities/settings";
import { TopContent } from "@shared/ui";

import styles from "./Settings.module.scss";

const Settings: FC = () => {
  const { data: telegramData, isLoading: isLoadingTelegram } = useGetTelegramSettings();

  return (
    <section className={styles['settings']}>
      <div className={styles['settings__inner']}>
        <TopContent 
          title="Sozlamalar" 
          text="Tashkilot miqyosidagi sozlamalar va integratsiyalarni sozlash." 
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