export type KnowledgeCheckpoint = { label: string; terms: string[] };
export type KnowledgeUnit = {
  id: string; itemId: string; title: string; summary: string; keywords: string[];
  confidence?: "较熟悉" | "待复习" | "基础薄弱";
  skillCard: { title: string; task: string };
  duck: { question: string; checkpoints: KnowledgeCheckpoint[] };
};

export const KNOWLEDGE: KnowledgeUnit[] = [
  { id:"async",itemId:"p1-1",title:"异步与错误处理",summary:"Promise、async/await 与可恢复的错误体验。",keywords:["Promise","async/await","try/catch"],skillCard:{title:"异步救援卡",task:"为一个请求补齐 loading、error 和 retry 三种状态。"},duck:{question:"Promise 和 async/await 是什么关系？",checkpoints:[{label:"Promise 表示异步结果",terms:["异步","结果","状态"]},{label:"async 函数返回 Promise",terms:["返回 Promise","返回一个 Promise","async"]},{label:"await 等待 Promise 结果",terms:["await","等待","暂停"]}]}},
  { id:"modern-js",itemId:"p1-2",title:"现代 JavaScript",summary:"用不可变数据转换组织业务逻辑。",keywords:["map","filter","reduce","不可变"],skillCard:{title:"数据炼金卡",task:"不用 for 循环，把一组订单筛选并汇总成统计结果。"},duck:{question:"为什么 React 代码里常强调不可变更新？",checkpoints:[{label:"保留原数据",terms:["原数据","不修改","不可变"]},{label:"创建新对象或数组",terms:["新对象","新数组","复制","展开"]},{label:"便于检测变化",terms:["检测","引用","更新","渲染"]}]}},
  { id:"css",itemId:"p1-3",title:"响应式布局",summary:"使用 Grid、Flex 和媒体查询适配不同屏幕。",keywords:["Grid","Flex","响应式","可访问性"],skillCard:{title:"布局变形卡",task:"让一个桌面双栏页面在 360px 下自然变成单栏。"},duck:{question:"响应式布局不只是缩小元素，为什么？",checkpoints:[{label:"布局需要重排",terms:["重排","单栏","布局"]},{label:"适配不同屏幕",terms:["屏幕","断点","媒体查询"]},{label:"保证内容可用",terms:["可读","可用","触摸","滚动"]}]}},
  { id:"typescript",itemId:"p1-4",title:"TypeScript 建模",summary:"用类型准确表达数据和界面状态。",keywords:["联合类型","interface","泛型"],skillCard:{title:"类型铠甲卡",task:"用联合类型表达 loading、success、empty 和 error 四种状态。"},duck:{question:"为什么联合类型比多个状态布尔值更可靠？",checkpoints:[{label:"状态彼此互斥",terms:["互斥","只能一个","唯一"]},{label:"避免非法组合",terms:["非法","冲突","组合"]},{label:"便于类型收窄",terms:["收窄","判断","TypeScript"]}]}},
  { id:"components",itemId:"p2-1",title:"组件与状态设计",summary:"组件边界、Props 和单向数据流。",keywords:["组件","Props","State","单向数据流"],skillCard:{title:"组件拆分卡",task:"找一个页面画出组件树，并说明每个组件为何存在。"},duck:{question:"Props 和 State 有什么不同？",checkpoints:[{label:"Props 来自父组件",terms:["父组件","外部","传入"]},{label:"Props 不应被子组件修改",terms:["只读","不能修改","不可修改"]},{label:"State 属于组件并可触发更新",terms:["内部","自身","更新","重新渲染"]}]}},
  { id:"hooks",itemId:"p2-2",title:"Hooks 与副作用",summary:"正确处理状态、表单和外部系统同步。",keywords:["useState","useEffect","表单"],skillCard:{title:"Effect 侦探卡",task:"检查一个 useEffect：它是否真的在同步外部系统？"},duck:{question:"useEffect 什么时候才真正需要？",checkpoints:[{label:"用于与外部系统同步",terms:["外部系统","同步","浏览器"]},{label:"能举出请求或订阅例子",terms:["请求","订阅","定时器","DOM"]},{label:"普通计算不需要 Effect",terms:["不需要","派生","计算","事件"]}]}},
  { id:"vite",itemId:"p3-1",title:"项目工程化",summary:"Vite、目录职责与环境配置。",keywords:["Vite","环境变量","构建"],skillCard:{title:"工程体检卡",task:"解释当前项目从入口文件到页面渲染的完整路径。"},duck:{question:"开发环境和生产构建有什么不同？",checkpoints:[{label:"开发环境重视反馈速度",terms:["热更新","开发","调试"]},{label:"生产构建会优化资源",terms:["压缩","优化","打包"]},{label:"配置和环境变量可能不同",terms:["环境变量","配置","production"]}]}},
  { id:"git",itemId:"p3-2",title:"Git 与测试",summary:"小提交、分支协作和可验证交付。",keywords:["Git","测试","README"],skillCard:{title:"Git 时光卡",task:"检查最近三个 commit，判断它们能否分别安全回滚。"},duck:{question:"为什么一个提交最好只表达一个意图？",checkpoints:[{label:"便于理解历史",terms:["历史","理解","清晰"]},{label:"便于审查",terms:["审查","review","diff"]},{label:"便于回滚",terms:["回滚","撤销","定位"]}]}},
  { id:"http",itemId:"p4-1",title:"HTTP 与调试",summary:"从 Network 面板理解并定位请求问题。",keywords:["HTTP","Fetch","Network"],skillCard:{title:"网络侦探卡",task:"打开 Network 面板，解释一次请求的状态码和耗时。"},duck:{question:"看到接口失败时，你会按什么顺序排查？",checkpoints:[{label:"先看请求是否正确",terms:["URL","参数","请求头","请求"]},{label:"再看状态码和响应",terms:["状态码","响应","response"]},{label:"区分前端与服务端问题",terms:["前端","后端","服务端","网络"]}]}},
  { id:"api",itemId:"p4-2",title:"请求层与鉴权",summary:"统一请求配置、错误和 token 处理。",keywords:["Axios","token","拦截器"],skillCard:{title:"接口封装卡",task:"找出项目中重复的请求配置，并设计一个统一入口。"},duck:{question:"为什么要把请求逻辑从页面组件里分离？",checkpoints:[{label:"减少重复",terms:["重复","复用","统一"]},{label:"集中处理错误与鉴权",terms:["错误","鉴权","token"]},{label:"组件专注展示",terms:["组件","UI","展示","职责"]}]}},
  { id:"async-ui",itemId:"p4-3",title:"异步 UI 状态",summary:"完整呈现加载、空、错和成功状态。",keywords:["loading","empty","error","success"],skillCard:{title:"四态补全卡",task:"找一个数据页面，确认 loading、empty、error、success 都有界面。"},duck:{question:"为什么不能只做成功状态和一个 loading？",checkpoints:[{label:"请求可能失败",terms:["失败","错误","error"]},{label:"成功也可能没有数据",terms:["空","没有数据","empty"]},{label:"用户需要可行动反馈",terms:["重试","反馈","操作","体验"]}]}},
  { id:"router",itemId:"p5-1",title:"路由与 CRUD",summary:"多页面导航和完整数据操作闭环。",keywords:["路由","CRUD","URL"],skillCard:{title:"路由巡逻卡",task:"刷新一个详情页，检查 URL 是否能独立恢复当前页面。"},duck:{question:"为什么页面状态有时应该放进 URL？",checkpoints:[{label:"URL 可以分享",terms:["分享","链接"]},{label:"刷新可以恢复",terms:["刷新","恢复"]},{label:"浏览器前进后退可用",terms:["前进","后退","历史"]}]}},
  { id:"auth",itemId:"p5-2",title:"认证与性能",summary:"登录恢复、权限边界与渲染优化。",keywords:["认证","权限","性能"],skillCard:{title:"权限守卫卡",task:"验证退出登录后，是否还能通过旧 URL 进入私有页面。"},duck:{question:"前端受保护路由为什么不能代替后端鉴权？",checkpoints:[{label:"前端代码不可信",terms:["不可信","绕过","客户端"]},{label:"接口仍需验证身份",terms:["接口","后端","验证","token"]},{label:"路由保护主要改善体验",terms:["体验","跳转","页面"]}]}},
  { id:"graduation",itemId:"p6-1",title:"独立项目交付",summary:"从需求、开发、测试到部署的完整能力。",keywords:["需求","测试","部署","复盘"],skillCard:{title:"毕业答辩卡",task:"用三分钟说明项目解决的问题、核心取舍和下一版计划。"},duck:{question:"什么证据能证明一个项目是你独立完成的？",checkpoints:[{label:"能解释核心代码",terms:["解释","核心代码","原理"]},{label:"能独立排错和修改",terms:["排错","修改","需求"]},{label:"有完整交付证据",terms:["部署","测试","仓库","上线"]}]}},
];

const profileUnit = (
  id: string,
  title: string,
  confidence: "较熟悉" | "待复习" | "基础薄弱",
  summary: string,
  keywords: string[],
  question: string,
  checkpoints: KnowledgeCheckpoint[],
): KnowledgeUnit => ({ id: `profile-${id}`, itemId: `profile-${id}`, title, confidence, summary, keywords, duck: { question, checkpoints }, skillCard: { title, task: summary } });

export const PROFILE_KNOWLEDGE: KnowledgeUnit[] = [
  profileUnit("semantic-html","HTML 语义化","较熟悉","用有含义的标签描述页面结构，让代码、浏览器和辅助工具都更容易理解。",["header","nav","main","section","article"],"为什么不应该所有结构都只用 div？",[{label:"语义标签描述内容角色",terms:["语义","含义","角色"]},{label:"结构更容易阅读维护",terms:["阅读","维护","结构"]},{label:"有利于可访问性或搜索",terms:["可访问","搜索","SEO","辅助"]}]),
  profileUnit("forms","HTML 表单","待复习","表单由输入控件、标签、按钮和校验规则共同组成。",["form","input","label","button"],"label 对表单输入框有什么作用？",[{label:"说明输入内容",terms:["说明","名称","含义"]},{label:"通过 for 与 id 关联",terms:["for","id","关联"]},{label:"改善点击和可访问性",terms:["点击","可访问","辅助"]}]),
  profileUnit("display","块级与行内元素","待复习","块级元素通常独占一行；行内元素跟随文字排列，宽高行为也不同。",["block","inline","inline-block"],"块级元素和行内元素最明显的区别是什么？",[{label:"块级通常独占一行",terms:["独占","一行","换行"]},{label:"行内随文字排列",terms:["行内","文字","同一行"]},{label:"宽高设置行为不同",terms:["宽高","尺寸","设置"]}]),
  profileUnit("accessibility","HTML 可访问性","基础薄弱","通过 alt、label、button 和合理结构，让键盘与辅助技术用户也能使用页面。",["alt","label","button","键盘"],"图片 alt 和表单 label 为什么重要？",[{label:"为内容提供文字说明",terms:["文字","说明","替代"]},{label:"帮助辅助技术理解",terms:["辅助","读屏","可访问"]},{label:"提升无法看到内容时的体验",terms:["无法显示","看不到","体验"]}]),
  profileUnit("box-model","CSS 盒模型","待复习","元素尺寸由 content、padding、border 和 margin 共同决定；border-box 会把内边距和边框算进声明宽高。",["content","padding","border","margin","border-box"],"box-sizing: border-box 到底改变了什么？",[{label:"声明宽高包含 padding",terms:["padding","内边距","包含"]},{label:"声明宽高包含 border",terms:["border","边框","包含"]},{label:"不会把边框设为零",terms:["不是","不会","为零"]}]),
  profileUnit("specificity","CSS 优先级","待复习","当多条规则命中同一元素时，来源、重要性、选择器优先级和书写顺序共同决定结果。",["选择器","优先级","覆盖","继承"],"为什么一个 CSS 样式可能没有生效？",[{label:"可能被更高优先级覆盖",terms:["优先级","覆盖"]},{label:"可能被后写规则覆盖",terms:["后面","顺序","后写"]},{label:"需要检查选择器是否命中",terms:["选择器","命中","元素"]}]),
  profileUnit("flex","Flex 布局","待复习","Flex 用主轴和交叉轴排列一维内容，常用 justify-content 和 align-items 控制对齐。",["display:flex","justify-content","align-items","gap"],"如何用 Flex 让内容水平和垂直居中？",[{label:"先启用 Flex",terms:["display","flex"]},{label:"主轴使用 justify-content",terms:["justify-content","水平"]},{label:"交叉轴使用 align-items",terms:["align-items","垂直"]}]),
  profileUnit("grid","Grid 布局","待复习","Grid 通过行和列组织二维布局，适合卡片墙和页面区域。",["grid","列","行","gap"],"Flex 和 Grid 分别更适合什么布局？",[{label:"Flex 偏一维排列",terms:["一维","一行","一列"]},{label:"Grid 偏二维行列",terms:["二维","行列","网格"]},{label:"按内容关系选择",terms:["选择","布局","关系"]}]),
  profileUnit("position","CSS 定位","基础薄弱","absolute 通常相对最近的已定位祖先定位；fixed 相对视口；sticky 会在阈值处吸附。",["relative","absolute","fixed","sticky"],"absolute 元素通常相对于谁定位？",[{label:"最近的已定位祖先",terms:["最近","祖先","父"]},{label:"祖先通常设置 relative",terms:["relative","定位"]},{label:"没有时可能相对初始容器",terms:["没有","初始","页面"]}]),
  profileUnit("responsive","响应式网页","基础薄弱","通过弹性尺寸、媒体查询和内容重排，让页面适配手机与桌面。",["media query","断点","移动端"],"屏幕小于 600px 时如何改变布局？",[{label:"使用媒体查询",terms:["媒体查询","media"]},{label:"设置宽度条件",terms:["600","max-width","宽度"]},{label:"在条件内重写布局",terms:["布局","单栏","重写"]}]),
  profileUnit("pseudo","伪类与伪元素","待复习","伪类描述状态，伪元素创建可样式化的虚拟部分。",[":hover",":focus","::before","::after"],"伪类和伪元素有什么区别？",[{label:"伪类表示元素状态",terms:["状态","hover","focus"]},{label:"伪元素表示虚拟部分",terms:["虚拟","部分","before"]},{label:"用途不同",terms:["交互","装饰","内容"]}]),
  profileUnit("motion","CSS 动效","待复习","transition 处理状态间过渡，transform 改变视觉形态，animation 定义多阶段动画。",["transition","transform","animation"],"transition 和 animation 的使用场景有什么不同？",[{label:"transition 依赖状态变化",terms:["状态","变化","过渡"]},{label:"animation 可定义关键帧",terms:["关键帧","keyframes","多阶段"]},{label:"transform 常用于位移缩放",terms:["位移","缩放","旋转"]}]),
  profileUnit("js-basics","JavaScript 变量与类型","基础薄弱","变量保存值；基本类型与对象有不同的复制和比较行为。",["let","const","string","number","object"],"let 和 const 的主要区别是什么？",[{label:"let 可以重新赋值",terms:["let","重新赋值","改变"]},{label:"const 不能重新赋值",terms:["const","不能","常量"]},{label:"const 对象内部仍可能修改",terms:["对象","数组","内部","属性"]}]),
  profileUnit("control-flow","条件、循环与函数","基础薄弱","通过分支、循环和函数把执行步骤组织成可复用逻辑。",["if","for","function","return"],"函数中的 return 有什么作用？",[{label:"结束当前函数",terms:["结束","函数"]},{label:"把结果返回给调用者",terms:["返回","结果","调用"]},{label:"返回后代码不再执行",terms:["后面","不执行","停止"]}]),
  profileUnit("arrays-objects","数组与对象","基础薄弱","数组适合有序集合，对象适合用键值描述一个事物。变量可能共享同一个对象引用。",["array","object","引用","push"],"为什么修改 b 也可能同时改变数组 a？",[{label:"二者保存同一引用",terms:["引用","同一个","地址"]},{label:"对象赋值不是深复制",terms:["不是复制","没有复制","赋值"]},{label:"push 修改原数组",terms:["push","原数组","修改"]}]),
  profileUnit("array-methods","数组方法","待复习","map 负责转换，filter 负责筛选，reduce 负责累计；它们通常返回新结果。",["map","filter","reduce","forEach"],"map、filter 和 forEach 分别用来做什么？",[{label:"map 转换并返回新数组",terms:["map","转换","新数组"]},{label:"filter 筛选元素",terms:["filter","筛选"]},{label:"forEach 逐项执行但不生成结果数组",terms:["forEach","执行","不返回"]}]),
  profileUnit("this","JavaScript this","基础薄弱","this 的值取决于函数如何被调用；箭头函数不会创建自己的 this。",["this","调用方式","箭头函数"],"JavaScript 中 this 为什么不能只看函数写在哪里？",[{label:"取决于调用方式",terms:["调用方式","怎么调用"]},{label:"普通函数 this 可变化",terms:["普通函数","变化"]},{label:"箭头函数继承外层 this",terms:["箭头函数","外层","继承"]}]),
  profileUnit("dom","DOM 与事件","基础薄弱","通过查询 DOM、监听事件和修改 textContent 等方式让网页产生交互。",["querySelector","addEventListener","textContent"],"点击按钮后如何修改页面文字？",[{label:"先查询目标元素",terms:["querySelector","获取","元素"]},{label:"监听点击事件",terms:["addEventListener","click","点击"]},{label:"修改 textContent",terms:["textContent","文字","内容"]}]),
  profileUnit("events","事件冒泡","待复习","事件通常从目标元素向祖先传播，事件委托利用这个机制统一处理子元素事件。",["冒泡","target","事件委托"],"事件冒泡和事件委托是什么关系？",[{label:"事件会向父级传播",terms:["父","向上","传播","冒泡"]},{label:"父元素可以统一监听",terms:["父元素","监听","统一"]},{label:"通过 target 判断来源",terms:["target","来源","目标"]}]),
  profileUnit("modules","JavaScript 模块化","基础薄弱","export 暴露模块成员，import 在其他文件中使用它们。",["import","export","模块"],"import/export 解决了什么问题？",[{label:"拆分代码职责",terms:["拆分","文件","职责"]},{label:"明确导入和导出",terms:["导入","导出","import","export"]},{label:"方便复用维护",terms:["复用","维护"]}]),
];

export function unlockedKnowledge(doneItems: string[]) {
  const unlocked = KNOWLEDGE.filter((unit) => doneItems.includes(unit.itemId));
  return [...PROFILE_KNOWLEDGE, ...unlocked.filter((unit) => !PROFILE_KNOWLEDGE.some((profile) => profile.title === unit.title))];
}
