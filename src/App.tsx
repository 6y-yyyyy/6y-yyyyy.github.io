import { useState } from "react";
import type { CSSProperties } from "react";
import { Layout, Menu, Grid, Button, Drawer, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { MenuOutlined, ReadOutlined, ApartmentOutlined, CalendarOutlined, HistoryOutlined } from "@ant-design/icons";
import { SiDatadog } from "react-icons/si";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import CurrentPartPage from "./pages/CurrentPartPage";
import OverallPlanPage from "./pages/OverallPlanPage";
import ContributionsPage from "./pages/ContributionsPage";
import CompletedPage from "./pages/CompletedPage";
import { THEMES, type ThemeKey } from "./themes";

const { Sider, Content } = Layout;

type PageKey = "current" | "overall" | "contributions" | "completed";

const MENU_ITEMS = [
  { key: "current", icon: <ReadOutlined />, label: "当前学习部分" },
  { key: "overall", icon: <ApartmentOutlined />, label: "学习整体计划" },
  { key: "contributions", icon: <CalendarOutlined />, label: "每日贡献" },
  { key: "completed", icon: <HistoryOutlined />, label: "已学任务" },
];

export default function App() {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const [page, setPage] = useState<PageKey>("current");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeKey, setThemeKey] = useState<ThemeKey>("dune");
  const [collapsed, setCollapsed] = useState(false);

  const currentTheme = THEMES.find((t) => t.key === themeKey)!;
  const isDark = currentTheme.isDark;
  const sidebarWidth = collapsed ? 80 : 200;
  const isWarm = themeKey === "dune";

  const menu = (
    <Menu
      mode="inline"
      theme={isDark ? "dark" : "light"}
      selectedKeys={[page]}
      items={MENU_ITEMS}
      style={{ background: "transparent" }}
      onClick={(e) => {
        setPage(e.key as PageKey);
        setDrawerOpen(false);
      }}
    />
  );

  // 主题切换按钮：暖=太阳、深=月亮，点击来回切换（无边框，只显示图标）
  const themeButton = (
    <Button
      type="text"
      size="small"
      onClick={() => setThemeKey(isWarm ? "monochrome-print" : "dune")}
      style={{
        color: "var(--accent)",
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        width: 24,
        height: 24,
      }}
    >
      {isWarm ? <MdWbSunny /> : <FaMoon />}
    </Button>
  );

  return (
    <ConfigProvider locale={zhCN} theme={currentTheme.antd}>
      <div style={currentTheme.vars as CSSProperties}>
        <Layout style={{ minHeight: "100vh" }}>
          {/* 桌面：左侧固定侧边栏（可收起） */}
          {!isMobile && (
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={setCollapsed}
              width={200}
              collapsedWidth={80}
              theme={isDark ? "dark" : "light"}
              style={{
                position: "fixed", height: "100vh", left: 0, top: 0,
                borderRight: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: 8, padding: "12px 10px 8px",
                }}
              >
                {collapsed ? (
                  <div style={{ width: "100%", display: "flex", justifyContent: "center", color: "var(--accent)", fontSize: 18 }}>
                    <SiDatadog />
                  </div>
                ) : (
                  <>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 17, whiteSpace: "nowrap", color: "var(--accent)" }}>
                      <SiDatadog />
                      你赢成长记
                    </span>
                    {themeButton}
                  </>
                )}
              </div>
              {menu}
            </Sider>
          )}

          {/* 手机：顶部栏 + 抽屉菜单 */}
          {isMobile && (
            <>
              <div
                style={{
                  position: "fixed", top: 0, left: 0, right: 0, zIndex: 10,
                  background: "var(--card-bg)", padding: "10px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                <Button icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} />
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 19, color: "var(--accent)" }}>
                  <SiDatadog />
                  你赢成长记
                </span>
                <div style={{ marginLeft: "auto" }}>{themeButton}</div>
              </div>
              <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} placement="left" width={220}>
                {menu}
              </Drawer>
            </>
          )}

          {/* 内容区 */}
          <Content
            style={{
              padding: isMobile ? "60px 16px 24px" : "24px",
              marginLeft: isMobile ? 0 : sidebarWidth,
            }}
          >
            {page === "current" && <CurrentPartPage />}
            {page === "overall" && <OverallPlanPage />}
            {page === "contributions" && <ContributionsPage />}
            {page === "completed" && <CompletedPage />}
          </Content>
        </Layout>
      </div>
    </ConfigProvider>
  );
}
