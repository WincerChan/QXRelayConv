import { Icon } from "@iconify/react";
import React, { useEffect } from "react";

interface ToastProps {
    show: boolean;
    name: string;
    setShow: (show: boolean) => void;
}

const Toast: React.FC<ToastProps> = ({ show, name, setShow }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000); // Increased duration slightly for better readability
            return () => clearTimeout(timer);
        }
    }, [show, setShow]);

    if (!show) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate__animated animate__slideInRight animate__faster">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <Icon icon="solar:check-circle-bold" className="w-5 h-5" />
                <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal text-foreground">{name}</div>
            <button 
                onClick={() => setShow(false)} 
                type="button" 
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" 
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;