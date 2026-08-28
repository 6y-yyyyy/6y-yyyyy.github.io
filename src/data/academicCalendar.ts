export type CalendarWeek = {
  week: number;
  start: string;
  end: string;
  arrangement: "课堂教学" | "期末考试及社会实践";
};

export type CalendarEvent = {
  id: string;
  date: string;
  title: string;
  detail: string;
};

const WEEK_STARTS = [
  "2026-09-06", "2026-09-13", "2026-09-20", "2026-09-27",
  "2026-10-04", "2026-10-11", "2026-10-18", "2026-10-25",
  "2026-11-01", "2026-11-08", "2026-11-15", "2026-11-22", "2026-11-29",
  "2026-12-06", "2026-12-13", "2026-12-20", "2026-12-27",
  "2027-01-03", "2027-01-10",
];

const addDays = (value: string, days: number) => {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

export const CALENDAR_WEEKS: CalendarWeek[] = WEEK_STARTS.map((start, index) => ({
  week: index + 1,
  start,
  end: addDays(start, 6),
  arrangement: index < 16 ? "课堂教学" : "期末考试及社会实践",
}));

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "staff-return", date: "2026-09-03 — 09-04", title: "教职工返校", detail: "党政管理人员9月3、4日返校上班；教师9月4日返校上班" },
  { id: "return-and-class", date: "2026-09-06 — 09-07", title: "返校与正式上课", detail: "2023、2024、2025级学生9月6日前回校报到，9月7日正式上课" },
  { id: "new-students", date: "2026-09-12 — 09-13", title: "2026级新生报到", detail: "普通本科新生9月12、13日报到；第二学士学位学生9月6日报到" },
  { id: "finals", date: "2026-12-27 — 2027-01-16", title: "期末考试及社会实践", detail: "第17—19周" },
];

export const CALENDAR_NOTE = "2027年春节：2027年2月6日。";
