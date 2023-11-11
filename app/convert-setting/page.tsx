"use client"
import fetcher from "@/utils/swr_fetcher";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from 'react';
import useSWR from "swr";
const RelayComp = dynamic(() => import('./relay-config'))

interface RelayReadyData {
    enabled: boolean;
    msg: string
}


const StatusPage: React.FC = () => {
    // State to manage the toggle status, assuming true as default for demonstration
    const [checked, setChecked] = useState(false);

    const { data, error, isLoading } = useSWR<RelayReadyData>("/api/is-relay-ready", fetcher)

    useEffect(() => {
        if (!isLoading && data && data.enabled) {
            setTimeout(() => setChecked(true), 200)
        }
    }, [isLoading])

    return (
        <main className='p-8 xl:w-[1200px] mx-auto min-h-screen'>
            <h1 className="text-2xl font-bold mb-16">Quantumult X Relay Convert</h1>
            {!checked && <div className="flex items-center text-xl justify-center ">
                <div className="p-8 rounded-lg space-y-8 mb-40 h-12">
                    {isLoading &&
                        <div className="flex items-center space-x-4">
                            <Icon className="w-6 h-6 text-yellow-600" icon="eos-icons:hourglass" />
                            <span>正在检测是否开启中转</span>
                        </div>
                    }
                    {
                        !isLoading && data && data.enabled && !checked &&
                        <div className="flex items-center space-x-4">
                            <Icon className="w-6 h-6 text-green-500" icon="solar:check-circle-broken" />
                            <span>已识别到本服务器代理</span>
                        </div>
                    }
                    {
                        !isLoading && data && !data.enabled &&
                        <div className="flex items-center space-x-4">
                            <span>❗️服务器代理配置错误：{data.msg}，请修正后再试</span>
                        </div>
                    }
                </div>
            </div>}
            {checked && <RelayComp />}
        </main>
    );
};

export default StatusPage;
