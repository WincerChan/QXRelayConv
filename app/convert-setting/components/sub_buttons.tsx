import { useEffect, useState } from "react"
import Toast from "./toast"

const SubButtons = () => {
    const [serverSub, setServerSub] = useState('')
    const [ruleSub, setRuleSub] = useState('')
    const [resetSub, setResetSub] = useState('')
    const [notice, setNotice] = useState(false)
    useEffect(() => {
        if (!!serverSub || !!ruleSub || !!resetSub) setNotice(true)
    }, [serverSub, ruleSub, resetSub])
    const serverSubHandler = async () => {
        fetch(`/api/get-sub?type=group_token`).then(data => data.json())
            .then(async x => {
                setServerSub(x.uuid)
                setTimeout(() => setServerSub(""), 1000)
                await navigator.clipboard.writeText(encodeURI(`${document.location.protocol}//${document.location.host}/api/group/${x.uuid}`))
            })
            .catch(x => setServerSub(''))
    }
    const ruleSubHandler = () => {
        fetch(`/api/get-sub?type=rule_token`).then(data => data.json())
            .then(async x => {
                setRuleSub(x.uuid)
                setTimeout(() => setRuleSub(""), 1000)
                await navigator.clipboard.writeText(encodeURI(`${document.location.protocol}//${document.location.host}/api/subs/${x.uuid}?type=rule`))
            })
            .catch(x => setRuleSub(''))
    }
    const resetSubHandler = () => {
        const sure = confirm("当前所有订阅均会失效，确定？")
        if (sure)
            fetch(`/api/get-sub`, { method: "DELETE" }).then(() => setResetSub("ok")).catch(x => setResetSub(""))
    }
    return (
        <>
            <div className='w-[640px] mt-8 mx-auto grid grid-cols-3 gap-6'>
                {serverSub && <Toast name="复制节点成功" show={notice} setShow={setNotice} />}
                {ruleSub && <Toast name="复制规则成功" show={notice} setShow={setNotice} />}
                {resetSub && <Toast name="重制成功" show={notice} setShow={setNotice} />}
                <button onClick={serverSubHandler} className='rounded-lg py-4 px-6 bg-green-400 hover:bg-green-500 font-medium text-white flex justify-center items-center'>
                    节点订阅（有效期 5 分钟）
                </button>
                <button onClick={ruleSubHandler} className=' rounded-lg py-4 px-6 bg-amber-400 hover:bg-amber-500 font-medium text-white'>规则订阅</button>
                <button onClick={resetSubHandler} className=' rounded-lg py-4 px-6 bg-red-500 hover:bg-red-600 font-medium text-white'>重制所有订阅</button>
            </div >
        </>
    )
}


export default SubButtons;