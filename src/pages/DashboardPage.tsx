import { Button, Card, Progress, Tag } from "antd";
import { BookOutlined, CheckOutlined, FireOutlined, RightOutlined } from "@ant-design/icons";
import { PLAN } from "../data/plan";
import { todayStr, type StudyLog } from "../store";

type Destination = "current" | "challenge" | "memory" | "bestiary" | "showcase";
const read = <T,>(key: string): T[] => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const itemIds = new Set(PLAN.flatMap((part) => part.items.map((item) => item.id)));
const dateOf = (ms: number) => { const date = new Date(ms); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; };

export default function DashboardPage({ onNavigate }: { onNavigate: (page: Destination) => void }) {
  const doneItems = read<string>("study_tracker_done");
  const logs = read<StudyLog>("study_tracker_log");
  const algorithmDays = read<string>("study_tracker_algorithm_days");
  const today = todayStr();
  const mainDoneToday = logs.some((record) => itemIds.has(record.itemId) && dateOf(record.doneAt) === today);
  const currentPart = PLAN.find((part) => !part.items.every((item) => doneItems.includes(item.id))) ?? PLAN[PLAN.length - 1];
  const nextTask = currentPart.items.find((item) => !doneItems.includes(item.id)) ?? currentPart.items[currentPart.items.length - 1];
  const states = [mainDoneToday, algorithmDays.includes(today)];
  const completed = states.filter(Boolean).length;

  return <main className="page-shell dashboard-page">
    <section className="dashboard-hero"><div><span className="eyebrow">TODAY'S ADVENTURE</span><h1>{completed === 2 ? <><span className="title-line">两项试炼：卒</span><span className="title-line">勇者：原地升级</span></> : "勇者，请领取今日两项试炼"}</h1><p>不追求一次学很多，只完成今天最重要的主线和打怪任务。</p></div><Progress type="circle" percent={Math.round(completed / 2 * 100)} format={() => `${completed}/2`} /></section>
    <div className="today-grid">
      <Card className={mainDoneToday ? "today-card is-complete" : "today-card"}><Tag>主线任务</Tag><BookOutlined className="today-icon"/><h2>{mainDoneToday ? "今日主线已经推进" : nextTask.title}</h2><p>{mainDoneToday ? `下一战：${nextTask.title}` : nextTask.outcome}</p>{mainDoneToday ? <div className="today-actions"><Button icon={<CheckOutlined/>} disabled>今日已战</Button><Button type="primary" onClick={() => onNavigate("current")}>再战一场 <RightOutlined/></Button></div> : <Button type="primary" onClick={() => onNavigate("current")}>继续主线 <RightOutlined/></Button>}</Card>
      <Card className={states[1] ? "today-card is-complete" : "today-card"}><Tag color="orange">算法支线</Tag><FireOutlined className="today-icon"/><h2>{states[1] ? "今日怪物已击败" : "任选一道算法题"}</h2><p>独立思考 20 分钟，完成后把记录写进战绩。</p><Button type="primary" onClick={() => onNavigate("challenge")}>{states[1] ? "查看今日战绩" : "进入战场"} <RightOutlined/></Button></Card>
    </div>
    <div className="quick-links"><Button onClick={() => onNavigate("memory")}>查看专属记忆库</Button><Button onClick={() => onNavigate("bestiary")}>打开怪物图鉴</Button><Button onClick={() => onNavigate("showcase")}>查看作品陈列柜</Button></div>
  </main>;
}
