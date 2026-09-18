import { useTranslation } from "react-i18next";
import { Dropdown, type MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import styles from "./LanguageSwitcher.module.scss";

const languages: MenuProps["items"] = [
  {
    key: "uz",
    label: "O'zbek",
  },
  {
    key: "ru",
    label: "Русский",
  },
];

interface ILanguageSwitcherProps {
  mode?: "horizontal" | "vertical";
}

const LanguageSwitcher = ({ mode = "horizontal" }: ILanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const handleLanguageChange: MenuProps["onClick"] = ({ key }) => {
    localStorage.setItem("language", key);
    window.location.reload();
  };

  const menu: MenuProps = {
    items: languages,
    onClick: handleLanguageChange,
    selectedKeys: [currentLanguage],
  };

  return (
    <Dropdown menu={menu} trigger={["click"]} classNames={{
      root: styles["language-switcher__popup"],
      item: styles["language-switcher__popup-item"]
    }}>
      <button
        type="button"
        className={`${styles["language-switcher"]} ${mode === "vertical" ? styles["language-switcher--vertical"] : ""}`}
      >
        <GlobalOutlined className={styles["language-switcher__icon"]} />
        <span>
          {currentLanguage === "uz" ? "O'zbek" : "Русский"}
        </span>
      </button>
    </Dropdown>
  );
};

export default LanguageSwitcher;
