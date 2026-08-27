import { useState } from "react";
import { Card, List, Button, Tag, Collapse, Empty, Select, Space } from "antd";
import { CheckCircleOutlined, LinkOutlined, CodeOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { PLAN } from "../data/plan";
import { useStore } from "../store";

export default function CurrentPartPage() {
  const { doneItems, toggleItem } = useStore();

  // 当前部分 = 第一个还没全部完成的部分
  const currentPart =
    PLAN.find((p) => !p.items.every((it) => doneItems.includes(it.id))) ??
    PLAN[PLAN.length - 1];

  const [partId, setPartId] = useState(currentPart.id);
  const part = PLAN.find((p) => p.id === partId) ?? PLAN[0];

  const doneCount = part.items.filter((it) => doneItems.includes(it.id)).length;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* 选择要看哪一部分 */}
      <Select
        value={partId}
        onChange={setPartId}
        style={{ width: "100%", marginBottom: 16 }}
        options={PLAN.map((p) => ({ value: p.id, label: p.title }))}
      />

      <Card title={<div style={{ textAlign: "center", fontSize: 18, fontWeight: 700 }}>{part.title}</div>}>
        <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: -8, textAlign: "center" }}>
          {part.summary} · 已完成 {doneCount}/{part.items.length}
        </p>

        {/* 待学清单（todolist） */}
        <List
          dataSource={part.items}
          locale={{ emptyText: <Empty description="这部分还没有安排学习项" /> }}
          renderItem={(item) => {
            const done = doneItems.includes(item.id);
            return (
              <List.Item style={{ padding: "12px 0" }}>
                <Space align="start" style={{ width: "100%" }}>
                  {/* 勾选圆圈 */}
                  <Button
                    type="text"
                    style={{ padding: 0, fontSize: 20 }}
                    icon={
                      done ? (
                        <CheckCircleOutlined style={{ color: "var(--accent)" }} />
                      ) : (
                        <span
                          style={{
                            display: "inline-block", width: 18, height: 18,
                            border: "2px solid var(--border)", borderRadius: "50%",
                          }}
                        />
                      )
                    }
                    onClick={() => toggleItem(item.id)}
                  />

                  {/* 标题 + 展开的资料卡片 */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        textDecoration: done ? "line-through" : "none",
                        color: done ? "var(--text-secondary)" : "var(--text)",
                      }}
                    >
                      {item.title}
                      {item.time && (
                        <span
                          style={{
                            marginLeft: 8,
                            fontSize: 12,
                            color: "var(--text-secondary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <ClockCircleOutlined /> {item.time}
                        </span>
                      )}
                    </div>

                    {/* 资料 + 小项目 */}
                    <Collapse
                      ghost
                      size="small"
                      style={{ marginTop: 4 }}
                      items={[
                        {
                          key: "res",
                          label: <span style={{ fontSize: 12, color: "var(--accent)" }}>查看学习资料</span>,
                          children: (
                            <div>
                              {item.resources.length > 0 ? (
                                <div style={{ marginBottom: 8 }}>
                                  {item.resources.map((r, i) => (
                                    <div key={i} style={{ marginBottom: 4 }}>
                                      <Tag>{r.type}</Tag>
                                      <a href={r.url} target="_blank" rel="noreferrer">
                                        <LinkOutlined /> {r.title}
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>资料待补充</div>
                              )}

                              {item.miniProject && (
                                <div
                                  style={{
                                    background: "var(--accent-bg)", padding: "8px 12px",
                                    borderRadius: 6, fontSize: 12,
                                  }}
                                >
                                  <CodeOutlined style={{ color: "var(--accent)" }} />{" "}
                                  <b>待做小项目：</b>
                                  {item.miniProject}
                                </div>
                              )}
                            </div>
                          ),
                        },
                      ]}
                    />
                  </div>
                </Space>
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
}
