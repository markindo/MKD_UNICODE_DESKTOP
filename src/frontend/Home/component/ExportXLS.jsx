import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// PARSER ASYNC
export const parseMessage = async (msg) => {
    if (!msg) return "";

    try {
        const parsing = JSON.parse(msg);
        if (!Array.isArray(parsing)) return "";

        return parsing
            .map(item => item?.field_value ?? "")
            .join(",");

    } catch (e) {
        console.log("Parse Error:", e);
        return "";
    }
};

// EXPORT DENGAN HEADER BOLD
export const exportToXLS = async (data = [], onExport = null) => {

    if (onExport) onExport();

    const formatted = await Promise.all(
        data.map(async (row) => {
            const msg = await parseMessage(row.message);

            return {
                id_printer: row.id_printer ?? "",
                code: msg,
                system_counter: row.system_counter ?? "",
                product_counter: row.product_counter ?? "",
                marking_counter: row.marking_counter ?? "",
                counter: row.counter ?? "",
                status: row.status ?? "",
                timestamp: row.timestamp ?? "",
            };
        })
    );

    // JSON → Sheet
    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

    // ----------------------------------------
    // 🔥 BUAT HEADER BOLD
    // ----------------------------------------
    const range = XLSX.utils.decode_range(worksheet['!ref']);

    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col }); // baris 0 = header

        if (!worksheet[cellAddress]) continue;

        worksheet[cellAddress].s = {
            font: { bold: true },
        };
    }

    // ----------------------------------------

    const xlsData = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
        cellStyles: true, // wajib
    });

    saveAs(new Blob([xlsData]), `export_log_${Date.now()}.xlsx`);

    return true;
};
