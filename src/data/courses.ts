export type TimeRange = { start: string; end: string };

export type Course = {
  id: string;
  name: string;
  weekday: number;
  location: string;
  periods: number[];
  sections: number[];
  timeRanges: TimeRange[];
  weeks: number[];
  type?: "选修 / 线上课程";
};

const ALL_WEEKS = Array.from({ length: 16 }, (_, index) => index + 1);
const LATE_WEEKS = Array.from({ length: 8 }, (_, index) => index + 9);
const EVEN_WEEKS = [2, 4, 6, 8, 10, 12, 14, 16];

export const COURSES: Course[] = [
  { id: "data-structure", name: "数据结构", weekday: 1, location: "南教420", periods: [1], sections: [1, 2], timeRanges: [{ start: "08:15", end: "09:45" }], weeks: ALL_WEEKS },
  { id: "innovation", name: "创新创业基础", weekday: 1, location: "北教113", periods: [2], sections: [3, 4, 5], timeRanges: [{ start: "10:00", end: "12:20" }], weeks: LATE_WEEKS },
  { id: "world-trade", name: "走遍世界说贸易", weekday: 1, location: "线上", periods: [3], sections: [6, 7, 8], timeRanges: [{ start: "14:00", end: "16:20" }], weeks: ALL_WEEKS, type: "选修 / 线上课程" },
  { id: "data-structure-lab", name: "数据结构实验", weekday: 1, location: "敏学楼312", periods: [4], sections: [9, 10], timeRanges: [{ start: "16:30", end: "18:00" }], weeks: EVEN_WEEKS },
  { id: "web-front-end-design", name: "Web前端课程设计", weekday: 2, location: "敏学101", periods: [1], sections: [1, 2], timeRanges: [{ start: "08:15", end: "09:45" }], weeks: ALL_WEEKS },
  { id: "probability", name: "概率论与数理统计B", weekday: 2, location: "南教319", periods: [2], sections: [3, 4, 5], timeRanges: [{ start: "10:00", end: "12:20" }], weeks: ALL_WEEKS },
  { id: "college-english-3", name: "大学英语III", weekday: 3, location: "南教216", periods: [1], sections: [1, 2], timeRanges: [{ start: "08:15", end: "09:45" }], weeks: ALL_WEEKS },
  { id: "marxism", name: "马克思主义基本原理", weekday: 3, location: "南教113", periods: [2], sections: [3, 4, 5], timeRanges: [{ start: "10:00", end: "12:20" }], weeks: ALL_WEEKS },
  { id: "database", name: "数据库原理与应用", weekday: 3, location: "南教502", periods: [3], sections: [6, 7, 8], timeRanges: [{ start: "14:00", end: "16:20" }], weeks: ALL_WEEKS },
  { id: "requirements-analysis", name: "软件需求分析", weekday: 3, location: "敏学102", periods: [4], sections: [9, 10], timeRanges: [{ start: "16:30", end: "18:00" }], weeks: ALL_WEEKS },
  { id: "database-lab", name: "数据库实验", weekday: 3, location: "敏学楼312", periods: [5], sections: [11, 12], timeRanges: [{ start: "19:00", end: "20:30" }], weeks: EVEN_WEEKS },
  { id: "guangdong-practice", name: "走在前列的广东实践", weekday: 4, location: "北教217", periods: [2], sections: [3, 4, 5], timeRanges: [{ start: "10:00", end: "12:20" }], weeks: LATE_WEEKS },
  { id: "web-programming", name: "Web程序设计", weekday: 4, location: "南教501", periods: [4], sections: [9, 10], timeRanges: [{ start: "16:30", end: "18:00" }], weeks: ALL_WEEKS },
  { id: "web-programming-lab", name: "Web程序设计实验", weekday: 4, location: "敏学楼414", periods: [5], sections: [11, 12], timeRanges: [{ start: "19:00", end: "20:30" }], weeks: EVEN_WEEKS },
  { id: "current-affairs-7-8", name: "形势与政策", weekday: 5, location: "北教113", periods: [3], sections: [6, 7, 8], timeRanges: [{ start: "14:00", end: "16:20" }], weeks: [7, 8] },
  { id: "current-affairs-9", name: "形势与政策", weekday: 5, location: "南阶102", periods: [2], sections: [3, 4, 5], timeRanges: [{ start: "10:00", end: "12:20" }], weeks: [9] },
];
