import { useEffect, useState } from "react";
import { Alert, Button, Card, Empty, Input, Popconfirm, Segmented, Tag, message } from "antd";
import { DeleteOutlined, ExperimentOutlined, ReloadOutlined, SoundOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { unlockedKnowledge } from "../data/knowledge";
import { todayStr } from "../store";
import { usePersistentState } from "../usePersistentState";
import "../training-records.css";

type DuckNote = { id: string; topic: string; answer: string; createdAt: number };
type SkillNote = { id: string; cardId: string; title: string; createdAt: number };
const randomIndex = (length: number) => Math.floor(Math.random() * length);
const dateOf = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
const answerDirection = (question: string) => {
  if (question.includes("为什么")) return "说清原因和影响，再举一个简单例子";
  if (question.includes("区别") || question.includes("不同")) return "先分别解释，再比较它们的差异";
  if (question.includes("如何") || question.includes("顺序")) return "按步骤回答，并说明每一步看什么";
  return "先解释核心概念，再说明它的作用或使用场景";
};
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
  const [skillNotes, setSkillNotes] = usePersistentState<SkillNote[]>("study_tracker_skill_notes", []);
  const [notes, setNotes] = usePersistentState<DuckNote[]>("study_tracker_duck_notes", []);
  const today = todayStr();
  const skillDone = skillNotes.some((note) => dateOf(note.createdAt) === today);
  const duckDone = notes.some((note) => dateOf(note.createdAt) === today);
  const trainingDone = skillDone || duckDone;
  const card = knowledge[cardIndex % knowledge.length];
  const topic = knowledge[topicIndex % knowledge.length];

  useEffect(() => {
    setSkillDays([...new Set(skillNotes.map((note) => dateOf(note.createdAt)))]);
  }, [skillNotes, setSkillDays]);
  useEffect(() => {
    setDuckDays([...new Set(notes.map((note) => dateOf(note.createdAt)))]);
  }, [notes, setDuckDays]);

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
    if (!collected) setSkillNotes((items) => [{ id: String(Date.now()), cardId: card.id, title: card.title, createdAt: Date.now() }, ...items]);
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
    const meaningfulLength = text.replace(/\s|[，。！？、,.!?；;：:]/g, "").length;
    if (meaningfulLength < 8) {
      setVerdict("fail");
      setFeedback("再多说一点：试着补充原因、区别或一个简单例子。");
      return;
    }
    setNotes((items) => [{ id: String(Date.now()), topic: topic.duck.question, answer: text, createdAt: Date.now() }, ...items]);
    setAnswer(""); setVerdict("pass");
    setFeedback(covered.length > 0 ? `讲解已记录，提到了 ${covered.length} 个相关方向。` : "讲解已记录。可以再对照参考答案看看有没有遗漏。");
    message.success("橡皮鸭表示它听懂了");
  };
  const deleteSkillNote = (id: string) => {
    setSkillNotes((items) => items.filter((item) => item.id !== id));
    message.success("已删除技能抽卡记录");
  };
  const deleteDuckNote = (id: string) => {
    setNotes((items) => items.filter((item) => item.id !== id));
    message.success("已删除橡皮鸭讲课记录");
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
  const skillRecords = <Card title={`技能抽卡记录 · ${skillNotes.length}`}>{skillNotes.length === 0 ? <Empty description="还没有抽卡记录"/> : <div className="note-list">{skillNotes.map((note) => <div key={note.id} className="training-record"><div><b>{note.title}</b><p>{new Date(note.createdAt).toLocaleString("zh-CN")}</p></div><Popconfirm title="删除这条抽卡记录？" description="删除后可能会取消今日训练完成状态。" okText="确认删除" cancelText="取消" onConfirm={() => deleteSkillNote(note.id)}><Button danger type="text" aria-label={`删除${note.title}抽卡记录`} icon={<DeleteOutlined/>}/></Popconfirm></div>)}</div>}</Card>;

  const duckPanel = <>
    <Card className="training-stage duck-stage">
      <span className="eyebrow">RUBBER DUCK CLASS · {topic.title}</span>
      <div className={`duck-art ${verdict === "pass" ? "is-happy" : ""}`} aria-label={verdict === "pass" ? "听懂后开心点头的橡皮鸭" : "等待讲解的疑惑橡皮鸭"}><span className="duck-bubble">{verdict === "pass" ? "听懂啦！" : verdict === "fail" ? "我还有点懵……" : "你真的懂吗？"}</span><span className="duck-head"><i className="duck-eye left"/><i className="duck-eye right"/><i className="duck-beak"/></span><span className="duck-body"/></div>
      <h2>{topic.duck.question}</h2><p>假装面前的人完全不懂编程，用最简单的话解释清楚。</p>
      <div className="duck-checkpoints"><span>回答方向：{answerDirection(topic.duck.question)}</span><span>关键词参考：{topic.keywords.slice(0, 4).map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}</span></div>
      <Input.TextArea value={answer} onChange={(event) => { setAnswer(event.target.value); setVerdict("idle"); setFeedback(""); }} rows={5} placeholder="我的解释是……"/>
      {feedback && <Alert className="duck-feedback" type={verdict === "pass" ? "success" : "warning"} showIcon message={feedback}/>}
      {showReference && <Card size="small" className="reference-answer-card" title="参考答案卡"><p>{topic.summary}</p><h4>一个完整回答应包含：</h4><ul>{topic.duck.checkpoints.map((point) => <li key={point.label}>{point.label}</li>)}</ul><div className="memory-keywords">{topic.keywords.map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}</div></Card>}
      <div className="training-actions"><Button icon={<ReloadOutlined/>} onClick={changeTopic}>换个问题</Button><Button type="primary" onClick={saveExplanation}>讲完了，请鸭子判断</Button></div>
    </Card>
    <Card title={`橡皮鸭课堂记录 · ${notes.length}`}>{notes.length === 0 ? <Empty description="还没有讲课记录"/> : <div className="note-list">{notes.map((note) => <div key={note.id} className="training-record"><div><b>{note.topic}</b><p>{note.answer}</p></div><Popconfirm title="删除这条讲课记录？" description="删除后可能会取消今日训练完成状态。" okText="确认删除" cancelText="取消" onConfirm={() => deleteDuckNote(note.id)}><Button danger type="text" aria-label="删除讲课记录" icon={<DeleteOutlined/>}/></Popconfirm></div>)}</div>}</Card>
  </>;

  return <main className="page-shell">
    <section className="section-heading"><div><span className="eyebrow">HERO TRAINING CAMP</span><h1>勇者训练营</h1><p>知识卡用于回顾与收藏；橡皮鸭负责检验你能不能真正讲明白。</p></div><Tag color={skillDone && duckDone ? "gold" : trainingDone ? "green" : "default"}>{skillDone && duckDone ? "今日全清" : trainingDone ? "今日已训练" : "等待训练"}</Tag></section>
    <Segmented block value={mode} onChange={(value) => setMode(String(value))} options={[{ label: "技能抽卡", value: "技能抽卡", icon: <ExperimentOutlined/> }, { label: "给橡皮鸭讲课", value: "给橡皮鸭讲课", icon: <SoundOutlined/> }]} />
    {mode === "技能抽卡" ? <>{cardPanel}{skillRecords}</> : duckPanel}
  </main>;
}
