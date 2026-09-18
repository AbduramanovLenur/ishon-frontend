import type { FC } from "react";
import { Image, Tag } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import type { IEmployeeEvent } from "../model/types";
import { getEventTypes } from "../model/config";

import { formatDate, formatDateToDisplay, formatTime } from "@shared/utils";

import styles from "./HistoryItem.module.scss";

interface IHistoryItemProps {
  item: IEmployeeEvent;
};

const HistoryItem: FC<IHistoryItemProps> = ({ item }) => {
  const { t, i18n } = useTranslation();
  const eventTypeLabels = getEventTypes(t);

  const statusTags = [
    item.type && {
      id: 1,
      text: eventTypeLabels[item.type as keyof typeof eventTypeLabels],
      color: '#2db7f5',
      textColor: undefined,
    },
    item.late && {
      id: 2,
      text: eventTypeLabels.LATE,
      color: '#DCFCE7',
      textColor: '#389e0d',
    },
    item.earlyLeave && {
      id: 3,
      text: eventTypeLabels.EARLY,
      color: '#FCE7F3',
      textColor: '#9D174D',
    },
  ].filter((tag): tag is Exclude<typeof tag, false> => Boolean(tag));

  return (
    <div className={styles['history-item']}>
      <div className={styles['history-item__info']}>
        <div className={styles['history-item__wrapper']}>
          {statusTags.map((tag) => (
            <Tag
              key={tag.id}
              className={styles['history-item__tag']}
              color={tag.color}
              style={tag.textColor ? { color: tag.textColor } : undefined}
              variant={tag.textColor ? undefined : 'solid'}
            >
              {tag.text}
            </Tag>
          ))}
          {item.eventTime ? (
            <div className={styles['history-item__date']}>
              {formatDate(item.eventTime, t)}
            </div>
          ) : item.attendanceDate ? (
            <div className={styles['history-item__date']}>
              {formatDateToDisplay(item.attendanceDate, t)}
            </div>
          ) : null}
        </div>
        {item?.eventTime && <div className={styles['history-item__information']}>
          {formatTime(item.eventTime, i18n.language)}
        </div>}
        {item?.object?.name && <div className={styles['history-item__object']}>
          <HomeOutlined />
          {item.object.name}
        </div>}
      </div>
      {item?.snapshotUrl && <Image
        classNames={{
          root: styles['history-item__picture']
        }}
        className={styles['history-item__picture-image']}
        src={item.snapshotUrl}
        alt={item.snapshotUrl}
        loading="lazy"
        width={80}
        height={80}
      />}
    </div>
  );
}

export default HistoryItem;
