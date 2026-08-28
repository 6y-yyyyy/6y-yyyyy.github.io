import { useEffect, useState, type CSSProperties } from "react";
import { Layout, Menu, Grid, Button, Drawer, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { ApartmentOutlined, BugOutlined, CalendarOutlined, DatabaseOutlined, ExperimentOutlined, FireOutlined, HistoryOutlined, HomeOutlined, MenuOutlined, ProjectOutlined } from "@ant-design/icons";
import { SiDatadog } from "react-icons/si";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { TbSwords } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { GiSchoolBag } from "react-icons/gi";
import DashboardPage from "./pages/DashboardPage";
import CurrentPartPage from "./pages/CurrentPartPage";
import DailyChallengePage from "./pages/DailyChallengePage";
import BestiaryPage from "./pages/BestiaryPage";
import ShowcasePage from "./pages/ShowcasePage";
import TrainingPage from "./pages/TrainingPage";
import MemoryPage from "./pages/MemoryPage";
import OverallPlanPage from "./pages/OverallPlanPage";
import ContributionsPage from "./pages/ContributionsPage";
import CompletedPage from "./pages/CompletedPage";
import SchedulePage from "./pages/SchedulePage";
import { THEMES, type ThemeKey } from "./themes";
import "./drawer.css";

const { Sider, Content } = Layout;
type AdventurePageKey = "dashboard" | "current" | "challenge" | "training" | "memory" | "bestiary" | "showcase" | "overall" | "contributions" | "completed";
type PageKey = AdventurePageKey | "schedule";
const MENU_ITEMS = [
  { key: "dashboard", icon: <HomeOutlined />, label: "今日冒险" },
  { key: "current", icon: <TbSwords />, label: "主线任务" },
  { key: "challenge", icon: <FireOutlined />, label: "每日打怪" },
  { key: "training", icon: <ExperimentOutlined />, label: "勇者训练营" },
  { key: "memory", icon: <DatabaseOutlined />, label: "专属记忆库" },
  { key: "bestiary", icon: <BugOutlined />, label: "怪物图鉴" },
  { key: "showcase", icon: <ProjectOutlined />, label: "作品陈列柜" },
  { key: "overall", icon: <ApartmentOutlined />, label: "升级路线" },
  { key: "contributions", icon: <CalendarOutlined />, label: "学习日历" },
  { key: "completed", icon: <HistoryOutlined />, label: "战绩复盘" },
];

export default function App() {
  const mobile = !Grid.useBreakpoint().md;
  const [page, setPage] = useState<PageKey>("dashboard");
  const [drawer, setDrawer] = useState(false);
  const [themeKey, setThemeKey] = useState<ThemeKey>("dune");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileArea, setMobileArea] = useState<"adventure" | "backpack">("adventure");
  const theme = THEMES.find((item) => item.key === themeKey)!;
  const width = collapsed ? 80 : 210;
  const navigate = (target: PageKey) => { setPage(target); setDrawer(false); };
  const adventureMenu = <Menu mode="inline" selectedKeys={[page]} items={MENU_ITEMS} style={{ background: "transparent" }} onClick={(event) => navigate(event.key as PageKey)} />;
  const backpackMenu = <Menu mode="inline" selectedKeys={[page]} items={[{ key: "schedule", icon: <HiOutlineClipboardList />, label: "课程表" }]} style={{ background: "transparent" }} onClick={() => navigate("schedule")} />;
  const openBackpack = () => { setMobileArea("backpack"); setPage("schedule"); };
  const openAdventure = () => { setMobileArea("adventure"); setPage("dashboard"); };
  const themeButton = <Button aria-label="切换主题" type="text" onClick={() => setThemeKey(themeKey === "dune" ? "monochrome-print" : "dune")} icon={themeKey === "dune" ? <MdWbSunny /> : <FaMoon />} />;

  useEffect(() => {
    if (!mobile && page === "schedule") openAdventure();
  }, [mobile, page]);

  return <ConfigProvider locale={zhCN} theme={theme.antd}><div style={theme.vars as CSSProperties}><Layout style={{ minHeight: "100vh" }}>
    {!mobile && <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={210} collapsedWidth={80} theme="light" style={{ position: "fixed", height: "100vh", left: 0, top: 0, overflow: "auto", borderRight: "1px solid var(--border)", background: "var(--card-bg)" }}><div className="brand">{collapsed ? <SiDatadog /> : <><span><SiDatadog />你赢历险记</span>{themeButton}</>}</div>{adventureMenu}</Sider>}
    {mobile && <><header className="mobile-header"><Button aria-label="打开菜单" icon={<MenuOutlined />} onClick={() => setDrawer(true)} /><strong>{mobileArea === "adventure" ? <SiDatadog /> : <GiSchoolBag />}{mobileArea === "adventure" ? "你赢历险记" : "背包"}</strong><span>{themeButton}</span></header><Drawer title={<div className="drawer-title"><strong>{mobileArea === "adventure" ? "冒险菜单" : "背包"}</strong><Button type="text" aria-label={mobileArea === "adventure" ? "打开背包" : "返回冒险菜单"} icon={mobileArea === "adventure" ? <GiSchoolBag /> : <SiDatadog />} onClick={mobileArea === "adventure" ? openBackpack : openAdventure} /></div>} open={drawer} onClose={() => setDrawer(false)} placement="left" width={240}>{mobileArea === "adventure" ? adventureMenu : backpackMenu}</Drawer></>}
    <Content style={{ padding: mobile ? "70px 14px 28px" : "28px", marginLeft: mobile ? 0 : width, transition: "margin .2s" }}>
      {page === "dashboard" && <DashboardPage onNavigate={(target) => navigate(target)} />}
      {page === "current" && <CurrentPartPage />}{page === "challenge" && <DailyChallengePage />}{page === "training" && <TrainingPage />}{page === "memory" && <MemoryPage />}{page === "bestiary" && <BestiaryPage />}{page === "showcase" && <ShowcasePage />}{page === "overall" && <OverallPlanPage />}{page === "contributions" && <ContributionsPage />}{page === "completed" && <CompletedPage />}
      {mobile && page === "schedule" && <SchedulePage />}
    </Content>
  </Layout></div></ConfigProvider>;
}
