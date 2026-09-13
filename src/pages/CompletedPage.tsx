import { Card, Empty, Timeline } from "antd";
import { useStore } from "../store";

function formatTime(ms: number) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

export default function CompletedPage() {
  const { log } = useStore();
  const sorted = [...log].sort((first, second) => second.doneAt - first.doneAt);

  return <main className="page-shell">
    <Card title="战绩复盘">
      {sorted.length === 0 ? <Empty description="还没有学习记录，去当前主线保存第一次学习吧" /> : <>
        <p style={{ color: "var(--text-secondary)" }}>已留下 {sorted.length} 条成长记录。学习过程和最终通关都值得被看见。</p>
        <Timeline items={sorted.map((record) => {
          const action = record.kind === "progress" ? "推进" : record.kind === "algorithm" ? "完成" : "通关";
          return {
            children: <div>
              <small style={{ color: "var(--text-secondary)" }}>{formatTime(record.doneAt)}</small>
              <div>{action} <b>{record.partTitle}</b> · {record.itemTitle}</div>
              {record.note && <div className="study-log-note">{record.note}</div>}
            </div>,
          };
        })} />
      </>}
    </Card>
  </main>;
}
