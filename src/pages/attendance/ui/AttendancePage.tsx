import { useEffect, type FC } from "react";

import { Attendance } from "@widgets/attendance";
import { useSession } from "@features/face-verification";
import { initData, startParam } from "@shared/lib/telegram";

const AttendancePage: FC = () => {
  const { mutateAsync } = useSession();

  useEffect(() => {
    if (!startParam || !initData) {
      return;
    }

    mutateAsync({
      companyToken: startParam,
      initData,
    });
  }, [mutateAsync]);

  return <Attendance />;
};

export default AttendancePage;
