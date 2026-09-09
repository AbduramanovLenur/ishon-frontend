import type { FC } from "react";
import { DeleteOutlined, EditOutlined, InboxOutlined, KeyOutlined, MoreOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";

import type { IAction } from "../../types";

import styles from "./ActionsDropdown.module.scss";

interface IActionsDropdownProps {
  edit?: IAction;
  delete?: IAction;
  reset?: IAction;
  access?: IAction;
  revoke?: IAction;
}

const ActionsDropdown: FC<IActionsDropdownProps> = ({
  edit = { visible: true },
  delete: deleteAction = { visible: true },
  reset = { visible: false },
  access = { visible: false },
  revoke = { visible: false }
}) => {
  const items: MenuProps["items"] = [
    edit?.visible !== false && {
      key: "edit",
      label: edit?.text || "Tahrirlash",
      icon: <EditOutlined />,
      className: styles['actions-dropdown__edit']
    },

    deleteAction?.visible !== false && {
      key: "delete",
      label: deleteAction?.text || "O‘chirish",
      icon: <DeleteOutlined />,
      className: styles['actions-dropdown__delete']
    },

    access?.visible !== false && {
      key: "access",
      label: access?.text || "Ruxsat berish",
      icon: <KeyOutlined />,
      className: styles['actions-dropdown__access']
    },

    reset?.visible !== false && {
      key: "reset",
      label: reset?.text || "Qayta o‘rnatish",
      icon: <RedoOutlined />,
      className: styles['actions-dropdown__reset']
    },

    revoke?.visible !== false && {
      key: "revoke",
      label: revoke?.text || "Bekor qilish",
      icon: <InboxOutlined />,
      className: styles['actions-dropdown__revoke']
    }
  ].filter(Boolean) as MenuProps["items"];

  const handleAction: MenuProps["onClick"] = ({ key, domEvent }) => {
    domEvent.stopPropagation();
    
    switch (key) {
      case "edit":
        edit?.onClick?.();
        break;
      case "delete":
        deleteAction?.onClick?.();
        break;
      case "access":
        access?.onClick?.();
        break;
      case "reset":
        reset?.onClick?.();
        break;
      case "revoke":
        revoke?.onClick?.();
        break;
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleAction,
      }}
      trigger={['click', 'hover']}
      className={styles['actions-dropdown']}
    >
      <Button
        type="text"
        icon={<MoreOutlined />}
        className={styles['actions-dropdown__trigger']}
        onClick={(e) => e.stopPropagation()}
      />
    </Dropdown>
  );
};

export default ActionsDropdown;