import { useState } from "react";
import { Button, Card, Collapse, Progress, Select, Tag } from "antd";
import { CheckOutlined, ClockCircleOutlined, CodeOutlined, LinkOutlined, RobotOutlined, TrophyOutlined } from "@ant-design/icons";
import { PLAN, PROJECT_WORKFLOW } from "../data/plan";
import { useStore } from "../store";

export default function CurrentPartPage() {
  const { doneItems, toggleItem } = useStore();
  const suggested = PLAN.find((p) => !p.items.every((i) => doneItems.includes(i.id))) ?? PLAN[PLAN.length - 1];
  const [partId, setPartId] = useState(suggested.id);
  const part = PLAN.find((p) => p.id === partId) ?? suggested;
  const doneCount = part.items.filter((i) => doneItems.includes(i.id)).length;
  const focusIds = new Set(part.items.filter((i) => !doneItems.includes(i.id)).slice(0, 2).map((i) => i.id));
  return <main className="page-shell">
    <section className="hero-card"><div><span className="eyebrow">{part.level} · 当前主线</span><h1>{part.title}</h1><p>{part.summary} 当前只需关注标记为“正在推进”的 1～2 个关卡。</p></div><div className="hero-progress"><strong>{doneCount}/{part.items.length}</strong><span>关卡完成</span><Progress percent={Math.round(doneCount / part.items.length * 100)} showInfo={false} /></div></section>
    <Select aria-label="切换学习阶段" value={partId} onChange={setPartId} className="stage-select" options={PLAN.map((p) => ({ value: p.id, label: `${p.level}  ${p.title}` }))} />
    <div className="mission-list">{part.items.map((item, index) => { const done = doneItems.includes(item.id); return <Card key={item.id} className={`mission-card ${done ? "is-done" : ""}`}>
      <div className="mission-head"><Button aria-label={done ? `取消完成 ${item.title}` : `完成 ${item.title}`} className="check-button" shape="circle" type={done ? "primary" : "default"} icon={done ? <CheckOutlined /> : index + 1} onClick={() => toggleItem(item.id)} /><div className="mission-title"><h2>{item.title}</h2><p>{item.outcome}</p></div><Tag color={done ? "green" : focusIds.has(item.id) ? "gold" : "default"}>{done ? "已通关" : focusIds.has(item.id) ? "正在推进" : "后续关卡"}</Tag><Tag icon={<ClockCircleOutlined />}>{item.time}</Tag></div>
      <Collapse ghost items={[{ key: "detail", label: "打开本关学习指南", children: <div className="detail-grid"><div className="intel-block"><h3>① 建议学习顺序</h3><ol>{item.studySteps.map((step) => <li key={step}>{step}</li>)}</ol><h3>② 本关知识清单</h3><ul>{item.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></div><div className="intel-block ai-block"><h3><LinkOutlined /> 先看这些资料</h3><div className="resource-links">{item.resources.map((r) => <a key={r.url} href={r.url} target="_blank" rel="noreferrer"><LinkOutlined /> {r.title}</a>)}</div><h3><RobotOutlined /> AI 参与度 · L{item.aiLevel}</h3><p>{item.aiRule}</p></div><div className="intel-block"><h3><CodeOutlined /> ③ 学完立刻做</h3><p>{item.miniProject}</p></div><div className="intel-block"><h3><TrophyOutlined /> ④ 通关标准</h3><ul>{item.passCriteria.map((rule) => <li key={rule}>{rule}</li>)}</ul></div></div> }]} />
    </Card>; })}</div>
    <Card className="boss-card"><span className="eyebrow">STAGE BOSS</span><h2><TrophyOutlined /> {part.bossBattle}</h2><div className="boss-grid"><div><h3>胜利条件</h3><ul>{part.bossCriteria.map((r) => <li key={r}>{r}</li>)}</ul></div><div><h3>战后复盘</h3><ol>{part.retrospective.map((q) => <li key={q}>{q}</li>)}</ol></div></div><div className="project-workflow"><h3>每场 Boss 固定走一遍项目流程</h3><div>{PROJECT_WORKFLOW.map((step,index)=><span key={step}><b>{String(index+1).padStart(2,"0")}</b>{step}</span>)}</div></div></Card>
  </main>;
}
