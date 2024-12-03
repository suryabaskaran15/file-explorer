import React from 'react';

interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                <h2 className="text-lg font-semibold mb-4">Alert</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
