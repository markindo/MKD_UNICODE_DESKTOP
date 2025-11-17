import { ModalAll } from "./ModalAll";
import React, { useEffect, useState } from "react";


export const EditStatus = ({ status, printer, openStatus, setOpenStatus }) => {

    // const { ip_address, port, name, id } = printer;

    const [printerStatus, setPrinterStatus] = useState("");
    const [printCount, setPrintCount] = useState(0);
    // const [triggerCount, setTriggerCount] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [ink1, setInk1] = useState(0);
    const [ink2, setInk2] = useState(0);
    const [errorStatus, setErrorStatus] = useState("");
    useEffect(() => {
        if (status && status.length > 0) {
            const statusJson = JSON.parse(status);
            const newStatus = statusJson.find((s) => s.id === printer.id);
            // setTriggerCount(newStatus.triggerCount);
            //   setPrintCount(newStatus.printCount - 1);
            // setSpeed(newStatus.speed);
            // setInk1(newStatus.ink1);
            // setInk2(newStatus.ink2);
            // setPrinterStatus(newStatus.status);
            // setErrorStatus(newStatus.errorStatus);

        }


        //if (status) {

        // setSpeed(status.speed);
        // setInk1(status.ink1);
        // setInk2(status.ink2);
        //}
    }, [status])



    //const [openPrinter, setOpenPrinter] = useState(false);
    return (
        <>
            <ModalAll isOpen={openStatus} onClose={() => setOpenStatus(false)}>
                <h1 className="text-2xl font-bold mb-4">Show Data Printer</h1>
                <table className="w-full text-left rounded-lg overflow-hidden">
                    <tbody>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">IP Address</td>
                            <td className="px-4 py-2">{printer.ip_address}</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Port</td>
                            <td className="px-4 py-2">{printer.port}</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Name</td>
                            <td className="px-4 py-2">{printer.name}</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Printer Status</td>
                            <td className="px-4 py-2">{printerStatus}</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Print Count</td>
                            <td className="px-4 py-2">{printCount < 0 ? 0 : printCount}</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Speed</td>
                            <td className="px-4 py-2">{speed}m/menit</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Catridge 1</td>
                            <td className="px-4 py-2">{ink1} %</td>
                        </tr>
                        <tr className="odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Catridge 2</td>
                            <td className="px-4 py-2">{ink2} %</td>
                        </tr>
                        <tr className="hidden odd:bg-blue-50/50 even:bg-gray-50/50 hover:bg-blue-100/70 cursor-pointer">
                            <td className="px-4 py-2 font-medium">Error</td>
                            <td className="px-4 py-2">{errorStatus}</td>
                        </tr>
                    </tbody>
                </table>
            </ModalAll></>
    )

}