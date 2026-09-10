import type { FC } from "react";
import { Image, Tag } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import type { IEmployeeEvent } from "../model/types";
import { eventTypes } from "../model/config";

import { formatDate, formatTime } from "@shared/utils";

import styles from "./HistoryItem.module.scss";

interface IHistoryItemProps {
  item: IEmployeeEvent;
};

const HistoryItem: FC<IHistoryItemProps> = ({ item }) => {
  return (
    <div className={styles['history-item']}>
      <div className={styles['history-item__info']}>
        <div className={styles['history-item__wrapper']}>
          {item?.eventType && <Tag
            className={styles['history-item__tag']}
            color={'#2db7f5'} 
            variant="solid"
          >
            {eventTypes[item.eventType]}
          </Tag>}
          {item.eventTime && <div className={styles['history-item__date']}>
            {formatDate(item.eventTime)}
          </div>}
        </div>
        {item?.eventTime && <div className={styles['history-item__information']}>
          {formatTime(item.eventTime)}
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