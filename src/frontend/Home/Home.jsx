// import { ipcRenderer } from "electron";

import CardPrinter from "./component/CardPrinter";
import { AddPrinter } from "./component/AddPrinter";
import { useEffect, useState } from "react";
export function Home() {
    const [openPrinter, setOpenPrinter] = useState(false);
    const [status, setStatus] = useState([]);
    const [printers, setPrinters] = useState([]);
    useEffect(() => {
        loadPrinters();
    }, [])
    useEffect(() => {
        loadPrinters();
        window.be.onStatus((msg) => {
            setStatus(msg)
        });
    }, [])
    const loadPrinters = async () => {
        const data = await window.be.getPrinters()
        console.log(data)
        setPrinters(data);
    }
    const handleAddPrinter = () => {
        setOpenPrinter(!openPrinter);
    }

    return (
        <div >



            <br></br><br /><br />
            <button
                className="
                    relative overflow-hidden
                    px-4 py-2 ml-4
                    rounded-md
                    text-white font-medium
                   bg-gradient-to-r from-[#0a3d62]/90 via-[#0c4a7c]/90 to-[#0a3d62]/80
                    border border-[#9fc7f9]/60
                    shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),_0_2px_6px_rgba(0,0,0,0.4)]
                    hover:brightness-110
                    active:scale-95
                    transition-all duration-200
                    cursor-pointer
                "
                onClick={handleAddPrinter}
            >
                Add Printer +

                {/* Shine / Refleksi Aero */}
                <span className="pointer-events-none absolute inset-0
                                    bg-gradient-to-t from-white/30 to-transparent
                                    opacity-50
                                    rounded-md
                                "></span>
            </button>


            {/* <Uploadexcel></Uploadexcel> */}
            <div className="grid grid-cols-2 gap-2 p-4">
                {printers.map((printer, index) => (
                    <CardPrinter key={index} printer={printer} status={status} />
                ))}

            </div>

            <AddPrinter openPrinter={openPrinter} setOpenPrinter={setOpenPrinter}></AddPrinter>

        </div>
    );
}

