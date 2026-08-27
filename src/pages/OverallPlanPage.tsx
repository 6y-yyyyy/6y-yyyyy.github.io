import { Card, Progress, Tag } from "antd";
import { CheckCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import { PLAN } from "../data/plan";
import { useStore } from "../store";

export default function OverallPlanPage() {
  const { doneItems } = useStore();

  const totalItems = PLAN.reduce((s, p) => s + p.items.length, 0);
  const totalDone = PLAN.reduce(
    (s, p) => s + p.items.filter((it) => doneItems.includes(it.id)).length,
    0
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <Card title={<div style={{ textAlign: "center", fontSize: 18, fontWeight: 700 }}>学习整体计划</div>}>
        {/* 总进度 */}
        <Progress percent={Math.round((totalDone / totalItems) * 100)} status="active" />
        <p style={{ color: "var(--text-secondary)", fontSize: 12 }}>
          已完成 {totalDone} / {totalItems} 个学习项
        </p>

        {/* 每一部分 */}
        {PLAN.map((part) => {
          const done = part.items.filter((it) => doneItems.includes(it.id)).length;
          const total = part.items.length;
          const isComplete = done === total;
          const isCurrent = done > 0 && !isComplete;
          return (
            <Card
              key={part.id}
              size="small"
              style={{ marginTop: 12 }}
              title={
                <span>
                  {part.title}
                  {isComplete && (
                    <CheckCircleFilled style={{ color: "var(--accent)", marginLeft: 8 }} />
                  )}
                </span>
              }
              extra={
                isComplete ? (
                  <Tag color="green">已学完</Tag>
                ) : isCurrent ? (
                  <Tag color="blue">进行中</Tag>
                ) : (
                  <Tag icon={<ClockCircleOutlined />} color="default">未开始</Tag>
                )
              }
            >
              <div style={{ color: "var(--text-secondary)", fontSize: 12, marginBottom: 8 }}>
                {part.summary}
              </div>
              <Progress percent={Math.round((done / total) * 100)} size="small" />
            </Card>
          );
        })}
      </Card>
    </div>
  );
}
