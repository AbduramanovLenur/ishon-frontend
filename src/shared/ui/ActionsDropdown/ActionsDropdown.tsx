import type { FC } from "react";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";

import type { IAction } from "../../types";

import styles from "./ActionsDropdown.module.scss";

interface IActionsDropdownProps {
  edit?: IAction;
  delete?: IAction;
}

const ActionsDropdown: FC<IActionsDropdownProps> = ({
  edit,
  delete: deleteAction,
}) => {
  const items: MenuProps["items"] = [
    edit?.visible !== false && {
      key: "edit",
      label: "Tahrirlash",
      icon: <EditOutlined />,
      className: styles['actions-dropdown__edit']
    },

    deleteAction?.visible !== false && {
      key: "delete",
      label: "O‘chirish",
      icon: <DeleteOutlined />,
      className: styles['actions-dropdown__delete']
    },
  ].filter(Boolean) as MenuProps["items"];

  const handleAction: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "edit":
        edit?.onClick?.();
        break;

      case "delete":
        deleteAction?.onClick?.();
        break;
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleAction,
      }}
    >
      <Button type="text" icon={<MoreOutlined />} className={styles['actions-dropdown__trigger']} />
    </Dropdown>
  );
};

export default ActionsDropdown;