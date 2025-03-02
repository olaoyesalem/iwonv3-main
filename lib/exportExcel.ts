import * as XLSX from "xlsx";

export const exportToExcel = (data: any[], fileName: string) => {
  // Convert data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set left alignment for all cells
  for (const cell in worksheet) {
    if (worksheet[cell] && cell[0] !== "!") {
      worksheet[cell].s = { alignment: { horizontal: "left" } }; // Align text left
    }
  }

  // Set column widths with longer spaces for certain columns
  worksheet["!cols"] = [
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
    { wch: 35 },
  ];

  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
