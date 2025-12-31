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
    const { data, mutate, isLoading } = useSWR<RuleType[]>("/api/rules", fetcher)
    const [notice, setNotice] = useState(false)
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        if (submit) {
            mutate()
        }
    }, [submit, mutate])

    const deleteRule = async (id: number) => {
        setDeletingId(id);
        try {
            await fetch(`/api/rules/${id}`, {
                method: 'delete'
            })
            setNotice(true);
            mutate();
        } finally {
            setDeletingId(null);
        }
    }

    if (!data && isLoading) return (
        <div className="p-8 text-center text-muted-foreground">
             <Icon icon="line-md:loading-loop" className="w-6 h-6 mx-auto animate-spin" />
        </div>
    )
    
    if (!data || data.length === 0) return (
        <div className="p-8 text-center text-muted-foreground border-t bg-muted/5">
            暂无中转域名规则
        </div>
    )

    return (
        <>
            <Toast name="规则已删除" show={notice} setShow={setNotice} />
            <div className="border-t divide-y">
                {data.map((v) => (
                    <div key={v.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <Icon icon="solar:global-bold" className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{v.suffix}</span>
                        </div>
                        <button 
                            onClick={() => deleteRule(v.id)}
                            disabled={deletingId === v.id}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            {deletingId === v.id ? (
                                <Icon icon="line-md:loading-loop" className="w-4 h-4 animate-spin" />
                            ) : (
                                <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}

const RelayDomains = ({ show }: { show: boolean }) => {
    const [submit, setSubmit] = useState(false)
    const [notice, setNotice] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())
        
        try {
            await fetch('/api/rules', {
                method: "post",
                body: JSON.stringify(data)
            })
            setNotice(true)
            setSubmit(true)
            // Reset input
            event.currentTarget.reset();
            setTimeout(() => setSubmit(false), 500)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card border shadow-sm rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b bg-muted/20">
                <h2 className="text-lg font-medium text-card-foreground">中转域名配置</h2>
                <p className="text-sm text-muted-foreground">添加需要通过中转节点访问的域名后缀</p>
            </div>

            <Toast name="域名添加成功" show={notice} setShow={setNotice} />
            
            <div className="p-6">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end mb-6">
                    <div className="flex-1 w-full space-y-2">
                        <label htmlFor="suffix" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            新增域名后缀
                        </label>
                        <input
                            type="text"
                            name="suffix"
                            id="suffix"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="例如: google.com"
                            required
                        />
                    </div>
                    <button
                        disabled={!show || loading}
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto min-w-[100px]"
                    >
                         {loading && <Icon icon="line-md:loading-loop" className="mr-2 h-4 w-4 animate-spin" />}
                        添加
                    </button>
                </form>
                
                <div className="rounded-md border">
                    <div className="bg-muted/50 px-4 py-3 text-xs font-medium text-muted-foreground border-b">
                        已配置规则列表
                    </div>
                    <RuleList submit={submit} />
                </div>
            </div>
        </div>
    )
}

export default RelayDomains;
