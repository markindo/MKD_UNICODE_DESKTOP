import { ModalAll } from "./ModalAll";
import React, { useState } from "react";

export const EditMessage = ({ printer, openMessage, setOpenMessage }) => {

    // const { ip_address, port, name, id } = printer;
    const [messages, setMessages] = useState("");
    const [targetCount, setTargetCount] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            targetCount: targetCount,
            messages: messages,
            id: printer.id
        }
        console.log("Data Message to update:", data);
        window.be.sendMessage(data)
        setOpenMessage(false);
        //window.location.reload();
        //console.log("Data to update:", data);
    }

    //const [openPrinter, setOpenPrinter] = useState(false);
    return (
        <>
            <ModalAll isOpen={openMessage} onClose={() => setOpenMessage(false)}>
                <h1 className="text-2xl font-bold mb-4">Realtime Messages</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="block text-sm font-medium">Input Message</label>
                        <textarea
                            type="text-area"
                            name="messages"
                            value={messages}
                            onChange={(e) => setMessages(e.target.value)}
                            placeholder=""
                            className="w-full px-3 py-2 border rounded-lg"
                            max={100}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Target Counter Data</label>
                        <input
                            type="number"
                            name="targetCount"
                            value={targetCount}
                            onChange={(e) => setTargetCount(e.target.value)}
                            placeholder=""
                            className="w-full px-3 py-2 border rounded-lg"
                            max={10000000}
                            required
                        />
                    </div>
                    <span span className="text-1xl font-bold mt-2">Setting pada Printer MKZ S :</span >
                    <ol>
                        <li>1. Klik Edit  </li>
                        <li>2. Pilih Tab content</li>
                        <li>3. pilih realtime data</li>
                        <li>4. Select  Field  yang digunakan</li>
                        <li>5. Klik Simpan</li>
                        <li>6. Untuk multiple field tambahkan koma (,) sebagai pemisah field</li>


                    </ol>

                    <button

                        type="submit"
                        className="mt-3 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                    >
                        Kirim Ke Printer
                    </button>
                </form>
            </ModalAll></>
    )

}