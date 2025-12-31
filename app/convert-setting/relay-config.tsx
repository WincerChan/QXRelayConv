import fetcher from '@/utils/swr_fetcher';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import RelayDomains from './components/relay_domains';
import SubButtons from './components/sub_buttons';
import Toast from './components/toast';
import { Icon } from '@iconify/react';

const RelayConvertPage = () => {
    const [show, setShow] = useState(false);
    const [groupUrl, setGroupUrl] = useState("")
    const { data } = useSWR(groupUrl, fetcher)
    const [relayName, setRelayName] = useState("")
    const [notice, setNotice] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (data) setRelayName(data.group)
    }, [data])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
            setGroupUrl("/api/group")
        }, 100);
        return () => clearTimeout(timer);
    }, []);


    const handleRelaySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const target = event.currentTarget;
        const response = await fetch('/api/group', {
            method: "PUT",
            body: JSON.stringify({
                "group": target.group.value
            })
        });
        await response.json();
        setLoading(false);
        setNotice(true);
    };


    return (
        <div className={`space-y-8 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
            <Toast name="节点名称修改成功" show={notice} setShow={setNotice} />
            
            <div className="bg-card border shadow-sm rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b bg-muted/20">
                    <h2 className="text-lg font-medium text-card-foreground">节点基本配置</h2>
                    <p className="text-sm text-muted-foreground">设置落地节点的显示名称</p>
                </div>
                
                <div className="p-6">
                    <form onSubmit={handleRelaySubmit} className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1 w-full space-y-2">
                            <label htmlFor="group" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                落地节点名称
                            </label>
                            <input
                                type="text"
                                disabled={!show}
                                id="group"
                                name="group"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="例如: AWS-US-East"
                                value={relayName}
                                onChange={e => setRelayName(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            disabled={!show || loading}
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto min-w-[100px]"
                        >
                            {loading && <Icon icon="line-md:loading-loop" className="mr-2 h-4 w-4 animate-spin" />}
                            更新名称
                        </button>
                    </form>
                </div>
            </div>

            <RelayDomains show={show} />

            <SubButtons />
        </div>
    );
};

export default RelayConvertPage;