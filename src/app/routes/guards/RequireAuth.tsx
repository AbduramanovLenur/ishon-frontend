import { type FC } from "react";
import { Outlet } from "react-router-dom";

const RequireAuth: FC = () => {
  return <Outlet />;
}

export default RequireAuth;