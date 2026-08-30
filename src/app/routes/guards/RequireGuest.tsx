import { type FC } from "react";
import { Outlet } from "react-router-dom";

const RequireGuest: FC = () => {
  return <Outlet />;
}

export default RequireGuest;
