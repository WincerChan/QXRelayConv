import fetcher from "@/utils/swr_fetcher"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Toast from "./toast"

interface RuleType {
    id: number,
    suffix: string
}

const RuleList = ({ submit }: { submit: boolean }) => {
    const { data, mutate } = useSWR<RuleType[]>("/api/rules", fetcher)
    const [notice, setNotice] = useState(false)

    if (submit) {
        mutate()
    }
    const deleteRule = (id: number) => {
        fetch(`/api/rules/${id}`, {
            method: 'delete'
        })
            .then(x => { console.log(x.statusText); setNotice(true); mutate() })
    }

    if (!data) return <></>

    return (
        <>
            <Toast name="删除成功" show={notice} setShow={setNotice} />
            <div className='w-[640px] mx-auto grid grid-cols-3 gap-x-6'>
                {
                    data.map(
                        (v) => (
                            <div key={v.id} className='w-full flex space-x-4 py-4'>
                                <span style={{ overflow: 'hidden', width: "72%" }} className='text-ellipsis '>{v.suffix}</span>
                                <button className='' onClick={() => deleteRule(v.id)}>
                                    <Icon icon="solar:trash-bin-minimalistic-2-broken" className='w-6 h-6' />
                                </button>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
}



const RelayDomains = ({ show }: { show: boolean }) => {
    const [submit, setSubmit] = useState(false)
    const [notice, setNotice] = useState(false)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle the submission logic here
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const response = await fetch('/api/rules', {
            method: "post",
            body: JSON.stringify(data)
        })
        const ret = await response.json()
        setSubmit(true)
        setTimeout(() => setSubmit(false), 100)
    };
    useEffect(() => {
        if (submit) setNotice(true)
    }, [submit])

    return (
        <>
            <h2 id="域名" className="text-3xl mt-6 text-center mb-8">中转域名配置</h2>
            <Toast name="提交成功" show={notice} setShow={setNotice} />
            <form onSubmit={handleSubmit} className="space-y-6 w-[640px] flex mx-auto justify-center pb-6">
                <div className='flex flex-grow space-x-8 mr-8'>
                    <div className='w-full'>
                        <label htmlFor="chineseAddress" className="text-sm font-medium text-gray-700 block mb-2">中转域名</label>
                        <input
                            type="text"
                            name="suffix"
                            className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                            placeholder="请输入中转域名"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-0 space-x-8 pt-1">
                    <button
                        disabled={!show}
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center"
                    >
                        提交
                    </button>
                </div>
            </form>
            <RuleList submit={submit} />
        </>
    )
}

export default RelayDomains;