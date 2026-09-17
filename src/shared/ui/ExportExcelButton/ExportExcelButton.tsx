import type { FC, ReactNode } from "react";
import { Button, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

interface ExportExcelButtonProps {
  onExport: () => void;
  tooltip?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

const ExportExcelButton: FC<ExportExcelButtonProps> = ({
  onExport,
  tooltip = "Excelga yuklab olish",
  icon,
  disabled,
}) => {
  return (
    <Tooltip title={tooltip}>
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
