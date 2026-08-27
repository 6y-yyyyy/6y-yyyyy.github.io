import { useEffect, useState } from "react";

// ===== 本地状态（存在浏览器 localStorage 里，刷新不丢）=====

const DONE_KEY = "study_tracker_done";
const DAYS_KEY = "study_tracker_days";

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

  // 每次变化就存回 localStorage
  useEffect(() => {
    localStorage.setItem(DONE_KEY, JSON.stringify(doneItems));
  }, [doneItems]);

  useEffect(() => {
    localStorage.setItem(DAYS_KEY, JSON.stringify(studyDays));
  }, [studyDays]);

  // 勾选 / 取消一个学习项；同时把今天标记为"学习过"
  const toggleItem = (id: string) => {
    setDoneItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    const today = todayStr();
    setStudyDays((prev) => (prev.includes(today) ? prev : [...prev, today]));
  };

  return { doneItems, studyDays, toggleItem };
}
