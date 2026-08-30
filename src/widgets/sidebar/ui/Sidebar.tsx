import type { FC } from "react";

import SidebarNav from "./SidebarNav";

import { UserAccount } from "@entities/user";

import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  return (
    <aside className={styles['sidebar']}>
      <div className={styles['sidebar__logo']}>
        Ishon
      </div>
      <SidebarNav />
      <UserAccount />
    </aside>
  );
}

export default Sidebar;