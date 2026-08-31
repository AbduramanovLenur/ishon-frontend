import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "antd";

import { useLogout } from "@features/auth-form";
import { useUser } from "@entities/user";
import { navigations } from "@shared/config/navigations";

import styles from "./Header.module.scss";

const HeaderMobileNav: FC = () => {
  const { data: user, isLoading } = useUser();
  const { logout } = useLogout();

  const items = navigations.filter((nav) => user?.type === nav.role);

  return (
    <nav className={styles["header-mobile__nav"]}>
      <ul className={styles["header-mobile__nav-list"]}>
        {
          !isLoading ? (
            items.map((item) => (
              <li key={item.id} className={styles["header-mobile__nav-item"]}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["header-mobile__nav-link"]} ${styles["header-mobile__nav-link--active"]}`
                      : styles["header-mobile__nav-link"]
                  }
                >
                  <span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <use href={`/icons/sprite.svg#icon-${item.icon}`}></use>
                    </svg>
                  </span>
                  <span>
                    {item.label}
                  </span>
                </NavLink>
              </li>
            ))
          ) : (
            <div className={styles['header-mobile__nav-skeletons']}>
              <Skeleton.Node className={styles['header-mobile__nav-skeleton']} />
              <Skeleton.Node className={styles['header-mobile__nav-skeleton']} />
              <Skeleton.Node className={styles['header-mobile__nav-skeleton']} />
            </div>
          )
        }
        <li className={styles["header-mobile__nav-item"]}>
          <button 
            className={styles["header-mobile__nav-logout"]} 
            type="button" 
            onClick={logout}
          >
            <span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href={`/icons/sprite.svg#icon-logout`}></use>
              </svg>
            </span>
            <span>Chiqish</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMobileNav;