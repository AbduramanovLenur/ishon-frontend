import type { FC } from "react";
import { Skeleton, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import styles from "./TelegramIntegration.module.scss";

interface ITelegramIntegrationProps {
  telegramLink?: string;
  isLoading: boolean;
};

const TelegramIntegration: FC<ITelegramIntegrationProps> = ({ telegramLink, isLoading }) => {
  const { t } = useTranslation();

  return (
    <div className={styles['telegram-integration']}>
      <div className={styles['telegram-integration__label']}>
        {t("settings.telegramIntegration")}
      </div>
      <div className={styles['telegram-integration__wrapper']}>
        <div className={styles['telegram-integration__icon']}>
          <LinkOutlined />
        </div>
        <div className={styles['telegram-integration__content']}>
          <div className={styles['telegram-integration__content-label']}>
            {t("settings.botLink")}
          </div>
          {isLoading ? (
            <Skeleton.Node className={styles['telegram-integration__skeleton']} />
          ) : (
            <a
              className={styles['telegram-integration__content-link']}
              href={telegramLink}
              target="_blank"
            >
              {telegramLink}
            </a>
          )}
        </div>
        {!isLoading && <div className={styles['telegram-integration__copy']}>
          <Typography.Text copyable={{ text: telegramLink }} />
        </div>}
      </div>
      <div className={styles['telegram-integration__text']}>
        {t("settings.telegramDescription")}
      </div>
    </div>
  );
}

export default TelegramIntegration;
