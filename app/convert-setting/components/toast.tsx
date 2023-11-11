import { Icon } from "@iconify/react";
import React from "react";

// 定义组件的 Props 类型
interface ToastProps {
    show: boolean;
    name: string;
    setShow: (show: boolean) => void;
}

const Toast: React.FC<ToastProps> = ({ show, name, setShow }) => {
    if (!show) return <></>;
    setTimeout(() => {
        setShow(false);
    }, 990);
    return (
        <div className='fixed animate__faster animate__fadeInUp animate__animated text-lg bottom-24 left-24 flex bg-green-500 px-6 py-4 rounded-lg shadow-lg text-gray-50 items-center'>
            <span>{name}</span>
            <Icon className='w-6 h-6 ml-2' icon="solar:check-circle-broken" />
        </div>
    );
};

export default Toast;
