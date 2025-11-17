import React, { useEffect, useState } from "react";
import { DropdownMenu } from "./DropdownMenu";
import { EditPrinter } from "./EditPrinter";
import { EditMessage } from "./EditMessage";
import { EditJob } from "./EditJob";
import { EditStatus } from "./EditStatus";
import { UploadModal } from "./UploadModal";
import { BsClipboardData } from "react-icons/bs";
import { GrConnect } from "react-icons/gr";
import { AiOutlineDisconnect, AiOutlineStop } from "react-icons/ai";
import { VscDebugStart } from "react-icons/vsc";
import { ExportModal } from "./ExportModal";
// import { FaPrinter } from "react-icons/fa6";

export default function CardPrinter({ printer, status }) {
    const { ip_address, name } = printer;
    const [koneksi, setKoneksi] = useState("Disconnect");
    const [printerStatus, setPrinterStatus] = useState("N/A");
    const [openMessage, setOpenMessage] = useState(false);
    const [openPrinter, setOpenPrinter] = useState(false);
    const [openJob, setOpenJob] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [openExport, setOpenExport] = useState(false);
    const [markingCounter, setMarkingCounter] = useState(0);
    const [productCounter, setProductCounter] = useState(0);
    const [systemCounter, setSystemCounter] = useState(0);
    const [counter, setCounter] = useState(0);
    const [maxCounter, setMaxCounter] = useState(0);
    const [printCount, setPrintCount] = useState(0);
    const [collapsed, setCollapsed] = useState(true);
    const [msg, setMsg] = useState([]);
    useEffect(() => {
        try {
            if (status.length > 0) {


                const statusJson = JSON.parse(status);
                const newStatus = statusJson.find((s) => s.id === printer.id);
                setMarkingCounter(newStatus?.client?.markingCounter || 0);
                setProductCounter(newStatus?.client?.productCounter || 0);
                setSystemCounter(newStatus?.client?.systemCounter || 0);
                setPrinterStatus(newStatus?.client?.status);
                setCounter(newStatus?.client?.counter || 0);
                setMaxCounter(parseInt(newStatus.max_message));
                const cnt = (newStatus?.client?.systemCounter || 0) * parseInt(printer.product_sum);
                setPrintCount(cnt >= newStatus.max_message ? newStatus.max_message : cnt);
                if (newStatus?.client?.client?.connection && newStatus?.client?.client2.connection) {
                    setKoneksi("connected");
                } else setKoneksi("Disconnect");
                if (newStatus?.client?.messages) {
                    setMsg([])
                    const dtMsg = newStatus?.client?.messages;
                    dtMsg.forEach((m) => {
                        setMsg((prevMsg) => [...prevMsg, m.field_value]);

                    })
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }

    }, [status]);

    const handleStartPrinter = () => window.be.startPrint(printer);
    const handleStopPrinter = () => window.be.stopPrint(printer);

    return (
        <>
            <div className="w-full  mx-auto bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01]">
                {/* Header */}
                <div className={`flex items-center justify-between px-5 py-3 ${koneksi == "connected" ? "bg-green-500" : "bg-gray-500"}`}>
                    <div className="flex items-center gap-2">
                        {/* <FaPrinter className="text-xl" /> */}
                        <h2 className="text-lg text-white font-semibold">{name}</h2>
                    </div>
                    <DropdownMenu
                        printer={printer}
                        // editJob={() => setOpenJob(true)}
                        // editMessage={() => setOpenMessage(true)}
                        editPrinter={() => koneksi == "connected" ? "" : setOpenPrinter(true)}
                        deletePrinter={async () => {
                            const s = await window.be.deletePrinter(printer.id);
                            if (s === 0 || s === 1) window.location.reload();
                        }}
                        upload={() => setOpenUpload(true)}
                        exportxls={() => setOpenExport(true)}
                    />
                </div>

                {/* Status Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 text-sm text-gray-700 dark:text-gray-200">
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-500">Connection</span>
                        <span
                            className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full w-fit ${koneksi === "connected"
                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-100"
                                }`}
                        >
                            {koneksi}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-gray-500">Status</span>
                        <span
                            className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full w-fit ${printerStatus != "n/a"
                                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100"
                                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                }`}
                        >
                            {printerStatus}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-gray-500">IP Address</span>
                        <span className="mt-1 font-semibold">{ip_address}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-gray-500">System Counter</span>
                        <div className="flex items-center gap-2 mt-1">
                            <span>{systemCounter}</span>

                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-gray-500">Product Counter</span>
                        <span className="mt-1">{productCounter}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium text-gray-500">Marking Counter</span>
                        <span className="mt-1">{markingCounter}</span>
                    </div>
                    {/* Progress */}
                    <div className="col-span-2 md:col-span-3 mt-0">
                        <span className="text-gray-500 text-sm font-medium">Print Progress</span>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-1 overflow-hidden">
                            <div
                                className="h-3 bg-blue-600 rounded-full transition-all"
                                style={{ width: `${(printCount / maxCounter) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-right text-xs text-gray-500 mt-1">
                            {counter} / {maxCounter}
                        </p>
                    </div>
                    <div className="col-span-2 md:col-span-3 border-t border-gray-300 dark:border-gray-700 my-0"></div>

                    {/* <div className="col-span-2 md:col-span-3 border-t border-gray-300 dark:border-gray-700 my-2"></div> */}

                    {/* Connection Buttons */}
                    <div className="flex gap-3 col-span-2 md:col-span-3">

                        {/* CONNECT */}
                        <button
                            disabled={koneksi === "connected"}
                            onClick={() => window.be.connect(printer.id)}
                            className={`
                                        relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2 
                                        rounded-lg font-semibold text-white transition-all backdrop-blur-xl 
                                        border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]
                                        ${koneksi === "connected"
                                    ? "bg-green-400/30 opacity-40 cursor-not-allowed"
                                    : "bg-gradient-to-b from-green-400 to-green-600 hover:brightness-110"
                                }
                            `}
                        >
                            <GrConnect /> Connect
                            <span className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-40 pointer-events-none"></span>
                        </button>

                        {/* DISCONNECT */}
                        <button
                            disabled={koneksi !== "connected"}
                            onClick={() => window.be.disconnect(printer.id)}
                            className={`relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2 
                                        rounded-lg font-semibold text-white transition-all backdrop-blur-xl 
                                        border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]
                                        ${koneksi !== "connected"
                                    ? "bg-red-400/30 opacity-40 cursor-not-allowed"
                                    : "bg-gradient-to-b from-red-400 to-red-600 hover:brightness-110"
                                }
                            `}
                        >
                            <AiOutlineDisconnect /> Disconnect
                            <span className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-40 pointer-events-none"></span>
                        </button>

                        {/* START */}
                        <button
                            disabled={koneksi !== "connected"}
                            onClick={handleStartPrinter}
                            className={`
                                            relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2 
                                            rounded-lg font-semibold text-white transition-all backdrop-blur-xl 
                                            border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]
                                            ${koneksi !== "connected"
                                    ? "bg-blue-400/30 opacity-40 cursor-not-allowed"
                                    : "bg-gradient-to-b from-blue-400 to-blue-600 hover:brightness-110"
                                }
                            `}
                        >
                            <VscDebugStart /> Start
                            <span className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-40 pointer-events-none"></span>
                        </button>

                        {/* STOP */}
                        <button
                            disabled={koneksi !== "connected"}
                            onClick={handleStopPrinter}
                            className={`
                                            relative overflow-hidden flex-1 flex items-center justify-center gap-2 py-2 
                                            rounded-lg font-semibold text-white transition-all backdrop-blur-xl 
                                            border border-white/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]
                                            ${koneksi !== "connected"
                                    ? "bg-yellow-400/30 opacity-40 cursor-not-allowed"
                                    : "bg-gradient-to-b from-yellow-400 to-yellow-600 hover:brightness-110"
                                }
                            `}

                        >
                            <AiOutlineStop /> Stop
                            <span className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent opacity-40 pointer-events-none"></span>
                        </button>

                    </div>

                    <div className="flex flex-col col-span-2 md:col-span-3">
                        {/* Tombol toggle */}
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-sm text-blue-600 dark:text-blue-400 mb-2 self-start hover:underline"
                        >
                            {collapsed ? "Show Messages" : "hide"}
                        </button>

                        {/* Kontainer list */}
                        <div
                            className={`transition-all duration-300 overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700  overflow-y-auto ${collapsed ? "max-h-25" : "max-h-96"}`}
                        >
                            { }
                            <div className="flex flex-wrap gap-2 col-span-2 md:col-span-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700  overflow-y-auto ">
                                {msg.map((_, i) => (
                                    <p
                                        key={i}
                                        className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-2 py-1 rounded shadow-sm"
                                    >
                                        {msg[i]}
                                    </p>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

                {/* Modals */}
            </div>
            <EditPrinter printer={printer} openPrinter={openPrinter} setOpenPrinter={setOpenPrinter} />
            <EditMessage printer={printer} openMessage={openMessage} setOpenMessage={setOpenMessage} />
            <EditJob printer={printer} openJob={openJob} setOpenJob={setOpenJob} />
            <EditStatus status={status} printer={printer} openStatus={openStatus} setOpenStatus={setOpenStatus} />
            <UploadModal printer={printer} openUpload={openUpload} setOpenUpload={setOpenUpload} />
            <ExportModal printer={printer} openExport={openExport} setOpenExport={setOpenExport} />
        </>

    );
}
