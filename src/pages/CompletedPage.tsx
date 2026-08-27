import { Card, Timeline, Empty } from "antd";
import { useStore } from "../store";

// 把毫秒时间戳格式化成 "2026年8月27日 14:30"
function formatTime(ms: number): string {
  const d = new Date(ms);
  const y = d.getFullYear();
  const mo = d.getMonth() + 1;
  const day = d.getDate();
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}年${mo}月${day}日 ${h}:${min}`;
}

export default function CompletedPage() {
  const { log } = useStore();
  // 最新的排前面
  const sorted = [...log].sort((a, b) => b.doneAt - a.doneAt);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Card title={<div style={{ textAlign: "center", fontSize: 18, fontWeight: 700 }}>战绩</div>}>
        {sorted.length === 0 ? (
          <Empty description="还没有战绩，去「主线任务」勾选一个任务吧" />
        ) : (
          <>
            <p style={{ color: "var(--text-secondary)", fontSize: 12, textAlign: "center", marginTop: -8 }}>
              共 {sorted.length} 条记录
            </p>
            <Timeline
              items={sorted.map((r) => ({
                children: (
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                      {formatTime(r.doneAt)}
                    </div>
                    <div style={{ marginTop: 2 }}>
                      学习了 <b>{r.partTitle}</b> · {r.itemTitle}
                    </div>
                  </div>
                ),
              }))}
            />
          </>
        )}
      </Card>
    </div>
  );
}
