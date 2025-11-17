import { ModalAll } from "./ModalAll"
import Uploadexcel from "./Uploadexcel"
import { MdOutlineClose } from "react-icons/md";
export function UploadModal({ openUpload, setOpenUpload, printer }) {

    return (<>
        <ModalAll isOpen={openUpload} onClose={() => setOpenUpload(false)}>
            {/* <button
                onClick={() => setOpenUpload(false)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition float-right"
            >
                <MdOutlineClose className="text-xl text-gray-600 dark:text-gray-300" />

            </button> */}
            <div className="w-full h-full">
                <Uploadexcel printer={printer} setOpenUpload={setOpenUpload}></Uploadexcel>
            </div>

        </ModalAll></>
    )

}