import { useMemo, useState } from "react";
import { CalendarOutlined, ClockCircleOutlined, EnvironmentOutlined, LeftOutlined, ReadOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Tag } from "antd";
import { formatDateInput, formatNumberRange, getDailySchedule, WEEKDAY_NAMES } from "../scheduleUtils";
import "../schedule.css";
import "../date-controls.css";

const displayDate = (date: Date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(() => formatDateInput(new Date()));
  const schedule = useMemo(() => getDailySchedule(selectedDate), [selectedDate]);
  const inTerm = schedule.academicWeek !== null;

  const moveDate = (days: number) => {
    const date = schedule.date ?? new Date();
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
    setSelectedDate(formatDateInput(next));
  };

  return <main className="page-shell schedule-page">
    <section className="schedule-hero"><div><span className="eyebrow">ADVENTURE MAP</span><h1>今日课程</h1><p>选一天，看看这一天的课程路线。</p></div><div className="date-controls"><div className="date-stepper"><Button aria-label="前一天" icon={<LeftOutlined />} onClick={() => moveDate(-1)} /><input aria-label="选择课程日期" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} /><Button aria-label="后一天" icon={<RightOutlined />} onClick={() => moveDate(1)} /></div><div className="month-shortcuts" aria-label="快速选择月份">{[{ month: 9, date: "2026-09-07" }, { month: 10, date: "2026-10-01" }, { month: 11, date: "2026-11-01" }, { month: 12, date: "2026-12-01" }].map((item) => <Button key={item.month} size="small" onClick={() => setSelectedDate(item.date)}>{item.month}月</Button>)}</div></div></section>
    <section className="schedule-summary"><CalendarOutlined /><div><strong>{schedule.date ? displayDate(schedule.date) : selectedDate} {schedule.weekday === null ? "" : WEEKDAY_NAMES[schedule.weekday]}</strong><span>{inTerm ? `第${schedule.academicWeek}周` : "当前不在本学期教学周期内"}</span></div></section>
    {inTerm && schedule.courses.length > 0 && <div className="course-list">{schedule.courses.map((course) => <Card key={course.id} className="course-card">
      <div className="course-title"><div><h2>{course.name}</h2>{course.type && <Tag>{course.type}</Tag>}</div><Tag color="gold">第{schedule.academicWeek}周</Tag></div>
      <div className="course-detail"><EnvironmentOutlined /><span>{course.location}</span></div>
      <div className="course-detail course-times"><ClockCircleOutlined /><span>{course.timeRanges.map((range) => <span key={`${range.start}-${range.end}`}>{range.start} - {range.end}</span>)}</span></div>
      <div className="course-detail"><ReadOutlined /><span>第{formatNumberRange(course.periods)}大节 · 第{formatNumberRange(course.sections)}小节</span></div>
      <div className="course-weeks">上课周次：第{formatNumberRange(course.weeks)}周{course.weeks.length === 8 && course.weeks[0] === 2 ? "（双周）" : ""}</div>
    </Card>)}</div>}
    {inTerm && schedule.courses.length === 0 && <div className="schedule-empty"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="自由的一天~" /></div>}
    {!inTerm && <div className="schedule-empty"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="当前不在本学期教学周期内" /></div>}
  </main>;
}
