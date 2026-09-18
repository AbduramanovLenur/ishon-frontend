import type { FC, ReactNode } from "react";
import { Button, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface ExportExcelButtonProps {
  onExport: () => void;
  tooltip?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const ExportExcelButton: FC<ExportExcelButtonProps> = ({
  onExport,
  tooltip,
  icon,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={tooltip || t("common.exportExcel")}>
      <Button
        type="default"
        icon={icon || <DownloadOutlined />}
        onClick={onExport}
        disabled={disabled}
        style={{ flexShrink: 0 }}
      />
    </Tooltip>
  );
};

export default ExportExcelButton;
