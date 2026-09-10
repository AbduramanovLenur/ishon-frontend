import type { FC } from "react";
import { useParams } from "react-router-dom";

import { AnalyticsEmployee, ProfileEmployee, useEmployeeProfile } from "@entities/employees";

import styles from "./SingleEmployee.module.scss";

const SingleEmployee: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useEmployeeProfile(id ?? null);

  return (
    <section className={styles['single-employee']}>
      <div className={styles['single-employee__inner']}>
        <ProfileEmployee  
          fullName={data?.fullName ?? ''}
          object={data?.assignedObject?.name ?? ''}
          position={data?.position ?? ''}
          photoUrl={data?.photoUrl ?? ''}
          isLoading={isLoading}
        />
        <AnalyticsEmployee 
          workedDays={data?.statistics?.workedDays ?? 1}
          notCheckedInDays={data?.statistics?.notCheckedInDays ?? 1}
          lateArrivals={data?.statistics?.lateArrivals ?? 1}
          earlyLeaves={data?.statistics?.earlyLeaves ?? 1}
        />
      </div>
    </section>
  );
}

export default SingleEmployee;