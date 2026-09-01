export type Resource = { title: string; url: string; type: "文档" | "课程" };
export type LearningItem = { id: string; title: string; time: string; outcome: string; resources: Resource[]; studySteps: string[]; topics: string[]; miniProject: string; passCriteria: string[]; aiLevel: 1 | 2 | 3; aiRule: string };
export type Part = { id: string; title: string; level: string; summary: string; milestone: string; bossBattle: string; bossCriteria: string[]; retrospective: string[]; items: LearningItem[] };
export type SideQuest = { id: string; title: string; description: string; topics: string[] };

const doc = (title: string, url: string): Resource => ({ title, url, type: "文档" });
const RESOURCES: Record<number, Resource[]> = {
  1: [doc("Pro Git：Git 基础", "https://git-scm.com/book/zh/v2/Git-基础-获取-Git-仓库"), doc("GitHub：解决合并冲突", "https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line")],
  2: [doc("Node.js：npm 简介", "https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager"), doc("Vite：开始", "https://cn.vite.dev/guide/"), doc("Vite：环境变量", "https://cn.vite.dev/guide/env-and-mode")],
  3: [doc("MDN：JavaScript 指南", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide"), doc("MDN：使用 Promise", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises"), doc("MDN：事件循环", "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Event_loop")],
  4: [doc("MDN：HTTP 概览", "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview"), doc("MDN：使用 Fetch", "https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch"), doc("MDN：CORS", "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS")],
  5: [doc("TypeScript Handbook", "https://www.typescriptlang.org/docs/handbook/intro.html"), doc("React：使用 TypeScript", "https://zh-hans.react.dev/learn/typescript")],
  6: [doc("React：快速入门", "https://zh-hans.react.dev/learn"), doc("React：状态管理", "https://zh-hans.react.dev/learn/managing-state"), doc("React Router：教程", "https://reactrouter.com/start/declarative/installation")],
  7: [doc("React：从设计稿到实现", "https://zh-hans.react.dev/learn/thinking-in-react"), doc("web.dev：响应式设计", "https://web.dev/learn/design/")],
  8: [doc("Python 官方教程", "https://docs.python.org/zh-cn/3/tutorial/"), doc("Python：虚拟环境和包", "https://docs.python.org/zh-cn/3/tutorial/venv.html")],
  9: [doc("FastAPI 官方教程", "https://fastapi.tiangolo.com/zh/tutorial/"), doc("FastAPI：错误处理", "https://fastapi.tiangolo.com/zh/tutorial/handling-errors/")],
  10: [doc("PostgreSQL 官方教程", "https://www.postgresql.org/docs/current/tutorial.html"), doc("PostgreSQL：SQL 语言", "https://www.postgresql.org/docs/current/sql.html")],
  11: [doc("FastAPI：SQL 数据库", "https://fastapi.tiangolo.com/tutorial/sql-databases/"), doc("OWASP：认证速查表", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html")],
  12: [doc("OpenAI：文本生成", "https://platform.openai.com/docs/guides/text"), doc("OpenAI：结构化输出", "https://platform.openai.com/docs/guides/structured-outputs"), doc("OpenAI：生产最佳实践", "https://platform.openai.com/docs/guides/production-best-practices")],
  13: [doc("OpenAI：流式响应", "https://platform.openai.com/docs/guides/streaming-responses"), doc("MDN：Server-sent events", "https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events")],
  14: [doc("OpenAI：Function Calling", "https://platform.openai.com/docs/guides/function-calling"), doc("OpenAI：Tools", "https://platform.openai.com/docs/guides/tools")],
  15: [doc("OpenAI：Retrieval", "https://platform.openai.com/docs/guides/retrieval"), doc("OpenAI：Embeddings", "https://platform.openai.com/docs/guides/embeddings")],
  16: [doc("OpenAI：构建 Agents", "https://platform.openai.com/docs/guides/agents"), doc("OpenAI：Agent Evals", "https://platform.openai.com/docs/guides/agent-evals"), doc("MCP 官方介绍", "https://modelcontextprotocol.io/introduction")],
  17: [doc("React：阅读现有代码时的核心概念", "https://zh-hans.react.dev/learn/describing-the-ui"), doc("GitHub：理解代码变更", "https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests")],
  18: [doc("Vite：部署静态站点", "https://cn.vite.dev/guide/static-deploy.html"), doc("Docker：入门", "https://docs.docker.com/get-started/")],
  19: [doc("GitHub：关于 README", "https://docs.github.com/zh/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes"), doc("GitHub：仓库最佳实践", "https://docs.github.com/zh/repositories/creating-and-managing-repositories/best-practices-for-repositories")],
  20: [doc("MDN：Web 开发学习路径", "https://developer.mozilla.org/zh-CN/docs/Learn_web_development"), doc("React：渲染和提交", "https://zh-hans.react.dev/learn/render-and-commit")],
  21: [doc("GitHub：准备代码审查", "https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests/getting-started/helping-others-review-your-changes"), doc("web.dev：性能学习", "https://web.dev/learn/performance/")],
  22: [doc("GitHub Docs：使用个人资料展示作品", "https://docs.github.com/zh/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/about-your-profile")],
  23: [doc("GitHub：管理求职项目仓库", "https://docs.github.com/zh/repositories/creating-and-managing-repositories/best-practices-for-repositories")],
};

const PRACTICE: Record<number, string> = {
  1: "在练习仓库创建 feature 分支，修改一个功能，完成两次小提交，合并回主分支并推送；故意制造一次简单冲突后自行解决。",
  2: "从空目录创建 Vite + React + TypeScript 项目，安装一个依赖，添加 dev/build 脚本和环境变量示例，并写下启动失败排查顺序。",
  3: "用模块化 JavaScript 写一个异步任务加载器：转换数组数据，并完整处理 loading、成功、空数据和失败重试。",
  4: "在浏览器中请求一个公开 API，用 Network 面板记录请求方法、状态码、Header、JSON 响应和一次 CORS 或网络错误。",
  5: "为任务数据、组件 Props、表单事件和请求状态建立类型；使用联合类型表达 loading/success/error，消除核心代码中的 any。",
  6: "开发一个带路由、列表、筛选和表单的任务应用；画出组件树，并解释一次用户操作如何更新 State 和 UI。",
  7: "选择一个真实小问题，先写需求与验收清单，再完成 React + TypeScript 项目、Git 提交、移动端检查和线上部署。",
  8: "编写一个命令行学习记录工具：使用函数、class、模块、类型标注和异常处理，并在虚拟环境中管理依赖。",
  9: "为学习记录实现 FastAPI CRUD 接口，拆分 Router，加入参数校验和统一错误响应，再用前端或 API 客户端联调。",
  10: "为用户、学习任务和完成记录设计 PostgreSQL 表，写出建表、CRUD、JOIN 和索引语句，并解释主外键关系。",
  11: "给现有 React 项目加入一个真实全栈模块：登录后创建、查询、修改和删除数据，刷新后数据仍在数据库中。",
  12: "通过后端安全调用 LLM API，实现一个返回结构化学习建议的接口；记录输入、输出、Token 使用和异常状态。",
  13: "把普通 AI 响应改成 SSE 流式输出，在 React 中实现逐字更新、停止生成、Loading 和 Error 状态。",
  14: "实现“查询学习任务”和“创建学习任务”两个 Tool，校验参数、限制权限，并在界面展示工具调用状态。",
  15: "准备一组自己的学习资料，完成切分、Embedding、检索和带来源回答；用三组问题检查检索是否命中。",
  16: "画出并实现一个最小 Agent Loop：读取目标、选择工具、更新 State、判断是否结束，并为成功和失败各写一个 Eval。",
  17: "在「你赢历险记」选择一个已经学过的模块，先画数据流，再亲自完成一次可验证修改、Debug 记录和代码说明。",
  18: "把一个全栈项目部署到真实环境，配置前后端地址、数据库和环境变量，并验证 HTTPS、日志与重启恢复。",
  19: "整理一个核心 GitHub 仓库：补齐背景、功能、截图、技术栈、架构图、数据流、本地运行方式和在线 Demo。",
  20: "从自己的项目各整理一个 JavaScript、React、HTTP 和 Git 实例；用自己的话回答并在代码中指出证据。",
  21: "录制一次 5 分钟项目讲解并做模拟追问：技术选型、数据流、最难 Bug、AI 参与边界和个人技术决策。",
  22: "完成一页简历 V1；每条技能和项目描述都关联到仓库、在线 Demo、提交记录或可讲清的真实实现。",
  23: "建立投递记录表并开始真实投递；每次笔试或面试后，把不会的问题转成一个可执行支线任务。",
};

const makeTask = (id: number, title: string, outcome: string, topics: string[], criteria: string[], aiLevel: 1 | 2 | 3 = 2): LearningItem => ({
  id: `intern-${String(id).padStart(2, "0")}`, title, time: "按掌握程度推进", outcome,
  resources: RESOURCES[id] ?? [], topics,
  studySteps: [
    `先打开“${RESOURCES[id]?.[0]?.title ?? "本关资料"}”，建立本关整体认识，不要求第一次全部记住。`,
    `按顺序学习并做最小练习：${topics.join(" → ")}。`,
    "合上资料，用自己的话写下关键概念，并从零重做最小示例。",
    "完成本关项目实战，再逐项对照通关标准验收；未通过的部分回到对应资料补缺。",
  ],
  miniProject: PRACTICE[id], passCriteria: criteria, aiLevel,
  aiRule: aiLevel === 1 ? "AI 可以解释、出题和检查；核心练习先自己完成。" : aiLevel === 2 ? "AI 可以提示、Review 和 Debug；核心代码要能理解、修改并解释。" : "AI 可以结对开发；关键架构与核心实现必须能独立讲清并验证。",
});
const makePart = (id: number, title: string, summary: string, milestone: string, items: LearningItem[]): Part => ({
  id: `stage-${id}`, level: id === 10 ? "FINAL" : `STAGE ${String(id).padStart(2, "0")}`, title, summary, milestone, items,
  bossBattle: milestone, bossCriteria: items.flatMap((item) => item.passCriteria).slice(0, 4),
  retrospective: ["这一站真正掌握了什么？", "哪些内容还需要在项目中继续练习？", "能否不用背诵，用自己的代码或经历解释？"],
});

export const PROJECT_WORKFLOW = ["明确本关目标", "拆出最小练习", "先自己尝试", "运行并观察", "定位与修复", "对照标准验收", "记录关键收获"];

export const PLAN: Part[] = [
  makePart(1, "整理装备", "先具备管理代码和运行现代前端项目的基本能力。", "独立完成分支开发、合并、推送，并能启动和排查 Vite 项目。", [
    makeTask(1, "Git & GitHub", "掌握日常开发的版本管理闭环。", ["clone / add / commit / push / pull", "branch / merge", ".gitignore / history", "基础冲突解决"], ["独立完成 branch → commit → merge → push", "能查看历史并解决基础冲突"], 1),
    makeTask(2, "现代前端开发环境", "能启动、安装依赖并基本排查现代前端项目。", ["Node.js", "npm / package.json / scripts", "Vite / 目录结构", "环境变量"], ["能安装依赖并运行项目", "能解释 npm scripts 与环境变量边界"], 1),
  ]),
  makePart(2, "JavaScript 强化", "不从零重学，以查漏补缺和读懂真实业务代码为主。", "能阅读常见业务代码，并解释浏览器到后端的数据链路。", [
    makeTask(3, "JavaScript 核心", "补齐作用域、数据处理、异步与执行机制。", ["作用域 / 闭包 / this", "对象 / 数组 / 模块", "Promise / async await", "异常处理 / Event Loop"], ["能解释主要执行流程", "能排查常见异步错误"]),
    makeTask(4, "Web 与浏览器基础", "能解释浏览器、HTTP、后端与页面之间的数据流。", ["DNS / HTTP", "请求 / 响应 / 状态码 / Header", "Cookie / Storage", "Fetch / CORS / JSON"], ["能讲清浏览器 → 请求 → 后端 → 响应 → 页面", "能用 Network 面板定位问题"], 1),
  ]),
  makePart(3, "TypeScript + React", "建立组件、状态与数据流的核心心智，而不是背 API。", "独立完成一个中小型 React + TypeScript Web 应用。", [
    makeTask(5, "TypeScript", "能读写 React 项目中的常见类型代码。", ["基础类型", "interface / type", "联合类型", "函数 / 对象类型", "类型推断 / 泛型基础"], ["能为 Props 和接口数据建模", "常见代码不依赖 any"]),
    makeTask(6, "React 核心", "理解数据变化如何驱动状态、渲染与 UI 更新。", ["Component / JSX / Props / State", "事件 / 条件 / 列表 / 表单", "常用 Hooks", "Router / API / 状态管理"], ["能独立拆分组件", "能解释状态更新到 UI 的过程"]),
  ]),
  makePart(4, "第一个自主项目", "做一个规模适中、真正由自己掌控的 Web 项目。", "交付一个可部署、可演示、可修改的 React + TypeScript 项目。", [
    makeTask(7, "完成一个真正掌控的小型 Web 项目", "获得第一份实习简历的基础项目候选。", ["Router / 状态 / API / 表单", "搜索 / 筛选等真实功能", "Git 管理", "部署"], ["核心代码能阅读、修改和 Debug", "能解释主要数据流", "项目可在线访问"], 3),
  ]),
  makePart(5, "全栈能力", "使用 Python、FastAPI 和 PostgreSQL 打通完整数据链路。", "完成带持久化、基础鉴权和错误处理的全栈功能。", [
    makeTask(8, "Python 基础", "掌握服务于 FastAPI 和 Agent 开发的 Python 基础。", ["语法 / list / dict", "函数 / class / 模块", "异常 / pip / 虚拟环境", "async / 类型标注"], ["能组织小型 Python 模块", "会使用虚拟环境与依赖"]),
    makeTask(9, "FastAPI", "能实现 API 并与 React 联调。", ["Router / GET / POST", "参数 / JSON / Response", "错误 / Middleware", "前后端联调"], ["接口职责和错误响应清晰", "能解释完整请求链路"]),
    makeTask(10, "数据库与 PostgreSQL", "能为 Web 项目设计基本关系数据库。", ["SQL / CRUD", "表 / 主键 / 外键", "JOIN / 索引", "事务基础"], ["能设计基本表结构", "会写常见 CRUD 与 JOIN"]),
    makeTask(11, "完成一个真正的全栈功能", "打通 React、FastAPI 与 PostgreSQL。", ["用户数据 / CRUD", "持久化", "基础鉴权", "错误处理 / 联调"], ["数据刷新后保留", "鉴权和错误边界可验证", "完整链路可解释"], 3),
  ]),
  makePart(6, "AI 应用开发", "从安全调用模型开始，逐步理解流式输出、工具、RAG 与 Agent。", "实现并解释一个最小可运行的 AI Web 应用。", [
    makeTask(12, "LLM API", "理解 Web 应用如何安全调用大模型。", ["Prompt / Message / Context", "Token / Temperature", "Structured Output", "API Key / 成本"], ["密钥不进入前端和仓库", "理解上下文与成本"]),
    makeTask(13, "Streaming + SSE", "实现可中断、可反馈状态的流式 AI 界面。", ["LLM → FastAPI → SSE → React", "Loading / Error / 中断", "Streaming UI"], ["内容可逐步显示", "能处理错误与中断"]),
    makeTask(14, "Tool Calling", "让模型通过受控工具获取真实数据或执行任务。", ["Tool Schema", "参数与返回值", "真实工具", "安全边界"], ["至少实现两个真实工具", "输入校验且权限明确"]),
    makeTask(15, "RAG", "完成文档切分、检索到回答的最小流程。", ["切分 / Embedding", "Vector Database", "Retrieval / Context"], ["最小 RAG 可运行", "能解释检索错误为何影响回答"]),
    makeTask(16, "Agent 基础", "先理解底层循环，再按需要学习框架。", ["Agent Loop / Workflow", "State / Context / Memory", "Tool / Human-in-the-loop", "基础 Evals / MCP / LangGraph"], ["能画出 Agent 工作流", "能用基础 Evals 验证效果"]),
  ]),
  makePart(7, "AI 全栈项目", "随着能力提升，逐步接管“你赢历险记”的对应模块。", "让项目从 AI 生成的工具成长为自己理解并参与核心开发的 AI 全栈项目。", [
    makeTask(17, "逐步接管「你赢历险记」", "按已掌握技术逐步阅读、修改并接管项目。", ["React 模块", "FastAPI 接口", "PostgreSQL 数据", "AI 导师 / RAG / Tool"], ["每个阶段完成一次真实修改", "达到可讲标准后再作为简历核心项目"], 3),
  ]),
  makePart(8, "工程化与上线", "让项目拥有真实地址、清晰文档和可信开发记录。", "核心项目可被招聘者运行、访问和理解。", [
    makeTask(18, "项目部署", "让前端、后端和数据库拥有真实可访问环境。", ["前端 / 后端 / PostgreSQL 部署", "环境变量 / HTTPS", "Docker 基础"], ["线上地址可访问", "敏感配置安全"]),
    makeTask(19, "GitHub 项目整理", "让项目背景、功能、架构和运行方式清晰可信。", ["README / 截图 / 技术栈", "架构 / 数据流", "本地运行 / Demo", "真实 Commit"], ["陌生人可按文档运行", "提交历史反映真实开发"]),
  ]),
  makePart(9, "面试准备", "在项目学习过程中同步整理，不一次性死背全部题目。", "能接受对基础、项目和 AI Coding 过程的连续追问。", [
    makeTask(20, "前端基础面试", "逐步整理开发与面试真正需要的前端基础。", ["HTML / CSS", "JavaScript / TypeScript", "React", "浏览器 / HTTP / Git"], ["能结合项目举例", "薄弱点可转成支线任务"]),
    makeTask(21, "项目面试", "能讲清架构、数据流、AI 模块、Bug 与个人决策。", ["技术选型 / 架构 / 数据库", "状态 / SSE / Tool / RAG / Agent", "Debug / AI Coding / 成本"], ["简历技术都能接受追问", "能说明个人贡献与 Debug 过程"]),
  ]),
  makePart(10, "简历与实习", "准备可投递材料，并在反馈循环中持续改进。", "最终 Boss：获得第一份开发实习 Offer。", [
    makeTask(22, "完成简历 V1", "面向前端、AI 前端、Web 全栈和 AI 应用岗位准备简历。", ["技术能力", "自主项目", "你赢历险记", "算法与教育背景"], ["每项技能都有证据", "项目描述真实可追问"], 3),
    makeTask(23, "真实投递", "尽早开始广州开发实习投递，用反馈驱动成长。", ["投递 → 笔试 / 面试", "记录问题 → 支线任务", "补知识 → 改简历 → 继续投递"], ["建立持续投递节奏", "不等待全部学完才开始"], 3),
  ]),
];

export const SIDE_QUESTS: SideQuest[] = [
  { id: "side-git", title: "Git 实战", description: "在真实项目中持续练习，不要求按顺序完成。", topics: ["分支与合并", "Commit 质量", "冲突处理"] },
  { id: "side-web", title: "HTTP 与浏览器", description: "遇到请求问题时结合 Network 面板补齐知识。", topics: ["HTTP", "浏览器", "前后端通信"] },
  { id: "side-cs", title: "计算机基础", description: "跟随学校课程和项目需要逐步积累。", topics: ["数据结构", "数据库", "计算机网络", "操作系统"] },
  { id: "side-reading", title: "项目阅读与接管", description: "阅读对应模块并完成真实修改。", topics: ["代码阅读", "数据流", "Debug", "模块接管"] },
  { id: "side-ai", title: "AI Coding", description: "练习理解、判断、修改、Debug、解释与验证。", topics: ["Review", "Debug", "验证", "安全边界"] },
];

export function partDone(doneIds: string[], part: Part) { return part.items.every((item) => doneIds.includes(item.id)); }
export function findItem(id: string) { for (const part of PLAN) { const item = part.items.find((entry) => entry.id === id); if (item) return { partTitle: part.title, itemTitle: item.title }; } }
