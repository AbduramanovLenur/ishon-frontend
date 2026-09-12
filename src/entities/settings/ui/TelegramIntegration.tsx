import type { FC } from "react";
import { Skeleton, Typography } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import styles from "./TelegramIntegration.module.scss";

interface ITelegramIntegrationProps {
  telegramLink?: string;
  isLoading: boolean;
};

const TelegramIntegration: FC<ITelegramIntegrationProps> = ({ telegramLink, isLoading }) => {
  return (
    <div className={styles['telegram-integration']}>
      <div className={styles['telegram-integration__label']}>
        Telegram Integration
      </div>
      <div className={styles['telegram-integration__wrapper']}>
        <div className={styles['telegram-integration__icon']}>
          <LinkOutlined />
        </div>
        <div className={styles['telegram-integration__content']}>
          <div className={styles['telegram-integration__content-label']}>
            Bot havolasi
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
        Telegram akkauntlarini ulash uchun ushbu havolani xodimlar bilan ulashing.
      </div>
    </div>
  );
}

export default TelegramIntegration;