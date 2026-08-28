import { useEffect, useState } from "react";
import { findItem } from "./data/plan";

const DONE_KEY = "study_tracker_done";
const DAYS_KEY = "study_tracker_days";
const LOG_KEY = "study_tracker_log";

export type StudyLog = {
  id: string;
  itemId: string;
  partTitle: string;
  itemTitle: string;
  doneAt: number;
};

export function todayStr(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function readList<T>(key: string): T[] {
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
}

export function useStore() {
  const [doneItems, setDoneItems] = useState<string[]>(() => readList(DONE_KEY));
  const [studyDays, setStudyDays] = useState<string[]>(() => readList(DAYS_KEY));
  const [log, setLog] = useState<StudyLog[]>(() => readList(LOG_KEY));

  useEffect(() => localStorage.setItem(DONE_KEY, JSON.stringify(doneItems)), [doneItems]);
  useEffect(() => localStorage.setItem(DAYS_KEY, JSON.stringify(studyDays)), [studyDays]);
  useEffect(() => localStorage.setItem(LOG_KEY, JSON.stringify(log)), [log]);

  const lightUpToday = () => {
    const today = todayStr();
    setStudyDays((days) => days.includes(today) ? days : [...days, today]);
  };

  const toggleItem = (id: string) => {
    const isDone = doneItems.includes(id);
    if (isDone) {
      setDoneItems((items) => items.filter((itemId) => itemId !== id));
      setLog((records) => records.filter((record) => record.itemId !== id));
    } else {
      const now = Date.now();
      const info = findItem(id);
      setDoneItems((items) => [...items, id]);
      setLog((records) => [...records, { id: `${id}-${now}`, itemId: id, partTitle: info?.partTitle ?? "", itemTitle: info?.itemTitle ?? id, doneAt: now }]);
      lightUpToday();
    }
  };

  const recordAlgorithmChallenge = (platform: "力扣" | "牛客", completed: boolean) => {
    const date = todayStr();
    const itemId = `algorithm-${date}`;
    if (completed) {
      const now = Date.now();
      setLog((records) => [
        ...records.filter((record) => record.itemId !== itemId),
        { id: `${itemId}-${now}`, itemId, partTitle: "每日打怪", itemTitle: `今天上${platform}打怪`, doneAt: now },
      ]);
      lightUpToday();
    } else {
      setLog((records) => records.filter((record) => record.itemId !== itemId));
    }
  };

  return { doneItems, studyDays, log, toggleItem, recordAlgorithmChallenge };
}
