// Modal.jsx
export function ModalLogin({ isOpen, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
                {/* Tombol Close */}

                {children}
            </div>
        </div>
    );
}
