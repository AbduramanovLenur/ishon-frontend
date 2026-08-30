import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { navigations } from "@shared/config/navigations";

import styles from "./SidebarNav.module.scss";

const SidebarNav: FC = () => {
  const role = "superadmin";
  const items = navigations.filter((nav) => nav.role === role);

  return (
    <nav className={styles["sidebar-nav"]}>
      <ul className={styles["sidebar-nav__list"]}>
        {items.map((item) => (
          <li key={item.id} className={styles["sidebar-nav__item"]}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? `${styles["sidebar-nav__link"]} ${styles["sidebar-nav__link--active"]}`
                  : styles["sidebar-nav__link"]
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
        ))}
        <li className={styles["sidebar-nav__item"]}>
          <button className={styles["sidebar-nav__logout"]} type="button">
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
};
export default SidebarNav;