import React, { useState } from 'react';
import { EditJobName } from './EditJobName';
import { FaRegEdit } from 'react-icons/fa';

export function SettingJob({ job }) {
    const [openEditJobName, setOpenEditJobName] = useState(false);
    const handleEditJob = () => {
        setOpenEditJobName(true);
        console.log("Edit Job:", job);
    }
    return (
        <> <EditJobName job={job} openEditJob={openEditJobName} setOpenEditJob={setOpenEditJobName} />

            <FaRegEdit className='text-green-700 text-2xl cursor-pointer'
                onClick={handleEditJob}

            >

            </FaRegEdit >
        </>
    )
}