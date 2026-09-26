import { useEffect, type FC, type ReactNode } from "react";
import { Spin } from "antd";

import { useSessionRestore } from "@features/auth";

interface IProps {
  children: ReactNode;
};

const SessionProvider: FC<IProps> = ({ children }) => {
  const { mutateAsync, isSuccess, isError, isPending } = useSessionRestore();
  const isRestored =  isSuccess || isError;

  useEffect(() => {
    mutateAsync();
  }, [mutateAsync]);

  if (!isRestored || isPending) {
    return <div className="spin">
      <Spin className="spin-loader" size="large" />
    </div>;
  }

  return children;
}

export default SessionProvider;
