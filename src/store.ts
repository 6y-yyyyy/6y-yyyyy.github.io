import { useEffect, useState } from "react";
import { findItem } from "./data/plan";

const DONE_KEY = "study_tracker_done";
const DAYS_KEY = "study_tracker_days";
const LOG_KEY = "study_tracker_log";
const VERIFIED_STAGE_02_BACKFILL_KEY = "study_tracker_backfill_stage_02_2026_09";

export type StudyLog = {
  id: string;
  itemId: string;
  partTitle: string;
  itemTitle: string;
  doneAt: number;
  kind?: "completion" | "progress" | "algorithm";
  note?: string;
};

export function todayStr(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function readList<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}

const VERIFIED_STAGE_02_BACKFILL = [
  { date: "2026-09-08", doneAt: new Date("2026-09-08T22:18:00+08:00").getTime(), note: "学习作用域与闭包，理解闭包的原理和实际作用。" },
  { date: "2026-09-10", doneAt: new Date("2026-09-10T13:34:00+08:00").getTime(), note: "学习 this、call / apply / bind、数组高阶方法，并开始理解 Promise。" },
  { date: "2026-09-12", doneAt: new Date("2026-09-12T13:05:00+08:00").getTime(), note: "继续学习 Promise、async / await、异常处理和异步任务加载流程。" },
  { date: "2026-09-13", doneAt: new Date("2026-09-13T10:05:00+08:00").getTime(), note: "拆解异步任务加载流程，学习模块化的 export 与 import。" },
];

function applyVerifiedStage02Backfill() {
  try {
    if (localStorage.getItem(VERIFIED_STAGE_02_BACKFILL_KEY) === "1") return;
    const info = findItem("intern-03");
    if (!info) return;
    const days = readList<string>(DAYS_KEY);
    const records = readList<StudyLog>(LOG_KEY);

    for (const entry of VERIFIED_STAGE_02_BACKFILL) {
      if (!days.includes(entry.date)) days.push(entry.date);
      const id = `progress-intern-03-${entry.date}`;
      if (!records.some((record) => record.id === id)) {
        records.push({
          id,
          itemId: "intern-03",
          partTitle: info.partTitle,
          itemTitle: info.itemTitle,
          doneAt: entry.doneAt,
          kind: "progress",
          note: entry.note,
        });
      }
    }

    localStorage.setItem(DAYS_KEY, JSON.stringify(days));
    localStorage.setItem(LOG_KEY, JSON.stringify(records));
    localStorage.setItem(VERIFIED_STAGE_02_BACKFILL_KEY, "1");
  } catch {
    // localStorage 不可用时保留现状，不影响页面其余功能。
  }
}

export function useStore() {
  applyVerifiedStage02Backfill();
  const [doneItems, setDoneItems] = useState<string[]>(() => readList(DONE_KEY));
  const [studyDays, setStudyDays] = useState<string[]>(() => readList(DAYS_KEY));
  const [log, setLog] = useState<StudyLog[]>(() => readList(LOG_KEY));

  useEffect(() => localStorage.setItem(DONE_KEY, JSON.stringify(doneItems)), [doneItems]);
  useEffect(() => localStorage.setItem(DAYS_KEY, JSON.stringify(studyDays)), [studyDays]);
  useEffect(() => localStorage.setItem(LOG_KEY, JSON.stringify(log)), [log]);

  const lightUpDate = (date: string) => {
    setStudyDays((days) => days.includes(date) ? days : [...days, date]);
  };

  const lightUpToday = () => {
    lightUpDate(todayStr());
  };

  const toggleItem = (id: string) => {
    const isDone = doneItems.includes(id);
    if (isDone) {
      setDoneItems((items) => items.filter((itemId) => itemId !== id));
      setLog((records) => records.filter((record) => record.itemId !== id || record.kind === "progress"));
    } else {
      const now = Date.now();
      const info = findItem(id);
      setDoneItems((items) => [...items, id]);
      setLog((records) => [...records, { id: `${id}-${now}`, itemId: id, partTitle: info?.partTitle ?? "", itemTitle: info?.itemTitle ?? id, doneAt: now, kind: "completion" }]);
      lightUpToday();
    }
  };

  const recordStudyProgress = (id: string, note = "", date = todayStr()) => {
    const info = findItem(id);
    if (!info) return;
    const [year, month, day] = date.split("-").map(Number);
    const isToday = date === todayStr();
    const recordedAt = isToday ? Date.now() : new Date(year, month - 1, day, 12, 0, 0).getTime();
    const recordId = `progress-${id}-${date}`;
    const nextRecord: StudyLog = {
      id: recordId,
      itemId: id,
      partTitle: info.partTitle,
      itemTitle: info.itemTitle,
      doneAt: recordedAt,
      kind: "progress",
      note: note.trim() || undefined,
    };
    setLog((records) => [...records.filter((record) => record.id !== recordId), nextRecord]);
    lightUpDate(date);
  };

  const recordAlgorithmChallenge = (platform: "力扣" | "牛客", completed: boolean) => {
    const date = todayStr();
    const itemId = `algorithm-${date}`;
    if (completed) {
      const now = Date.now();
      setLog((records) => [
        ...records.filter((record) => record.itemId !== itemId),
        { id: `${itemId}-${now}`, itemId, partTitle: "每周悬赏", itemTitle: `在${platform}完成算法练习`, doneAt: now, kind: "algorithm" },
      ]);
      lightUpToday();
    } else {
      setLog((records) => records.filter((record) => record.itemId !== itemId));
    }
  };

  return { doneItems, studyDays, log, toggleItem, recordStudyProgress, recordAlgorithmChallenge };
}
