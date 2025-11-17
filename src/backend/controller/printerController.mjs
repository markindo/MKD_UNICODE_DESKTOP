import { addPrinter, getPrinters, updatePrinterById, deletePrinter } from "../model/PrinterModel.mjs";
import { dialog } from "electron";
export const getPrinterController = async () => {
    return await getPrinters();
}
export const addPrinterController = async (data) => {
    console.log("Controller - addPrinter:", data);
    try {
        const printer = await addPrinter(data);
        return printer;
    } catch (error) {
        console.log(error);
        dialog.showMessageBox({
            type: "warning",
            title: "Failed",
            message: "Failed add Printer",
        });
    }
}
export const updatePrinterController = async (data) => {
    // Implementasi update printer
    try {
        const printer = await updatePrinterById(data);
        dialog.showMessageBox({
            type: "info",
            title: "Success",
            message: "Printer updated successfully.",
        });
        return printer;
    } catch (error) {
        console.log(error);
        dialog.showMessageBox({
            type: "warning",
            title: "Failed",
            message: "Failed update Printer",
        })
    }
}
export const deletePrinterController = async (id) => {
    console.log("Controller - deletePrinter:", id);
    // Implementasi delete printer
    try {
        const result = await dialog.showMessageBox({
            type: "question",
            buttons: ["Yes", "No"],
            title: "Confirm",
            message: "Apakah Mau Menghapus Printer Ini?",
            // ...options,
        });
        if (result.response === 0) {
            const status = await deletePrinter(id);
            console.log("Delete status:", status);
            if (status.changes === 0) {
                dialog.showErrorBox("Error", "Printer not found or already deleted.");
            } else {


                dialog.showMessageBox({
                    type: "info",
                    title: "Success",
                    message: "Printer deleted successfully.",
                });
            }
        }
        console.log(result.response);
        return result.response;

    } catch (error) {
        dialog.showErrorBox("Error", "Printer not found or already deleted.", error);
        console.log(error);
    }
}


