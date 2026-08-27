import { useState } from "react";
import { Card, Select, Button, Space, Grid } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useStore } from "../store";

const WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"];

function dateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function addMonths(y: number, m: number, delta: number) {
  const total = y * 12 + (m - 1) + delta;
  return { y: Math.floor(total / 12), m: (total % 12) + 1 };
}

const idx = (y: number, m: number) => y * 12 + (m - 1);

function MonthGrid({
  year,
  month,
  studyDays,
  isMobile,
}: {
  year: number;
  month: number;
  studyDays: string[];
  isMobile: boolean;
}) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const grid = (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 24px)", gap: 4 }}>
      {WEEKDAYS.map((w) => (
        <div key={w} style={{ width: 24, height: 16, textAlign: "center", color: "var(--text-secondary)", fontSize: 10, lineHeight: "16px" }}>
          {w}
        </div>
      ))}
      {cells.map((d, i) =>
        d === null ? (
          <div key={i} />
        ) : (
          <div
            key={i}
            style={{
              width: 24, height: 24, borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11,
              background: studyDays.includes(dateStr(year, month, d)) ? "var(--accent)" : "var(--empty-day)",
              color: studyDays.includes(dateStr(year, month, d)) ? "#fff" : "var(--text-secondary)",
            }}
          >
            {d}
          </div>
        )
      )}
    </div>
  );

  // 手机：标题放右边；电脑：标题放上方居中
  if (isMobile) {
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {grid}
        <div style={{ flex: 1, textAlign: "center", fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>
          {year}年{month}月
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4, textAlign: "center" }}>
        {year}年{month}月
      </div>
      {grid}
    </div>
  );
}

export default function ContributionsPage() {
  const { studyDays } = useStore();
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const defaultStart = addMonths(currentYear, currentMonth, -2);
  const [startYear, setStartYear] = useState(defaultStart.y);
  const [startMonth, setStartMonth] = useState(defaultStart.m);

  const months = [0, 1, 2].map((d) => addMonths(startYear, startMonth, d));
  const nextDisabled = idx(startYear, startMonth) >= idx(currentYear, currentMonth) - 2;

  const shift = (delta: number) => {
    const ns = addMonths(startYear, startMonth, delta);
    setStartYear(ns.y);
    setStartMonth(ns.m);
  };

  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Card title={<div style={{ textAlign: "center", fontSize: 18, fontWeight: 700 }}>肝帝日历</div>}>
        <Space style={{ marginBottom: 16, flexWrap: "wrap" }}>
          <Button icon={<LeftOutlined />} onClick={() => shift(-1)} />
          <Select
            value={startYear}
            style={{ width: 88 }}
            onChange={setStartYear}
            options={years.map((y) => ({ value: y, label: `${y}年` }))}
          />
          <Select
            value={startMonth}
            style={{ width: 76 }}
            onChange={setStartMonth}
            options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1}月` }))}
          />
          <Button icon={<RightOutlined />} onClick={() => shift(1)} disabled={nextDisabled} />
        </Space>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24, flexWrap: "wrap" }}>
          {months.map((mo, i) => (
            <MonthGrid key={i} year={mo.y} month={mo.m} studyDays={studyDays} isMobile={isMobile} />
          ))}
        </div>
      </Card>
    </div>
  );
}
