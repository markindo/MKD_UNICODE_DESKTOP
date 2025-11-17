import { ModalAll } from "../Home/component/ModalAll";
import React, { useState } from "react";

export const EditJobName = ({ job, openEditJob, setOpenEditJob }) => {

    // const { ip_address, port, name, id } = printer;
    const [name, setName] = useState(job.name);



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: job.id,
            name: name,

        }
        // window.be.EditJob(data)
        // window.location.reload();

        window.be.editJob(data)
        console.log("Data Job Edit:", data);
        // window.location.reload();
        setOpenEditJob(false)
        //console.log("Data to update:", data);
    }

    //const [openPrinter, setOpenPrinter] = useState(false);
    return (
        <div className="text-left ">
            <ModalAll isOpen={openEditJob} onClose={() => setOpenEditJob(false)} >
                <h1 className="text-2xl font-bold mb-4">Edit Job </h1>
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
            </ModalAll>
        </div>
    )

}