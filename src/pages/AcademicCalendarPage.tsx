import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Table, Tag, type TableColumnsType } from "antd";
import { CALENDAR_EVENTS, CALENDAR_NOTE, CALENDAR_WEEKS, type CalendarWeek } from "../data/academicCalendar";
import "../academic-calendar.css";

const formatDate = (value: string) => {
  const [year, month, day] = value.split("-");
  return `${year}.${month}.${day}`;
};

const columns: TableColumnsType<CalendarWeek> = [
  { title: "周次", dataIndex: "week", width: 68, render: (week: number) => `第${week}周` },
  { title: "日期", key: "dates", render: (_, row) => <span className="calendar-date-range">{formatDate(row.start)}<span>至</span>{formatDate(row.end)}</span> },
  { title: "教学安排", dataIndex: "arrangement", width: 124, render: (value: CalendarWeek["arrangement"]) => <Tag color={value === "课堂教学" ? "green" : "gold"}>{value}</Tag> },
];

export default function AcademicCalendarPage() {
  return <main className="page-shell academic-calendar-page">
    <section className="calendar-hero"><div><span className="eyebrow">ACADEMIC CALENDAR</span><h1>校历</h1><p>广东金融学院 2026—2027学年第一学期</p></div><CalendarOutlined /></section>

    <section className="calendar-events"><h2>重要时间</h2><div className="calendar-event-list">{CALENDAR_EVENTS.map((event) => <Card key={event.id} size="small" className="calendar-event-card"><span className="event-date">{event.date}</span><strong>{event.title}</strong><p>{event.detail}</p></Card>)}</div></section>

    <section className="calendar-weeks"><div className="section-heading"><div><h2>教学周安排</h2><p>第1—16周课堂教学，第17—19周期末考试及社会实践</p></div><ClockCircleOutlined /></div><Table<CalendarWeek> rowKey="week" columns={columns} dataSource={CALENDAR_WEEKS} pagination={false} size="small" scroll={{ x: 450 }} /></section>

    <p className="calendar-note">说明：{CALENDAR_NOTE}</p>
  </main>;
}
