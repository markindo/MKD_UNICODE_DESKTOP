import { useState, useEffect } from "react";
import { AddJob } from "./componentxx/AddJob";
import { EditJobName } from "./componentxx/EditJobName";
import { SettingJob } from "./componentxx/SettingJob";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
export function Job() {
    const [openJob, setOpenJob] = useState(false);
    const [jobs, setJobs] = useState([]);


    useEffect(() => {
        loadJob();
    }, [])
    const loadJob = async () => {
        const data = await window.be.getJobs()
        setJobs(data);
        console.log("Data Jobs", data)
    }

    const handleDelete = (id) => {
        window.be.deleteJob(id)
        console.log("Job deleted with ID:", id);
        window.location.reload();
    };


    const handleAddJob = () => {
        setOpenJob(true);
        console.log("Add Job clicked");
    }



    return (
        <>

            <AddJob openJob={openJob} setOpenJob={setOpenJob} />
            {/* {
                jobs.map((job, index) => (
                    <EditJobName key={index} job={job} openEditJob={openEditJob} setOpenEditJob={setOpenEditJob} />
                ))
            } */}
            <div className=" h-screen bg-gray-100">
                <br />
                <br />
                <br />

                <div className="bg-white shadow-lg rounded  m-6 ">
                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-1">
                        <h2 className="text-2xl ml-2 font-bold ">Daftar Job</h2>
                    </div>

                    <button className="m-3 bg-blue-800 hover:bg-blue-950 text-white px-4 py-2 rounded-md" onClick={handleAddJob}> Add Job +</button>

                    <div className="p-3">
                        <table className="  w-full rounded-lg overflow-auto    ">
                            <thead>
                                <tr className="bg-blue-900 text-white">
                                    <th className=" px-4 py-2">No</th>
                                    <th className=" px-4 py-2">Nama Job</th>
                                    <th className=" px-4 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job, index) => (

                                    <tr key={index}
                                        className={`${index % 2 === 0 ? "bg-blue-100" : "bg-gray-50"} hover:bg-blue-300`} // striping
                                    >
                                        <td className=" px-4 py-2 text-center">{index + 1}</td>
                                        <td className=" px-4 py-2">{job.name}</td>
                                        <td className="flex items-center  justify-center px-4 py-2 text-center space-x-2">
                                            <SettingJob job={job}></SettingJob>


                                            <FaRegTrashAlt
                                                onClick={() => handleDelete(job.id)}
                                                className=" cursor-pointer text-2xl text-red-500 hover:text-red-600"
                                            >

                                            </FaRegTrashAlt >
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <EditJobName job={job} openEditJob={openEditJob} setOpenEditJob={setOpenEditJob} /> */}
                    </div>
                </div>

            </div>
        </>
    );

}
