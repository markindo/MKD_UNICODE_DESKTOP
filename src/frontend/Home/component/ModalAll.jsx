// Modal.jsx
export function ModalAll({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg w-130 p-6 relative">
                {/* Tombol Close */}
                {/* <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl"
                >
                    &times;
                </button> */}
                {children}
            </div>
        </div>
    );
}
