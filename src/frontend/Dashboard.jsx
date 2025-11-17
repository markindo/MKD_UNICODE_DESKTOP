// import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";


import CardPrinter from "./componentxx/CardPrinter";
import { AddPrinter } from "./componentxx/AddPrinter";
export function Dashboard({ login }) {
    const [printers, setPrinters] = useState([]);
    const [openPrinter, setOpenPrinter] = useState(false);
    const [status, setStatus] = useState([]);
    const handleAddPrinter = () => {
        setOpenPrinter(!openPrinter);
    }
    useEffect(() => {
        loadPrinters();
        window.be.onStatus((msg) => {
            //console.log(msg); // "pong 🏓 dari main process"
            setStatus(msg)
            //    console.log("Status:", status)
        });
    }, [])

    const loadPrinters = async () => {
        const data = await window.be.getPrinters()
        setPrinters(data);
    }

    return (
        <div className={`${login == true ? 'hidden' : ''}`}>



            <br></br><br /><br />
            <button className="bg-blue-900 text-white px-4 py-2 rounded-md ml-4" onClick={handleAddPrinter}> Add Printer +</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 p-4">
                {printers.map((printer, index) => (
                    <CardPrinter key={index} printer={printer} status={status} />
                ))}

            </div>

            {/* <AddPrinter open={openPrinter} setOpen={setOpenPrinter} /> */}
            <AddPrinter openPrinter={openPrinter} setOpenPrinter={setOpenPrinter}></AddPrinter>

        </div>
    );
}

