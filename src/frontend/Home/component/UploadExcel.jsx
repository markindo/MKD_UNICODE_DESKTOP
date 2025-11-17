import { useState } from "react";
import { FaUpload, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";

export default function Uploadexcel({ printer, setOpenUpload }) {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(progress)
        if (!file) {
            setStatus("⚠️ Silakan pilih file terlebih dahulu.");
            return;
        }

        setProgress(0);
        setStatus("");
        setLoading(true);

        try {
            const reader = new FileReader();
            reader.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percent = Math.round((event.loaded / event.total) * 100);
                    setProgress(percent);
                }
            };

            reader.onload = async (event) => {
                try {
                    const base64Data = event.target.result.split(",")[1];

                    const result = await window.be.saveFile({
                        name: file.name,
                        data: base64Data,
                        idPrinter: printer?.id ?? 0,
                    });

                    if (result?.success) {
                        setStatus(`✅ File berhasil diunggah `);
                        setProgress(100);
                    } else {
                        setStatus(`❌ Gagal mengunggah: ${result?.error || "Error tidak diketahui."}`);
                    }
                } catch (err) {
                    console.error("Upload error:", err);
                    setStatus("❌ Terjadi kesalahan saat upload file.");
                } finally {
                    setLoading(false);
                }
            };

            reader.onerror = () => {
                setStatus("❌ Gagal membaca file. Pastikan file tidak rusak.");
                setLoading(false);
            };

            reader.readAsDataURL(file);

        } catch (err) {
            console.error("Unexpected error:", err);
            setStatus("❌ Terjadi kesalahan tidak terduga.");
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            {/* Close Button */}
            {!loading && (
                <button
                    onClick={() => setOpenUpload(false)}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    <MdOutlineClose className="text-xl text-gray-600 dark:text-gray-300" />
                </button>
            )}

            {/* Header */}
            <h1 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                📤 Upload File Excel
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Pastikan seluruh printer dalam kondisi <strong>stop</strong> sebelum upload.
            </p>

            {/* File Input */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-amber-400 rounded-xl cursor-pointer bg-amber-50 hover:bg-amber-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition">
                <FaUpload className="text-3xl text-amber-500 mb-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                    {file ? file.name : "Pilih file .csv atau .xlsx"}
                </span>
                <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        setStatus("");
                        setProgress(0);
                    }}
                    className="hidden"
                />
            </label>

            {/* Upload Button */}
            <button
                type="button"
                onClick={handleUpload}
                disabled={!file || loading}
                className={`mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg transition-all 
                    ${loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {loading ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        Membaca Data...
                    </>
                ) : (
                    <>
                        <FaUpload /> Upload File
                    </>
                )}
            </button>

            {/* Progress Bar */}
            {loading && (
                <div className="mt-6">
                    {/* <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-200"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div> */}
                    {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">{progress}%</p> */}
                </div>
            )}

            {/* Status Message */}
            {status && (
                <div
                    className={`mt-4 p-3 text-sm rounded-lg border ${status.includes("✅")
                        ? "border-green-400 bg-green-50 text-green-700"
                        : status.includes("❌")
                            ? "border-red-400 bg-red-50 text-red-700"
                            : "border-yellow-400 bg-yellow-50 text-yellow-700"
                        }`}
                >
                    {status.includes("✅") && <FaCheckCircle className="inline mr-2" />}
                    {status.includes("❌") && <FaExclamationCircle className="inline mr-2" />}
                    {status}
                </div>
            )}
        </div>
    );
}
