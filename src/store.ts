import { useEffect, useState } from "react";
import { findItem } from "./data/plan";

// ===== 本地状态（存在浏览器 localStorage 里，刷新不丢）=====

const DONE_KEY = "study_tracker_done";
const DAYS_KEY = "study_tracker_days";
const LOG_KEY = "study_tracker_log";

// 一条「完成记录」
export type StudyLog = {
  id: string;
  itemId: string;
  partTitle: string; // 属于哪一环（如 "① 语言地基"）
  itemTitle: string; // 具体哪个学习项
  doneAt: number; // 完成时刻的毫秒时间戳
};

// 今天的日期字符串，如 "2026-08-27"（用本地时区）
function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function useStore() {
  // 已完成的学习项 id 列表
  const [doneItems, setDoneItems] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(DONE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  // 有学习记录的日期列表
  const [studyDays, setStudyDays] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(DAYS_KEY) || "[]");
    } catch {
      return [];
    }
  });

  // 完成日志（每勾选一个任务记一条）
  const [log, setLog] = useState<StudyLog[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    } catch {
      return [];
    }
  });

  // 每次变化就存回 localStorage
  useEffect(() => {
    localStorage.setItem(DONE_KEY, JSON.stringify(doneItems));
  }, [doneItems]);

  useEffect(() => {
    localStorage.setItem(DAYS_KEY, JSON.stringify(studyDays));
  }, [studyDays]);

  useEffect(() => {
    localStorage.setItem(LOG_KEY, JSON.stringify(log));
  }, [log]);

  // 勾选 / 取消一个学习项；勾选时记一条「完成记录」，取消时删掉对应记录
  const toggleItem = (id: string) => {
    const isDone = doneItems.includes(id);
    if (isDone) {
      setDoneItems(doneItems.filter((x) => x !== id));
      setLog(log.filter((r) => r.itemId !== id));
    } else {
      const now = Date.now();
      const info = findItem(id);
      setDoneItems([...doneItems, id]);
      setLog([
        ...log,
        {
          id: `${id}-${now}`,
          itemId: id,
          partTitle: info?.partTitle ?? "",
          itemTitle: info?.itemTitle ?? id,
          doneAt: now,
        },
      ]);
    }
    const today = todayStr();
    setStudyDays((prev) => (prev.includes(today) ? prev : [...prev, today]));
  };

  return { doneItems, studyDays, log, toggleItem };
}
