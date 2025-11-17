import { ModalAll } from "./ModalAll";
import React, { useState, useEffect } from "react";

export const EditJob = ({ printer, openJob, setOpenJob }) => {
    // const jobs = [
    //     { id: 1, name: "Job 1" },
    //     { id: 2, name: "Job 2" },
    //     { id: 3, name: "Job 3" },
    // ]

    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        loadJob();
    }, [])
    const loadJob = async () => {
        setJobs([])
        // // const data = await window.be.getJobs()
        // // setJobs(data);
        // console.log("Data Jobs", data)
    }



    // const { ip_address, port, name, id } = printer;
    const [selected, setSelected] = useState("");



    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            job: selected,
            id: printer.id
        }
        console.log("Data Job to update:", data);
        window.be.selectJob(data)
        // window.location.reload();
        setOpenJob(false)
        //console.log("Data to update:", data);
    }

    //const [openPrinter, setOpenPrinter] = useState(false);
    return (
        <>
            <ModalAll isOpen={openJob} onClose={() => setOpenJob(false)}>
                <div className="p-4">
                    <label className="block text-sm font-medium mb-1">Pilih Job</label>
                    <select
                        value={selected}
                        onChange={(e) => setSelected(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">-- Pilih  Job --</option>
                        {jobs.map((job) => (
                            <option key={job.id} value={job.name}>
                                {job.name}
                            </option>
                        ))}
                    </select>
                    <button

                        onClick={handleSubmit}
                        className="mt-3 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                    >
                        Kirim Ke Printer
                    </button>

                </div>

            </ModalAll></>
    )

}