import type { FC } from "react";
import { useParams } from "react-router-dom";

import { AnalyticsEmployee, ProfileEmployee, useEmployeeProfile } from "@entities/employees";

const EmployeeProfile: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useEmployeeProfile(id!);

  return (
    <>
      <ProfileEmployee
        fullName={data?.fullName ?? ''}
        object={data?.assignedObject?.name ?? ''}
        position={data?.position ?? ''}
        photoUrl={data?.photoUrl ?? ''}
        isLoading={isLoading}
      />
      <AnalyticsEmployee 
        workedDays={data?.statistics?.workedDays ?? 0}
        notCheckedInDays={data?.statistics?.notCheckedInDays ?? 0}
        lateArrivals={data?.statistics?.lateArrivals ?? 0}
        earlyLeaves={data?.statistics?.earlyLeaves ?? 0}
        notLeftDays={data?.statistics?.notLeftDays ?? 0}
        isLoading={isLoading}
      />
    </>
  );
}

export default EmployeeProfile;