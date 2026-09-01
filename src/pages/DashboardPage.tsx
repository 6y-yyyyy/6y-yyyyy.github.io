import { Button, Card, Progress, Tag } from "antd";
import { BookOutlined, FireOutlined, RightOutlined } from "@ant-design/icons";
import { PLAN } from "../data/plan";
import type { StudyLog } from "../store";

type Destination = "current" | "challenge" | "memory" | "bestiary" | "showcase";
const read = <T,>(key: string): T[] => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const itemIds = new Set(PLAN.flatMap((part) => part.items.map((item) => item.id)));
const startOfWeek = () => { const date = new Date(); const day = date.getDay() || 7; date.setHours(0, 0, 0, 0); date.setDate(date.getDate() - day + 1); return date.getTime(); };

export default function DashboardPage({ onNavigate }: { onNavigate: (page: Destination) => void }) {
  const doneItems = read<string>("study_tracker_done");
  const logs = read<StudyLog>("study_tracker_log");
  const algorithmDays = read<string>("study_tracker_algorithm_days");
  const weeklyRecord = (() => { try { return JSON.parse(localStorage.getItem("study_tracker_weekly_algorithm") || "null") as { week: string; count: number } | null; } catch { return null; } })();
  const currentPart = PLAN.find((part) => !part.items.every((item) => doneItems.includes(item.id))) ?? PLAN[PLAN.length - 1];
  const currentTasks = currentPart.items.filter((item) => !doneItems.includes(item.id)).slice(0, 2);
  const nextTask = currentTasks[0] ?? currentPart.items[currentPart.items.length - 1];
  const weeklyCount = Math.max(weeklyRecord && new Date(`${weeklyRecord.week}T00:00:00`).getTime() === startOfWeek() ? weeklyRecord.count : 0, algorithmDays.filter((date) => new Date(`${date}T00:00:00`).getTime() >= startOfWeek()).length, logs.filter((record) => record.itemId.startsWith("algorithm-") && record.doneAt >= startOfWeek()).length);

  return <main className="page-shell dashboard-page">
    <section className="dashboard-hero"><div><span className="eyebrow">CONTINUE YOUR ADVENTURE</span><h1>从当前主线继续</h1><p>不赶日期，不补欠账。一次专注 1～2 个关卡，准备好时再向前推进。</p></div><Progress type="circle" percent={Math.round(doneItems.filter((id) => itemIds.has(id)).length / itemIds.size * 100)} /></section>
    <div className="today-grid">
      <Card className="today-card"><Tag>当前主线 · {currentPart.level}</Tag><BookOutlined className="today-icon"/><h2>{nextTask.title}</h2><p>{nextTask.outcome}{currentTasks[1] ? ` 下一关：${currentTasks[1].title}` : ""}</p><Button type="primary" onClick={() => onNavigate("current")}>继续主线 <RightOutlined/></Button></Card>
      <Card className={weeklyCount >= 5 ? "today-card is-complete" : "today-card"}><Tag color="orange">每周悬赏</Tag><FireOutlined className="today-icon"/><h2>本周算法 5 题</h2><p>本周已记录 {Math.min(weeklyCount, 5)} / 5 题。自由安排，不要求每天完成。</p><Button type="primary" onClick={() => onNavigate("challenge")}>查看悬赏 <RightOutlined/></Button></Card>
    </div>
    <div className="quick-links"><Button onClick={() => onNavigate("memory")}>查看专属记忆库</Button><Button onClick={() => onNavigate("bestiary")}>打开怪物图鉴</Button><Button onClick={() => onNavigate("showcase")}>查看作品陈列柜</Button></div>
  </main>;
}
