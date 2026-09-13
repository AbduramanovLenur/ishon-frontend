import { useEffect, type FC } from "react";

import { Result, Button } from "antd";

import { Attendance } from "@widgets/attendance";
import { useSession } from "@features/face-verification";
import { initDataHash, startParam } from "@shared/lib/telegram";

const AttendancePage: FC = () => {
  const { 
    mutateAsync, 
    isError, 
    isPending 
  } = useSession();

  useEffect(() => {
    if (!startParam || !initDataHash) {
      return;
    }

    mutateAsync({
      companyToken: startParam,
      initData: initDataHash,
    });
  }, [mutateAsync]);

  if (isPending) {
    return <Result status="info" title="Sessiya o'rnatilmoqda..." />;
  }

  if (isError) {
    return (
      <Result
        status="error"
        title="Sessiya o'rnatilmadi"
        subTitle="Sessiyani o'rnatishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
        extra={
          <Button type="primary" onClick={() => window.location.reload()}>
            Qaytadan urinish
          </Button>
        }
      />
    );
  }

  return <Attendance />;
};

export default AttendancePage;
