import type { FC, ReactNode } from "react";
import { Button, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { exportToExcel } from "@shared/lib";
import type { ExportColumn } from "@shared/types";

interface ExportExcelButtonProps<T> {
  data: T[];
  columns: ExportColumn<T>[];
  fileName: string;
  sheetName?: string;
  tooltip?: string;
  icon?: ReactNode;
}

const ExportExcelButton = <T,>({
  data,
  columns,
  fileName,
  sheetName,
  tooltip = "Excelga yuklab olish",
  icon,
}: ExportExcelButtonProps<T>): ReturnType<FC> => {
  const handleExport = async () => {
    if (!data.length) return;

    await exportToExcel({
      data,
      columns,
      fileName,
      sheetName,
    });
  };

  return (
    <Tooltip title={tooltip}>
      <Button
        type="default"
        icon={icon || <DownloadOutlined />}
        onClick={handleExport}
        style={{
          flexShrink: 0
        }}
      />
    </Tooltip>
  );
};

export default ExportExcelButton;
