// ===== 学习计划数据 =====
// 这里是「6 环学习地图」的真实学习资料，链接优先选官方文档 / 公认的优质教程

export type Resource = { title: string; url: string; type: "文档" | "书籍" | "视频" };

export type LearningItem = {
  id: string;
  title: string; // 简洁概述
  resources: Resource[]; // 学这个需要看的资料
  miniProject?: string; // 学完后的待做小项目（边学边做）
};

export type Part = {
  id: string;
  title: string;
  summary: string;
  items: LearningItem[];
};

export const PLAN: Part[] = [
  {
    id: "p1",
    title: "① 语言地基",
    summary: "JS 进阶 + CSS + TypeScript，后面一切的地基",
    items: [
      {
        id: "p1-1",
        title: "学会 JS 异步：Promise / async / await / try-catch",
        resources: [
          { title: "阮一峰《ES6 入门》- Promise", url: "https://es6.ruanyifeng.com/#docs/promise", type: "文档" },
          { title: "MDN - Promise", url: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise", type: "文档" },
          { title: "MDN - async 函数", url: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function", type: "文档" },
        ],
        miniProject: "做一个「点按钮 → 显示加载中 → 2 秒后显示结果」的小页面",
      },
      {
        id: "p1-2",
        title: "ES6 常用语法：解构 / 箭头函数 / 模板字符串 / 展开运算符",
        resources: [
          { title: "阮一峰《ES6 入门》", url: "https://es6.ruanyifeng.com/", type: "文档" },
          { title: "MDN - 解构赋值", url: "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment", type: "文档" },
        ],
        miniProject: "把以前写过的老式 JS 代码，用解构 / 箭头函数 / 模板字符串重写一遍",
      },
      {
        id: "p1-3",
        title: "CSS 布局与响应式：flex / grid / 媒体查询",
        resources: [
          { title: "MDN - Flexbox 基础", url: "https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox", type: "文档" },
          { title: "MDN - Grid 网格", url: "https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids", type: "文档" },
        ],
        miniProject: "做一个响应式卡片列表：手机竖排 1 列，电脑横排 3 列",
      },
      {
        id: "p1-4",
        title: "TypeScript 入门：类型标注 / interface / 泛型",
        resources: [
          { title: "TypeScript 官方中文文档", url: "https://www.typescriptlang.org/zh/", type: "文档" },
          { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", type: "文档" },
        ],
        miniProject: "把你之前的一个 JS 小页面改写成 .tsx，跑通并消除所有类型报错",
      },
    ],
  },
  {
    id: "p2",
    title: "② React 框架",
    summary: "把语言变成能组织起来的界面",
    items: [
      {
        id: "p2-1",
        title: "组件与数据流：函数组件 / JSX / props / state",
        resources: [
          { title: "React 官方中文文档", url: "https://zh-hans.react.dev/", type: "文档" },
          { title: "React 快速入门", url: "https://zh-hans.react.dev/learn", type: "文档" },
        ],
        miniProject: "把当前这个网站拆成组件（侧边栏 / 卡片 / 列表），通过 props 传数据",
      },
      {
        id: "p2-2",
        title: "核心 Hooks：useState / useEffect / useContext",
        resources: [
          { title: "React 官方 - 内置 Hook", url: "https://zh-hans.react.dev/reference/react/hooks", type: "文档" },
          { title: "React 官方 - useState", url: "https://zh-hans.react.dev/reference/react/useState", type: "文档" },
        ],
        miniProject: "把你之前的「校园空间」demo 里再加一个功能（比如点赞按钮）",
      },
    ],
  },
  {
    id: "p3",
    title: "③ 工程化",
    summary: "学会自己从零搭项目、管版本",
    items: [
      {
        id: "p3-1",
        title: "从零初始化 Vite + React + TS 项目（不靠别人）",
        resources: [
          { title: "Vite 官方文档", url: "https://cn.vitejs.dev/guide/", type: "文档" },
        ],
        miniProject: "不看教程，从 npm create vite 搭一个新项目，成功跑起来",
      },
      {
        id: "p3-2",
        title: "Git 基础：clone / branch / add / commit / push / PR",
        resources: [
          { title: "Git 官方教程（Pro Git）", url: "https://git-scm.com/book/zh/v2", type: "文档" },
          { title: "GitHub 快速入门", url: "https://docs.github.com/zh/get-started", type: "文档" },
        ],
        miniProject: "把项目推到 GitHub，走一遍 commit → push 流程",
      },
    ],
  },
  {
    id: "p4",
    title: "④ 数据交互",
    summary: "让页面活起来，数据真的从服务器来",
    items: [
      {
        id: "p4-1",
        title: "HTTP 基础：请求/响应、方法、状态码",
        resources: [
          { title: "MDN - HTTP 概述", url: "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Overview", type: "文档" },
          { title: "MDN - HTTP 请求方法", url: "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods", type: "文档" },
        ],
        miniProject: "打开浏览器 DevTools 的 Network 面板，看一次完整请求的请求头 / 响应体",
      },
      {
        id: "p4-2",
        title: "axios 封装 + 拦截器 + token 处理",
        resources: [
          { title: "axios 官方文档", url: "https://axios-http.com/zh/docs/intro", type: "文档" },
          { title: "axios - 拦截器", url: "https://axios-http.com/docs/interceptors", type: "文档" },
        ],
        miniProject: "封装一个带拦截器的 axios 实例，自动在请求头加 token",
      },
      {
        id: "p4-3",
        title: "加载/空/错误三种状态处理",
        resources: [
          { title: "MDN - 使用 Fetch", url: "https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch", type: "文档" },
          { title: "axios - 错误处理", url: "https://axios-http.com/docs/handling_errors", type: "文档" },
        ],
        miniProject: "给一个页面接真实的公共 API，处理 loading / error / empty 三种状态",
      },
    ],
  },
  {
    id: "p5",
    title: "⑤ 接口对接 / 后端常识",
    summary: "能跟后端协作、联调",
    items: [
      {
        id: "p5-1",
        title: "RESTful API 概念 + 联调",
        resources: [
          { title: "MDN - 客户端服务器概述", url: "https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/First_steps/Client-Server_overview", type: "文档" },
          { title: "MDN - 使用 Fetch 获取数据", url: "https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data", type: "文档" },
        ],
        miniProject: "用公开 API（如 JSONPlaceholder）手动发几次 GET / POST 请求，观察返回",
      },
      {
        id: "p5-2",
        title: "token 认证流程（登录 → 存 token → 带 token 请求）",
        resources: [
          { title: "JWT 官方介绍", url: "https://jwt.io/introduction", type: "文档" },
          { title: "MDN - HTTP 认证", url: "https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication", type: "文档" },
        ],
        miniProject: "写一个登录页：登录成功存 token，之后请求自动带上，退出则清除",
      },
    ],
  },
  {
    id: "p6",
    title: "⑥ 部署上线",
    summary: "让项目别人能点开",
    items: [
      {
        id: "p6-1",
        title: "打包 + 部署到 Vercel / Netlify",
        resources: [
          { title: "Vercel 官方文档", url: "https://vercel.com/docs", type: "文档" },
          { title: "Netlify 官方文档", url: "https://docs.netlify.com/", type: "文档" },
        ],
        miniProject: "把你的项目部署上线，拿到一个公网链接",
      },
    ],
  },
];

// 判断某个 part 是否全部完成
export function partDone(doneIds: string[], part: Part): boolean {
  return part.items.every((it) => doneIds.includes(it.id));
}
