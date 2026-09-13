import { useState } from "react";
import { Button, Card, Grid, Input, Modal, Select, Space } from "antd";
import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { PLAN } from "../data/plan";
import { todayStr, useStore } from "../store";

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];
const TASK_OPTIONS = PLAN.flatMap((part) => part.items.map((item) => ({
  value: item.id,
  label: `${part.level} · ${item.title}`,
})));

const dateStr = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

function addMonths(year: number, month: number, amount: number) {
  const total = year * 12 + month - 1 + amount;
  return { y: Math.floor(total / 12), m: total % 12 + 1 };
}

function Month({ year, month, days }: { year: number; month: number; days: string[] }) {
  const count = new Date(year, month, 0).getDate();
  const offset = (new Date(year, month - 1, 1).getDay() + 6) % 7;
  const cells = [...Array(offset).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];

  return <div>
    <div style={{ textAlign: "center", marginBottom: 6, color: "var(--text-secondary)" }}>{year} 年 {month} 月</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 28px)", gap: 5 }}>
      {WEEKDAYS.map((weekday) => <small key={weekday} style={{ textAlign: "center" }}>{weekday}</small>)}
      {cells.map((day, index) => day === null ? <span key={index} /> : <span
        key={index}
        title={dateStr(year, month, day)}
        style={{
          height: 28,
          display: "grid",
          placeItems: "center",
          borderRadius: 5,
          fontSize: 11,
          background: days.includes(dateStr(year, month, day)) ? "var(--accent)" : "var(--empty-day)",
          color: days.includes(dateStr(year, month, day)) ? "#fff" : "var(--text-secondary)",
        }}
      >{day}</span>)}
    </div>
  </div>;
}

export default function ContributionsPage() {
  const { doneItems, studyDays, recordStudyProgress } = useStore();
  const mobile = !Grid.useBreakpoint().md;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const initial = addMonths(currentYear, currentMonth, -2);
  const [start, setStart] = useState(initial);
  const [backfillOpen, setBackfillOpen] = useState(false);
  const [backfillDate, setBackfillDate] = useState(todayStr());
  const [backfillItemId, setBackfillItemId] = useState(
    TASK_OPTIONS.find((option) => !doneItems.includes(option.value))?.value ?? TASK_OPTIONS[0]?.value ?? "",
  );
  const [backfillNote, setBackfillNote] = useState("");
  const months = [0, 1, 2].map((amount) => addMonths(start.y, start.m, amount));
  const shift = (amount: number) => setStart(addMonths(start.y, start.m, amount));

  const saveBackfill = () => {
    if (!backfillDate || !backfillItemId) {
      return;
    }
    recordStudyProgress(backfillItemId, backfillNote, backfillDate);
    setBackfillOpen(false);
    setBackfillNote("");
  };

  return <main className="page-shell">
    <Card title="肝帝日历">
      <div className="calendar-heading">
        <p>每一次学习存档或完成任务都会点亮当天。稳定前进，比偶尔冲刺更重要。</p>
        <Button icon={<PlusOutlined />} onClick={() => setBackfillOpen(true)}>补记学习</Button>
      </div>
      <Space wrap style={{ marginBottom: 20 }}>
        <Button aria-label="上一个月" icon={<LeftOutlined />} onClick={() => shift(-1)} />
        <Select value={start.y} onChange={(year) => setStart({ ...start, y: year })} options={Array.from({ length: 11 }, (_, index) => ({ value: currentYear - 5 + index, label: `${currentYear - 5 + index} 年` }))} />
        <Select value={start.m} onChange={(month) => setStart({ ...start, m: month })} options={Array.from({ length: 12 }, (_, index) => ({ value: index + 1, label: `${index + 1} 月` }))} />
        <Button aria-label="下一个月" icon={<RightOutlined />} onClick={() => shift(1)} disabled={start.y * 12 + start.m >= currentYear * 12 + currentMonth - 2} />
      </Space>
      <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", gap: 28, flexWrap: "wrap" }}>
        {months.map((month) => <Month key={`${month.y}-${month.m}`} year={month.y} month={month.m} days={studyDays} />)}
      </div>
    </Card>
    <Modal title="补记一次学习" open={backfillOpen} okText="保存补记" cancelText="取消" okButtonProps={{ disabled: !backfillDate || !backfillItemId }} onOk={saveBackfill} onCancel={() => setBackfillOpen(false)}>
      <div className="backfill-form">
        <label htmlFor="backfill-date">学习日期</label>
        <input id="backfill-date" type="date" max={todayStr()} value={backfillDate} onChange={(event) => setBackfillDate(event.target.value)} />
        <label htmlFor="backfill-task">推进的关卡</label>
        <Select id="backfill-task" value={backfillItemId} onChange={setBackfillItemId} options={TASK_OPTIONS} showSearch optionFilterProp="label" />
        <label htmlFor="backfill-note">学习记录（选填）</label>
        <Input.TextArea id="backfill-note" value={backfillNote} onChange={(event) => setBackfillNote(event.target.value)} rows={4} maxLength={200} showCount placeholder="例如：继续学习 JavaScript 核心，理解了 Promise" />
      </div>
    </Modal>
  </main>;
}
