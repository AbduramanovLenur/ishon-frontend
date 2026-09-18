import type { FC } from "react";

import SidebarNav from "./SidebarNav";

import { UserAccount } from "@entities/user";
import { LanguageSwitcher } from "@features/language-switcher";

import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  return (
    <aside className={styles['sidebar']}>
      <div className={styles['sidebar__logo']}>
        Ishon
      </div>
      <SidebarNav />
      <div className={styles['sidebar__bottom']}>
        <LanguageSwitcher mode="vertical" />
        <UserAccount />
      </div>
    </aside>
  );
}

export default Sidebar;