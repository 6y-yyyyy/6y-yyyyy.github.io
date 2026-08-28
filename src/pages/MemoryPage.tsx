import { Button, Card, Empty, Progress, Tabs, Tag } from "antd";
import { BookOutlined, CheckCircleFilled, DeleteOutlined, StarFilled } from "@ant-design/icons";
import { KNOWLEDGE, PROFILE_KNOWLEDGE, type KnowledgeUnit } from "../data/knowledge";
import { usePersistentState } from "../usePersistentState";

type DuckNote = { topic: string };
const read = <T,>(key: string): T[] => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const confidenceColor = { "较熟悉": "green", "待复习": "gold", "基础薄弱": "orange" } as const;

function KnowledgeCard({ unit, collected, explained, onRemove }: { unit: KnowledgeUnit; collected?: boolean; explained?: boolean; onRemove?: () => void }) {
  return <Card className="collection-card">
    <div className="card-tags">{unit.confidence && <Tag color={confidenceColor[unit.confidence]}>{unit.confidence}</Tag>}{collected && <Tag color="blue" icon={<StarFilled/>}>已收藏</Tag>}{explained && <Tag color="green">能讲明白</Tag>}</div>
    <BookOutlined className="collection-icon"/><h2>{unit.title}</h2><p>{unit.summary}</p>
    <div className="memory-keywords">{unit.keywords.map((keyword) => <Tag key={keyword}>{keyword}</Tag>)}</div>
    <div className="memory-points">{unit.duck.checkpoints.map((point) => <span key={point.label}>✓ {point.label}</span>)}</div>
    {onRemove && <Button danger icon={<DeleteOutlined/>} onClick={onRemove}>取消收藏</Button>}
  </Card>;
}

export default function MemoryPage() {
  const done = read<string>("study_tracker_done");
  const notes = read<DuckNote>("study_tracker_duck_notes");
  const [collected, setCollected] = usePersistentState<string[]>("study_tracker_collected_cards", []);
  const learned = KNOWLEDGE.filter((unit) => done.includes(unit.itemId));
  const allUnits = [...PROFILE_KNOWLEDGE, ...KNOWLEDGE];
  const collection = collected.map((id) => allUnits.find((unit) => unit.id === id)).filter((unit): unit is KnowledgeUnit => Boolean(unit));
  const explained = (unit: KnowledgeUnit) => notes.some((note) => note.topic === unit.duck.question);
  const profileContent = <div className="collection-grid">{PROFILE_KNOWLEDGE.map((unit) => <KnowledgeCard key={unit.id} unit={unit} collected={collected.includes(unit.id)} explained={explained(unit)}/>)}</div>;
  const collectionContent = collection.length === 0 ? <Card><Empty description="还没有收藏知识卡，去勇者训练营翻一张吧"/></Card> : <div className="collection-grid">{collection.map((unit) => <KnowledgeCard key={unit.id} unit={unit} collected explained={explained(unit)} onRemove={() => setCollected((ids) => ids.filter((id) => id !== unit.id))}/>)}</div>;
  const learnedContent = learned.length === 0 ? <Card><Empty description="完成第一个主线任务后，这里会出现正式解锁的知识"/></Card> : <div className="collection-grid">{learned.map((unit) => <KnowledgeCard key={unit.id} unit={unit} collected={collected.includes(unit.id)} explained={explained(unit)}/>)}</div>;

  return <main className="page-shell">
    <section className="section-heading"><div><span className="eyebrow">KNOWLEDGE MEMORY</span><h1>专属记忆库</h1><p>看见自己学过什么、复习过什么，以及哪些知识已经能够讲明白。</p></div><Progress type="circle" size={72} percent={Math.round(learned.length / KNOWLEDGE.length * 100)} format={() => `${learned.length}/${KNOWLEDGE.length}`}/></section>
    <Tabs defaultActiveKey="profile" items={[
      { key: "profile", label: `基础档案 ${PROFILE_KNOWLEDGE.length}`, children: profileContent },
      { key: "collection", label: `卡片收藏 ${collection.length}`, children: collectionContent },
      { key: "learned", label: `主线知识 ${learned.length}`, children: learnedContent },
    ]}/>
  </main>;
}
