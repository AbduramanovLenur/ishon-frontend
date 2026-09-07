import type { FC } from "react";

import { useManualObjectList } from "@entities/objects";
import { SelectList } from "@shared/ui";

const TodaysPresenceObjectFilter: FC = () => {
  const { data, isLoading } = useManualObjectList(true);

  const objectList = data?.map((object) => ({
    label: object.name,
    value: object.id
  })) ?? [];

  return (
    <SelectList options={objectList} isLoading={isLoading} />
  );
}

export default TodaysPresenceObjectFilter;