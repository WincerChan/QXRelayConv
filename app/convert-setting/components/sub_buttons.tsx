import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"
import Toast from "./toast"

const SubButtons = () => {
    const [serverSub, setServerSub] = useState('')
    const [ruleSub, setRuleSub] = useState('')
    const [resetSub, setResetSub] = useState('')
    const [notice, setNotice] = useState(false)
    const [loading, setLoading] = useState<string | null>(null);

    useEffect(() => {
        if (!!serverSub || !!ruleSub || !!resetSub) setNotice(true)
    }, [serverSub, ruleSub, resetSub])

    const serverSubHandler = async () => {
        setLoading('server');
        try {
            const data = await fetch(`/api/get-sub?type=group_token`).then(data => data.json())
            setServerSub(data.uuid)
            await navigator.clipboard.writeText(encodeURI(`${document.location.protocol}//${document.location.host}/api/group/${data.uuid}`))
            setTimeout(() => setServerSub(""), 1000)
        } catch (e) {
            setServerSub('')
        } finally {
            setLoading(null);
        }
    }

    const ruleSubHandler = async () => {
        setLoading('rule');
        try {
            const data = await fetch(`/api/get-sub?type=rule_token`).then(data => data.json())
            setRuleSub(data.uuid)
            await navigator.clipboard.writeText(encodeURI(`${document.location.protocol}//${document.location.host}/api/subs/${data.uuid}?type=rule`))
            setTimeout(() => setRuleSub(""), 1000)
        } catch (e) {
            setRuleSub('')
        } finally {
            setLoading(null);
        }
    }

    const resetSubHandler = async () => {
        const sure = confirm("当前所有订阅均会失效，确定要重置吗？")
        if (sure) {
            setLoading('reset');
            try {
                await fetch(`/api/get-sub`, { method: "DELETE" })
                setResetSub("ok")
            } catch (e) {
                setResetSub("")
            } finally {
                setLoading(null);
            }
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 pb-20">
            {serverSub && <Toast name="节点订阅已复制" show={notice} setShow={setNotice} />}
            {ruleSub && <Toast name="规则订阅已复制" show={notice} setShow={setNotice} />}
            {resetSub && <Toast name="订阅已重置" show={notice} setShow={setNotice} />}
            
            <button 
                onClick={serverSubHandler} 
                disabled={loading !== null}
                className="group relative flex flex-col items-center justify-center space-y-2 rounded-xl border border-input bg-card p-6 shadow-sm hover:shadow-md hover:bg-accent/50 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 group-hover:scale-110 transition-transform">
                     {loading === 'server' ? <Icon icon="line-md:loading-loop" className="w-6 h-6 animate-spin"/> : <Icon icon="solar:server-square-cloud-bold" className="w-6 h-6" />}
                </div>
                <div className="space-y-1">
                    <h3 className="font-medium leading-none">节点订阅</h3>
                    <p className="text-xs text-muted-foreground">有效期 5 分钟</p>
                </div>
            </button>

            <button 
                onClick={ruleSubHandler} 
                disabled={loading !== null}
                className="group relative flex flex-col items-center justify-center space-y-2 rounded-xl border border-input bg-card p-6 shadow-sm hover:shadow-md hover:bg-accent/50 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    {loading === 'rule' ? <Icon icon="line-md:loading-loop" className="w-6 h-6 animate-spin"/> : <Icon icon="solar:document-add-bold" className="w-6 h-6" />}
                </div>
                 <div className="space-y-1">
                    <h3 className="font-medium leading-none">规则订阅</h3>
                    <p className="text-xs text-muted-foreground">获取最新规则</p>
                </div>
            </button>

            <button 
                onClick={resetSubHandler} 
                disabled={loading !== null}
                className="group relative flex flex-col items-center justify-center space-y-2 rounded-xl border border-input bg-card p-6 shadow-sm hover:shadow-md hover:bg-accent/50 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:border-destructive/50"
            >
                <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 group-hover:scale-110 transition-transform">
                     {loading === 'reset' ? <Icon icon="line-md:loading-loop" className="w-6 h-6 animate-spin"/> : <Icon icon="solar:restart-bold" className="w-6 h-6" />}
                </div>
                <div className="space-y-1">
                    <h3 className="font-medium leading-none text-destructive">重置订阅</h3>
                    <p className="text-xs text-muted-foreground">让所有旧订阅失效</p>
                </div>
            </button>
        </div>
    )
}

export default SubButtons;
