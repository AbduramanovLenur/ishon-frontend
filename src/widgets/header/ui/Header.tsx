import { useState, type FC } from "react";

import { HeaderMobile } from "./HeaderMobile";

import { UserAccountAva } from "@entities/user";

import styles from "./Header.module.scss";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenHandle = (state: boolean) => {
    setIsOpen(state);
  }

  return (
    <header className={styles['header']}>
      <div className={styles['header__inner']}>
        <div className={styles['header__logo']}>
          Ishon
        </div>
        <UserAccountAva />
        <button 
          className={styles['header__button']} 
          type="button" 
          onClick={() => isOpenHandle(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <HeaderMobile 
        isOpen={isOpen} 
        onClick={() => isOpenHandle(false)}
      />
    </header>
  );
}

export default Header;