import { useState } from "react";
import { Button, Card, Tag } from "antd";
import { CheckOutlined, CodeOutlined, FireOutlined, RocketOutlined } from "@ant-design/icons";
import { todayStr, useStore } from "../store";

const KEY = "study_tracker_algorithm_days";
type Platform = "力扣" | "牛客";
const readDays = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };
const arenas: { name: Platform; line: string; note: string; url: string; className: string; icon: React.ReactNode }[] = [
  { name: "力扣", line: "今天上力扣打怪", note: "适合按题型训练与巩固数据结构", url: "https://leetcode.cn/problemset/", className: "leetcode", icon: <CodeOutlined /> },
  { name: "牛客", line: "今天上牛客打怪", note: "适合刷企业真题与准备笔面试", url: "https://www.nowcoder.com/exam/oj", className: "nowcoder", icon: <RocketOutlined /> },
];

export default function DailyChallengePage() {
  const [days, setDays] = useState<string[]>(readDays);
  const [platform, setPlatform] = useState<Platform>("力扣");
  const { recordAlgorithmChallenge } = useStore();
  const date = todayStr();
  const done = days.includes(date);

  const markDone = () => {
    const next = done ? days.filter((day) => day !== date) : [...days, date];
    setDays(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    recordAlgorithmChallenge(platform, !done);
  };

  return <main className="page-shell challenge-page">
    <section className="challenge-hero"><div><span className="eyebrow">DAILY SIDE QUEST</span><h1>今天也去打一个怪</h1><p>主线练项目，支线练基本功。每天一道就够，关键是别断线。</p></div><div className="streak-orb"><FireOutlined /><strong>{days.length}</strong><span>累计打怪天数</span></div></section>
    <div className="daily-goal"><div><strong>{done ? "今日支线已完成" : `今日支线：去${platform}至少完成 1 题`}</strong><p>{done ? `“今天上${platform}打怪”已加入战绩。` : "点击下方卡片选择战场，独立思考 20 分钟后再看题解。"}</p></div><Button type={done ? "default" : "primary"} size="large" icon={<CheckOutlined />} onClick={markDone}>{done ? "取消今日记录" : "今日已打怪"}</Button></div>
    <div className="arena-grid">{arenas.map((arena) => <a className={`arena-card ${arena.className} ${platform === arena.name ? "is-selected" : ""}`} key={arena.name} href={arena.url} target="_blank" rel="noreferrer" onClick={() => setPlatform(arena.name)}><Card><div className="arena-icon">{arena.icon}</div><Tag>{platform === arena.name ? `已选择 · ${arena.name}` : arena.name}</Tag><h2>{arena.line}</h2><p>{arena.note}</p><span className="enter-arena">进入战场 →</span></Card></a>)}</div>
  </main>;
}
