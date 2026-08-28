import { COURSES, type Course } from "./data/courses";

export const TERM_START = "2026-09-06";
export const CLASS_START = "2026-09-07";
export const TERM_END = "2026-12-26";
export const WEEKDAY_NAMES = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const DAY_MS = 86_400_000;

export const parseDate = (value: string): Date | null => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.getFullYear() === Number(year) && date.getMonth() === Number(month) - 1 && date.getDate() === Number(day) ? date : null;
};

const utcDay = (date: Date) => Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

export const calculateAcademicWeek = (dateValue: string): number | null => {
  const date = parseDate(dateValue);
  const termStart = parseDate(TERM_START)!;
  const termEnd = parseDate(TERM_END)!;
  const classStart = parseDate(CLASS_START)!;
  if (!date || date < classStart || date > termEnd) return null;
  const week = Math.floor((utcDay(date) - utcDay(termStart)) / DAY_MS / 7) + 1;
  return week >= 1 && week <= 16 ? week : null;
};

export type DailySchedule = { date: Date | null; weekday: number | null; academicWeek: number | null; courses: Course[] };

export const getDailySchedule = (dateValue: string): DailySchedule => {
  const date = parseDate(dateValue);
  const weekday = date?.getDay() ?? null;
  const academicWeek = calculateAcademicWeek(dateValue);
  const courses = weekday === null || academicWeek === null ? [] : COURSES
    .filter((course) => course.weekday === weekday && course.weeks.includes(academicWeek))
    .sort((left, right) => left.periods[0] - right.periods[0]);
  return { date, weekday, academicWeek, courses };
};

export const formatNumberRange = (values: number[]): string => values.length === 1 ? String(values[0]) : `${values[0]}-${values[values.length - 1]}`;
export const formatDateInput = (date: Date): string => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
