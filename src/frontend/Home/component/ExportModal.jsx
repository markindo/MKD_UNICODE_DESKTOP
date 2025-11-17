import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ModalAll } from "./ModalAll";
import { exportToXLS } from "./ExportXLS";
export function ExportModal({ printer, openExport, setOpenExport }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // const [logs, setLogs] = useState([]);
    const handleExport = async () => {
        const data = {
            id_printer: printer.id,
            start_date: startDate.replaceAll("T", " "),
            end_date: endDate.replaceAll("T", " ")
        }
        const result = await window.be.getLog(data)
        // setLogs(result)

        exportToXLS(result, () => {
            console.log("Export started");
        });
        if (!startDate || !endDate) {
            alert("Start date & End date harus diisi");
            return;
        }

        // onExport({ startDate, endDate });
    };

    if (!open) return null;

    return (
        <>
            <ModalAll isOpen={openExport} onClose={() => setOpenExport(false)}>

                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setOpenExport(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">
                            Export Data ke Excel
                        </h2>

                        {/* Form */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Start Date</label>
                                <input
                                    type="datetime-local"
                                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">End Date</label>
                                <input
                                    type="datetime-local"
                                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setOpenExport(false)}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>

                            {/* <ExportXLS data={logs} /> */}
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </ModalAll>
        </>
    );
}
