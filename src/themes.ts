import type { ThemeConfig } from "antd";

// ===== 两套主题：暖（沙丘）/ 深（黑白印刷）=====

export type ThemeKey = "dune" | "monochrome-print";

export type Theme = {
  key: ThemeKey;
  name: string;
  isDark: boolean;
  antd: ThemeConfig;
  vars: Record<string, string>;
};

export const THEMES: Theme[] = [
  {
    key: "dune",
    name: "暖",
    isDark: false,
    antd: {
      token: {
        fontSize: 13,
        colorPrimary: "#8c6a48",
        colorBgLayout: "#dcc8a5",
        colorBgContainer: "#f0e6d2",
        colorBgElevated: "#f0e6d2",
        colorText: "#1f1a14",
        borderRadius: 4,
      },
    },
    vars: {
      "--accent": "#8c6a48",
      "--accent-bg": "#f3e9db",
      "--card-bg": "#f0e6d2",
      "--text": "#1f1a14",
      "--text-secondary": "#6b5c46",
      "--border": "#c4b496",
      "--empty-day": "#e3d7bf",
    },
  },
  {
    key: "monochrome-print",
    name: "深",
    isDark: false,
    antd: {
      token: {
        fontSize: 13,
        colorPrimary: "#1a3a8c",
        colorBgLayout: "#e5e7eb",
        colorBgContainer: "#fbf9f4",
        colorBgElevated: "#fbf9f4",
        colorText: "#0e1418",
        borderRadius: 4,
      },
    },
    vars: {
      "--accent": "#1a3a8c",
      "--accent-bg": "#eef1f8",
      "--card-bg": "#fbf9f4",
      "--text": "#0e1418",
      "--text-secondary": "#6b7178",
      "--border": "#c9c5b8",
      "--empty-day": "#e5e7eb",
    },
  },
];
