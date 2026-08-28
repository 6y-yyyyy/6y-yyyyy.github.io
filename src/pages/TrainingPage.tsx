import { useState } from "react";
import { Alert, Button, Card, Empty, Input, Segmented, Tag, message } from "antd";
import { ExperimentOutlined, ReloadOutlined, SoundOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { unlockedKnowledge } from "../data/knowledge";
import { todayStr } from "../store";
import { usePersistentState } from "../usePersistentState";

type DuckNote = { id: string; topic: string; answer: string; createdAt: number };
const randomIndex = (length: number) => Math.floor(Math.random() * length);
const readDone = (): string[] => {
  try { return JSON.parse(localStorage.getItem("study_tracker_done") || "[]"); }
  catch { return []; }
};

export default function TrainingPage() {
  const knowledge = unlockedKnowledge(readDone());
  const [mode, setMode] = useState("技能抽卡");
  const [cardIndex, setCardIndex] = useState(() => randomIndex(knowledge.length));
  const [topicIndex, setTopicIndex] = useState(() => randomIndex(knowledge.length));
  const [flipped, setFlipped] = useState(false);
  const [answer, setAnswer] = useState("");
  const [verdict, setVerdict] = useState<"idle" | "pass" | "fail">("idle");
  const [feedback, setFeedback] = useState("");
  const [showReference, setShowReference] = useState(false);
  const [skillDays, setSkillDays] = usePersistentState<string[]>("study_tracker_skill_days", []);
  const [duckDays, setDuckDays] = usePersistentState<string[]>("study_tracker_duck_days", []);
  const [collectedCards, setCollectedCards] = usePersistentState<string[]>("study_tracker_collected_cards", []);
  const [notes, setNotes] = usePersistentState<DuckNote[]>("study_tracker_duck_notes", []);
  const today = todayStr();
  const skillDone = skillDays.includes(today);
  const duckDone = duckDays.includes(today);
  const card = knowledge[cardIndex % knowledge.length];
  const topic = knowledge[topicIndex % knowledge.length];

  const drawAgain = () => {
    if (knowledge.length > 1) {
      let next = randomIndex(knowledge.length);
      while (next === cardIndex % knowledge.length) next = randomIndex(knowledge.length);
      setCardIndex(next);
    }
    setFlipped(false);
  };
  const collectCard = () => {
    const collected = collectedCards.includes(card.id);
    setCollectedCards((cards) => collected ? cards.filter((id) => id !== card.id) : [...cards, card.id]);
    if (!collected) setSkillDays((days) => days.includes(today) ? days : [...days, today]);
    message.success(collected ? "已从收藏册移除" : "知识卡已收入收藏册");
  };
  const changeTopic = () => {
    setTopicIndex(randomIndex(knowledge.length));
    setAnswer(""); setVerdict("idle"); setFeedback(""); setShowReference(false);
  };
  const saveExplanation = () => {
    const text = answer.trim();
    setShowReference(true);
    const covered = topic.duck.checkpoints.filter((point) => point.terms.some((term) => text.toLowerCase().includes(term.toLowerCase())));
    const missing = topic.duck.checkpoints.filter((point) => !covered.includes(point));
    if (text.length < 30 || covered.length < 2) {
      setVerdict("fail");
      setFeedback(text.length < 30 ? "解释有点短，再补充原因或举个例子。" : `我还没听明白：${missing.map((point) => point.label).join("；")}。`);
      return;
    }
    setNotes((items) => [{ id: String(Date.now()), topic: topic.duck.question, answer: text, createdAt: Date.now() }, ...items]);
    setDuckDays((days) => days.includes(today) ? days : [...days, today]);
    setAnswer(""); setVerdict("pass");
    setFeedback(`讲清楚了 ${covered.length}/${topic.duck.checkpoints.length} 个核心点。`);
    message.success("橡皮鸭表示它听懂了");
  };

  const cardPanel = <Card className="training-stage">
    <span className="eyebrow">KNOWLEDGE CARD · 已收藏 {collectedCards.length}/{knowledge.length}</span>
    <Alert className="card-pool-tip" type="info" showIcon message={`当前记忆库可抽 ${knowledge.length} 张知识卡`} description="卡池已加入本次摸底识别出的 HTML、CSS 和 JavaScript 基础；以后完成主线任务还会继续扩充。"/>
    <button className={`flip-card ${flipped ? "is-flipped" : ""}`} onClick={() => setFlipped((value) => !value)} aria-label={flipped ? "查看卡牌正面" : "翻开知识卡"}>
      <span className="flip-card-inner">
        <span className="flip-card-face flip-card-front"><ExperimentOutlined/><b>?</b><small>点击翻开</small></span>
        <span className="flip-card-face flip-card-back"><Tag color="blue">{card.title}</Tag><strong>{card.summary}</strong><span className="knowledge-points">{card.duck.checkpoints.map((point) => <span key={point.label}>✓ {point.label}</span>)}</span><span className="card-keywords">{card.keywords.map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}</span><small>点击可以翻回正面</small></span>
      </span>
    </button>
    <h2>{flipped ? card.title : "抽到什么，要翻开才知道"}</h2>
    <p>{flipped ? "这是你已经学过的知识。看一遍，确认自己仍然记得。" : "卡牌只会从你的专属记忆库中出现。"}</p>
    <div className="training-actions"><Button icon={<ReloadOutlined/>} onClick={drawAgain}>重新抽卡（{knowledge.length} 张）</Button><Button type={collectedCards.includes(card.id) ? "default" : "primary"} disabled={!flipped} icon={collectedCards.includes(card.id) ? <StarFilled/> : <StarOutlined/>} onClick={collectCard}>{collectedCards.includes(card.id) ? "取消收藏" : "收藏这张卡"}</Button></div>
  </Card>;

  const duckPanel = <>
    <Card className="training-stage duck-stage">
      <span className="eyebrow">RUBBER DUCK CLASS · {topic.title}</span>
      <div className={`duck-art ${verdict === "pass" ? "is-happy" : ""}`} aria-label={verdict === "pass" ? "听懂后开心点头的橡皮鸭" : "等待讲解的疑惑橡皮鸭"}><span className="duck-bubble">{verdict === "pass" ? "听懂啦！" : verdict === "fail" ? "我还有点懵……" : "你真的懂吗？"}</span><span className="duck-head"><i className="duck-eye left"/><i className="duck-eye right"/><i className="duck-beak"/></span><span className="duck-body"/></div>
      <h2>{topic.duck.question}</h2><p>假装面前的人完全不懂编程，用最简单的话解释清楚。</p>
      <div className="duck-checkpoints">讲清楚这些点：{topic.duck.checkpoints.map((point) => <Tag key={point.label}>{point.label}</Tag>)}</div>
      <Input.TextArea value={answer} onChange={(event) => { setAnswer(event.target.value); setVerdict("idle"); setFeedback(""); }} rows={5} placeholder="我的解释是……"/>
      {feedback && <Alert className="duck-feedback" type={verdict === "pass" ? "success" : "warning"} showIcon message={feedback}/>}
      {showReference && <Card size="small" className="reference-answer-card" title="参考答案卡"><p>{topic.summary}</p><h4>一个完整回答应包含：</h4><ul>{topic.duck.checkpoints.map((point) => <li key={point.label}>{point.label}</li>)}</ul><div className="memory-keywords">{topic.keywords.map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}</div></Card>}
      <div className="training-actions"><Button icon={<ReloadOutlined/>} onClick={changeTopic}>换个问题</Button><Button type="primary" onClick={saveExplanation}>讲完了，请鸭子判断</Button></div>
    </Card>
    <Card title={`橡皮鸭课堂记录 · ${notes.length}`}>{notes.length === 0 ? <Empty description="还没有讲课记录"/> : <div className="note-list">{notes.slice(0, 6).map((note) => <div key={note.id}><b>{note.topic}</b><p>{note.answer}</p></div>)}</div>}</Card>
  </>;

  return <main className="page-shell">
    <section className="section-heading"><div><span className="eyebrow">HERO TRAINING CAMP</span><h1>勇者训练营</h1><p>知识卡用于回顾与收藏；橡皮鸭负责检验你能不能真正讲明白。</p></div><Tag color={skillDone && duckDone ? "gold" : skillDone || duckDone ? "green" : "default"}>{skillDone && duckDone ? "今日全清" : skillDone || duckDone ? "今日已训练" : "等待训练"}</Tag></section>
    <Segmented block value={mode} onChange={(value) => setMode(String(value))} options={[{ label: "技能抽卡", value: "技能抽卡", icon: <ExperimentOutlined/> }, { label: "给橡皮鸭讲课", value: "给橡皮鸭讲课", icon: <SoundOutlined/> }]} />
    {mode === "技能抽卡" ? cardPanel : duckPanel}
  </main>;
}
