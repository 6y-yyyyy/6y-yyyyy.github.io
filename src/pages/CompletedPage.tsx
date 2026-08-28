import { Card, Timeline, Empty } from "antd";
import { useStore } from "../store";
function formatTime(ms:number){return new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}).format(new Date(ms))}
export default function CompletedPage(){const{log}=useStore();const sorted=[...log].sort((a,b)=>b.doneAt-a.doneAt);return <main className="page-shell"><Card title="战绩复盘">{sorted.length===0?<Empty description="还没有战绩，去主线任务完成第一关吧"/>:<><p style={{color:"var(--text-secondary)"}}>已留下 {sorted.length} 条成长记录。完成不只是打勾，也要记得复盘。</p><Timeline items={sorted.map(r=>({children:<div><small style={{color:"var(--text-secondary)"}}>{formatTime(r.doneAt)}</small><div>通关 <b>{r.partTitle}</b> · {r.itemTitle}</div></div>}))}/></>}</Card></main>}
