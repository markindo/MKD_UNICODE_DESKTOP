import { ModalAll } from "../Home/component/ModalAll";
import React, { useState } from "react";

export const AddJob = ({ openJob, setOpenJob }) => {

    // const { ip_address, port, name, id } = printer;
    const [name, setName] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: name,

        }
        window.be.addJob(data)
        window.location.reload();
        console.log("Data Job Add:", data);
        //window.be.editPrinter(data)
        //window.location.reload();
        //console.log("Data to update:", data);
    }

    //const [openPrinter, setOpenPrinter] = useState(false);
    return (
        <>
            <ModalAll isOpen={openJob} onClose={() => setOpenJob(false)}>
                <h1 className="text-2xl font-bold mb-4">ADD JOB</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    <div>
                        <label className="block text-sm font-medium">Nama Job</label>
                        <input
                            type="text"
                            name="messages"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=""
                            className="w-full px-3 py-2 border rounded-lg"
                            max={100}
                            required
                        />
                    </div>

                    <p><b>Notes :</b> Sesuaikan Nama Job dengan nama file Yang Terdapat pada Printer</p>

                    <button

                        type="submit"
                        className="mt-3 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                    >
                        SIMPAN
                    </button>
                </form>
            </ModalAll></>
    )

}