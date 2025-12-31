"use client"
import fetcher from "@/lib/swr_fetcher";
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
    const [checked, setChecked] = useState(false);
    const { data, error, isLoading } = useSWR<RelayReadyData>("/api/is-relay-ready", fetcher)

    useEffect(() => {
        if (!isLoading && data && data.enabled) {
            // Keep the small delay for smooth transition feel
            setTimeout(() => setChecked(true), 200)
        }
    }, [isLoading, data])

    return (
        <main className='min-h-screen bg-muted/40 py-12 px-4 sm:px-6 lg:px-8'>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                     <h1 className="text-3xl font-bold tracking-tight text-foreground">Quantumult X Relay Convert</h1>
                     <p className="text-muted-foreground mt-2">配置您的中转节点与规则</p>
                </div>

                {!checked && (
                    <div className="flex flex-col items-center justify-center py-20 animate__animated animate__zoomIn animate__faster">
                        <div className="bg-card border shadow-sm rounded-xl p-8 max-w-lg w-full text-center space-y-4">
                            {isLoading && (
                                <div className="flex flex-col items-center space-y-4">
                                    <Icon className="w-12 h-12 text-primary animate-spin" icon="eos-icons:loading" />
                                    <span className="text-lg font-medium">正在检测服务器环境...</span>
                                </div>
                            )}
                            
                            {!isLoading && data && data.enabled && !checked && (
                                <div className="flex flex-col items-center space-y-4">
                                    <Icon className="w-12 h-12 text-green-500" icon="solar:check-circle-bold" />
                                    <span className="text-lg font-medium">环境检测通过</span>
                                </div>
                            )}

                            {!isLoading && (data?.enabled === false || error) && (
                                <div className="flex flex-col items-center space-y-4">
                                    <Icon className="w-12 h-12 text-destructive" icon="solar:danger-triangle-bold" />
                                    <div className="text-destructive font-medium">
                                        检测失败
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {data?.msg || "无法连接到 API，请检查网络或服务器日志。"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {checked && (
                    <div className="animate__animated animate__fadeInUp">
                        <RelayComp />
                    </div>
                )}
            </div>
        </main>
    );
};

export default StatusPage;