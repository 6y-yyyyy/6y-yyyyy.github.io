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
      "--challenge-hero-start": "#f0e6d2",
      "--challenge-hero-middle": "#e5cfaa",
      "--challenge-hero-end": "#d7b988",
      "--challenge-shadow": "rgba(91, 67, 38, 0.1)",
      "--challenge-orb-start": "#c98b55",
      "--challenge-orb-end": "#8c5c38",
      "--challenge-orb-shadow": "rgba(140, 92, 56, 0.25)",
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
      "--challenge-hero-start": "#fbf9f4",
      "--challenge-hero-middle": "#e9edf4",
      "--challenge-hero-end": "#d5ddea",
      "--challenge-shadow": "rgba(26, 58, 140, 0.1)",
      "--challenge-orb-start": "#4c69ad",
      "--challenge-orb-end": "#1a3a8c",
      "--challenge-orb-shadow": "rgba(26, 58, 140, 0.24)",
    },
  },
];
