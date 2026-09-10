import type { FC } from "react";
import { useParams } from "react-router-dom";

import { 
  AnalyticsEmployee, 
  HistoryEmployee, 
  ProfileEmployee, 
  useEmployeeHistory, 
  useEmployeeProfile 
} from "@entities/employees";
import { useQueryParams } from "@shared/lib";
import { defaultValues, queries } from "@shared/config";
import { validationPage } from "@shared/utils";

import styles from "./SingleEmployee.module.scss";

const SingleEmployee: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { get } = useQueryParams();
  const eventType = get(queries.EVENT) || defaultValues.event;
  const late = null;
  const early = null;
  const currentPage = validationPage(Number(get(queries.PAGE)), defaultValues.page);
  const { data: profile, isLoading: isLoadingProfile } = useEmployeeProfile(id!);
  const { data: history, isLoading: isLoadingHistory } = useEmployeeHistory(
    id!,
    eventType,
    late,
    early,
    currentPage
  );

  const historyData = history?.content ?? [];
  const totalElements = history?.totalElements ?? 0;

  return (
    <section className={styles['single-employee']}>
      <div className={styles['single-employee__inner']}>
        <ProfileEmployee  
          fullName={profile?.fullName ?? ''}
          object={profile?.assignedObject?.name ?? ''}
          position={profile?.position ?? ''}
          photoUrl={profile?.photoUrl ?? ''}
          isLoading={isLoadingProfile}
        />
        <AnalyticsEmployee 
          workedDays={profile?.statistics?.workedDays ?? 0}
          notCheckedInDays={profile?.statistics?.notCheckedInDays ?? 0}
          lateArrivals={profile?.statistics?.lateArrivals ?? 0}
          earlyLeaves={profile?.statistics?.earlyLeaves ?? 0}
          isLoading={isLoadingProfile}
        />
        <HistoryEmployee
          history={historyData}
          totalElements={totalElements}
          isLoading={isLoadingHistory}
        />
      </div>
    </section>
  );
}

export default SingleEmployee;