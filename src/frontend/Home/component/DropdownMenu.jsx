import { useState } from "react";
import { GrConfigure } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import { GrConnect } from "react-icons/gr";
import { AiOutlineDisconnect } from "react-icons/ai";
import { FaHelmetSafety } from "react-icons/fa6";
import { FaEnvelopeOpenText, FaUpload, FaDownload } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
export function DropdownMenu({ editPrinter, deletePrinter, upload, exportxls }) {
    // const { ip_address, port, name, id } = printer;
    const [open, setOpen] = useState(false);




    return (
        <div className="relative inline-block text-left">
            {/* Tombol */}
            <div className="cursor-pointer flex " onClick={() => setOpen(!open)}>
                <GrConfigure className="text-white" ></GrConfigure>
                <MdArrowDropDown className="text-white" />
            </div>

            {/* Isi Dropdown */}
            {open && (
                <div className="absolute right-0 mt-1 w-44 origin-top-right rounded-md bg-white font-bold shadow-lg ring-1  ring-opacity-5 z-10">
                    <div className="py-1">

                        <div
                            onClick={() => {
                                setOpen(false);
                                editPrinter();
                            }}
                            className="flex px-4 py-1 text-sm text-blue-500 hover:bg-gray-100 font-bold cursor-pointer"
                        >
                            <MdEdit className="mr-2"
                            />   Edit Printer
                        </div>
                        <div
                            onClick={() => {
                                setOpen(false);
                                deletePrinter();
                            }}
                            className="flex px-4 py-1 text-sm text-red-500 hover:bg-gray-100  cursor-pointer"
                        >
                            <FaHelmetSafety className="mr-2"
                            />   Delete Printer
                        </div>
                        <div
                            onClick={() => {
                                setOpen(false);
                                upload();
                            }}
                            className="flex px-4 py-1 text-sm text-orange-500 hover:bg-gray-100 font-bold cursor-pointer"
                        >
                            <FaUpload className="mr-2"
                            />  Upload File
                        </div>
                        <div
                            onClick={() => {
                                setOpen(false);
                                exportxls();
                            }}
                            className="flex px-4 py-1 text-sm text-green-500 hover:bg-gray-100 font-bold cursor-pointer"
                        >
                            <FaDownload className="mr-2"
                            />  Export XLS
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    );
}
