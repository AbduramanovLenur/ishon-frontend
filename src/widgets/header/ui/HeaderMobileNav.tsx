import type { FC } from "react";
import { NavLink } from "react-router-dom";

import { navigations } from "@shared/config/navigations";

import styles from "./Header.module.scss";

const HeaderMobileNav: FC = () => {
  const role = "superadmin";
  const items = navigations.filter((nav) => nav.role === role);

  return (
    <nav className={styles["header-mobile__nav"]}>
      <ul className={styles["header-mobile__nav-list"]}>
        {items.map((item) => (
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
        ))}
        <li className={styles["header-mobile__nav-item"]}>
          <button className={styles["header-mobile__nav-logout"]} type="button">
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