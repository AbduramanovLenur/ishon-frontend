import { useEffect, type FC, type ReactNode } from "react";
import { Spin } from "antd";

import { useSessionRestore } from "@features/session-restore";
import { routes } from "@shared/config";

interface IProps {
  children: ReactNode;
};

const SessionProvider: FC<IProps> = ({ children }) => {
  const isAuthPage = window.location.pathname === routes.AUTH;

  const { mutateAsync, isPending } = useSessionRestore();
  // const hasRequestedSessionRestore = useRef(false);

  useEffect(() => {
    if (!isAuthPage) {
      // hasRequestedSessionRestore.current = true;
      mutateAsync();
    }
  }, [isAuthPage, mutateAsync]);

  if (isPending) {
    return <div className="spin">
      <Spin className="spin-loader" size="large" />
    </div>;
  }

  return children;
}

export default SessionProvider;
