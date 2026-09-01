import type { FC } from "react";

import HeaderMobileNav from "./HeaderMobileNav";

import styles from "./Header.module.scss";


interface IHeaderMobileProps {
  isOpen: boolean;
  onClick: () => void;
};

export const HeaderMobile: FC<IHeaderMobileProps> = ({ isOpen, onClick }) => {
  return (
    <div className={`${styles['header-mobile']} ${isOpen ? styles['header-mobile--active'] : ''}`}>
        <div className={styles['header-mobile__overlay']}>
          <div className={styles['header-mobile__top']}>
            <div className={styles['header-mobile__logo']}>
              Ishon
            </div>
            <button 
              className={styles['header-mobile__button']} 
              type="button" 
              onClick={onClick}
            >
              <span></span>
              <span></span>
            </button>
          </div>
          <HeaderMobileNav />
        </div>
    </div>
  );
}
