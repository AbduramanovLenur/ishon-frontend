import type { FC } from "react";

import { useManualObjectList } from "@entities/objects";
import { SelectList } from "@shared/ui";
import { defaultValues, queries } from "@shared/config";

import styles from "./TodaysPresenceObjectFilter.module.scss";

const TodaysPresenceObjectFilter: FC = () => {
  const { data, isLoading } = useManualObjectList(true);

  const objectList = data?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  return (
    <SelectList
      className={styles['todays-presence-object-filter']}
      options={objectList}
      queryKey={queries.OBJECT}
      defaultValue={defaultValues.object}
      isLoading={isLoading}
    />
  );
}

export default TodaysPresenceObjectFilter;