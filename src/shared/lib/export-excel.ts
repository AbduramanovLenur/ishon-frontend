import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import type { ExportColumn } from "../types";

const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = (reader.result as string).split(",")[1];

        resolve(base64 || null);
      };

      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

const getImageExtension = (url: string): "jpeg" | "png" | "gif" => {
  const lower = url.toLowerCase();

  if (lower.includes(".png")) return "png";
  if (lower.includes(".gif")) return "gif";

  return "jpeg";
};

export const exportToExcel = async <T>(params: {
  data: T[];
  columns: ExportColumn<T>[];
  fileName: string;
  sheetName?: string;
}): Promise<void> => {
  const { data, columns, fileName, sheetName = "Sheet1" } = params;

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet(sheetName);

  const hasImages = columns.some((col) => col.isImage);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.header,
    width: col.isImage ? 12 : 20,
  }));

  if (hasImages) {
    worksheet.getRow(1).height = 30;
  }

  for (const row of data) {
    const rowValues: Record<string, string | number | boolean | null | undefined> = {};

    columns.forEach((col) => {
      rowValues[col.header] = col.isImage ? "" : col.accessor(row);
    });

    const excelRow = worksheet.addRow(rowValues);

    if (hasImages) {
      excelRow.height = 90;
    }
  }

  for (let colIndex = 0; colIndex < columns.length; colIndex++) {
    const col = columns[colIndex];

    if (!col.isImage) continue;

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const imageUrl = col.accessor(data[rowIndex]) as string | null;

      if (!imageUrl) continue;

      const base64 = await fetchImageAsBase64(imageUrl);

      if (!base64) continue;

      const imageId = workbook.addImage({
        base64,
        extension: getImageExtension(imageUrl),
      });

      worksheet.addImage(imageId, {
        tl: { col: colIndex, row: rowIndex + 1 },
        ext: { width: 50, height: 90 },
        editAs: "oneCell",
      });
    }
  }

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
};
