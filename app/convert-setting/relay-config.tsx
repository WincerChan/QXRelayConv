import fetcher from '@/utils/swr_fetcher';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import RelayDomains from './components/relay_domains';
import SubButtons from './components/sub_buttons';
import Toast from './components/toast';



const RelayConvertPage = () => {
    const [show, setShow] = useState(false);
    const [groupUrl, setGroupUrl] = useState("")
    const { data, error, isLoading } = useSWR(groupUrl, fetcher)
    const [relayName, setRelayName] = useState("")
    const [notice, setNotice] = useState(false)

    useEffect(() => {
        if (data) setRelayName(data.group)
    }, [data])

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
            setGroupUrl("/api/group")
        }, 0);
        return () => clearTimeout(timer);
    }, []);


    const handleRelaySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.currentTarget;
        const response = await fetch('/api/group', {
            method: "PUT",
            body: JSON.stringify({
                "group": target.group.value
            })
        });
        const ret = await response.json();
        setNotice(true)
    };


    return (
        <div className={`transition-opacity duration-500  ${show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <Toast name="提交成功" show={notice} setShow={setNotice} />
            <h2 id="节点" className="text-3xl text-center mb-8">中转节点配置</h2>
            <div className='w-[640px] mt-2 space-x-2 flex items-center  justify-center mx-auto text-lg mb-10'>
                <form onSubmit={handleRelaySubmit} className='flex items-center justify-between w-full'>
                    <div className='w-56'>
                        <label htmlFor="englishAddress" className="text-sm font-medium text-gray-700 block mb-2">落地节点名称</label>
                        <input
                            type="text"
                            disabled={!show}
                            name="group"
                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="请输入节点名称"
                            value={relayName}
                            onChange={e => setRelayName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex space-x-8 h-[42px] pt-1">
                        <button
                            disabled={!show}
                            type="submit"
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center"
                        >
                            提交
                        </button>
                    </div>
                </form>
            </div>

            <RelayDomains show={show} />

            <SubButtons />
        </div>
    );
};

export default RelayConvertPage;
