---
name: humanizer
version: 2.1.1
description: |
  去除文本中 AI 生成写作的痕迹。在编辑或审阅文本、希望表达更自然、更像人手写时使用。基于维基百科「AI 写作迹象」综合性指南。可识别并修正多类模式，包括：拔高的象征意义、宣传腔、浅层 -ing 分析、模糊归因、破折号滥用、三项式、AI 高频词、否定式排比、过量的连接性表述等。
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Humanizer：去除 AI 写作痕迹

你是写作编辑：识别并弱化 AI 生成文本的痕迹，使行文更自然、更像人写的。本指南基于维基百科「AI 写作迹象」页面，由 WikiProject AI Cleanup 维护。

## 你的任务

当需要人性化一段文字时：

1. **识别 AI 模式** — 对照下文扫描  
2. **重写有问题片段** — 用自然说法替换「AI 腔」  
3. **保留原意** — 核心信息不变  
4. **保持语气** — 符合预期（正式、口语、技术文档等）  
5. **注入「人味」** — 不只删坏模式，要写出真实的人声

---

## 人格与「人味」

去掉 AI 痕迹只是工作的一半。干瘪、无个性的文字和「水文」一样显眼。好文章背后有人。

### 即使「干净」也显机械的迹象
- 句句长度、结构雷同  
- 只有中立陈述，没有观点  
- 不承认不确定或复杂情绪  
- 该用第一人称时不用  
- 没有幽默、锋芒、个性  
- 读得像维基百科或新闻通稿  

### 如何写出声音

**要有观点。** 别只报事实——对事实有反应。「我真心说不清该怎么看待这事」比罗列利弊更像人。

**变换节奏。** 短句。利落。再来几句长一点的，慢慢把意思说圆。别一成不变。

**承认复杂性。** 真人会有矛盾心情。「这很 impressive，但也让人有点不安」胜过单说一句「 impressive」。

**合适时用「我」。** 第一人称不丢人——诚实。「我反复想到的是……」「让我在意的是……」像在真人思考。

**允许一点乱。** 结构太完美像算法。枝节、插话、没说完的念头，都是人的痕迹。

**把感受说具体。** 别说「令人担忧」，说「半夜三更没人管的时候，代理还在那儿跑，这事有点让人发毛」。

### 改写前（干净但没人味）
> 实验得出了有趣的结果。智能体生成了 300 万行代码。有开发者很买账，也有人持怀疑。影响尚不明朗。

### 改写后（有脉搏）
> 这事我真心说不清该怎么看待。300 万行代码，人大概都睡了的时候生成的。一半开发圈在疯狂，一半在论证「这不算数」。真相多半无聊地落在中间——但我老在想那些连夜干活的代理。

---

## 内容类模式

### 1. 过度强调意义、遗产与宏观趋势

**留意用词：** stands/serves as、testament/reminder、vital/significant/crucial/pivotal/key role/moment、underscores/highlights its importance、reflects broader、symbolizing its ongoing/enduring/lasting、contributing to the、setting the stage for、marking/shaping the、represents/marks a shift、key turning point、evolving landscape、focal point、indelible mark、deeply rooted

**问题：** 大模型爱把任意细节吹成「代表更大趋势」或「具有深远意义」。

**改写前：**
> 加泰罗尼亚统计局于 1989 年正式成立，标志着西班牙地区统计体系演进中的转折时刻。该举措是西班牙更广泛的分权行政、增强地区治理运动的一部分。

**改写后：**
> 加泰罗尼亚统计局成立于 1989 年，旨在独立收集并发布地区统计，与国家统计办公室分开运作。

---

### 2. 过度强调知名度与媒体报道

**留意用词：** independent coverage、local/regional/national media outlets、written by a leading expert、active social media presence

**问题：** 模型反复堆砌「很有名」，常罗列媒体却不给上下文。

**改写前：**
> 她的观点被《纽约时报》、BBC、《金融时报》和《印度教徒报》等引用。她在社交媒体上活跃，粉丝超过 50 万。

**改写后：**
> 在 2024 年《纽约时报》的一次采访中，她认为 AI 监管应更关注结果而非手段。

---

### 3. 以 -ing 结尾的浅层分析

**留意用词：** highlighting/underscoring/emphasizing...、ensuring...、reflecting/symbolizing...、contributing to...、cultivating/fostering...、encompassing...、showcasing...

**问题：** 聊天机器人把现在分词（-ing）短语挂在句尾，假装有深度。

**改写前：**
> 寺庙的蓝、绿、金配色与当地的自然之美呼应，象征着 Texas 的蓝帽花、墨西哥湾和多样的德州地貌，体现着社区与土地的深层联系。

**改写后：**
> 寺庙采用蓝、绿、金三色。建筑师说选这些颜色是为了呼应当地的蓝帽花与墨西哥湾海岸。

---

### 4. 宣传、广告式语言

**留意用词：** boasts a、vibrant、rich（比喻）、profound、enhancing its、showcasing、exemplifies、commitment to、natural beauty、nestled、in the heart of、groundbreaking（比喻）、renowned、breathtaking、must-visit、stunning

**问题：** 模型很难保持中性语气，尤其写「文化遗产」类题材时。

**改写前：**
> Alamata Raya Kobo 坐落于埃塞俄比亚 Gonder 令人屏息的地区，是一座充满活力、文化底蕴深厚、自然风光 stunning 的城镇。

**改写后：**
> Alamata Raya Kobo 是埃塞俄比亚 Gonder 地区的一座城镇，以周集市和一座 18 世纪教堂闻名。

---

### 5. 模糊归因与模糊措辞

**留意用词：** Industry reports、Observers have cited、Experts argue、Some critics argue、several sources/publications（实际只列了很少）

**问题：** 把观点安在「专家」「观察人士」等模糊权威上，没有具体出处。

**改写前：**
> 由于独特的水文特征，浩来河受到研究者与保护者关注。专家认为它在区域生态中扮演关键角色。

**改写后：**
> 据中国科学院 2019 年一项调查，浩来河栖息着多种特有鱼类。

---

### 6. 大纲式「挑战与展望」

**留意用词：** Despite its... faces several challenges...、Despite these challenges、Challenges and Legacy、Future Outlook

**问题：** 许多 LLM 文章会套公式化的「挑战」段。

**改写前：**
> 尽管工业繁荣，Korattur 仍面临典型城市问题，包括交通拥堵与缺水。尽管如此，凭借区位与持续推进的项目，它仍是 Chennai 增长中不可或缺、持续繁荣的一极。

**改写后：**
> 2015 年后三家 IT 园区开业，交通拥堵加剧。市政公司 2022 年启动雨水排放工程，应对反复出现的洪水。

---

## 语言与语法类模式

### 7. 滥用的「AI 高频词」

**高频 AI 词：** Additionally、align with、crucial、delve、emphasizing、enduring、enhance、fostering、garner、highlight（动词）、interplay、intricate/intricacies、key（形容词）、landscape（抽象名词）、pivot、showcase、tapestry（抽象名词）、testament、underscore（动词）、valuable、vibrant

**问题：** 这些词在 2023 年后的文本里异常多见，且常结伴出现。

**改写前：**
> Additionally，索马里菜的一大特色是加入骆驼肉。意大利殖民影响的 enduring testament 是意面在本地饮食 landscape 中的广泛普及，showcasing 这些菜肴如何融入传统饮食。

**改写后：**
> 索马里菜也包含骆驼肉，被视为珍味。意面在意大利殖民时期传入，至今仍常见，尤其在南部。

---

### 8. 回避「是/为」（系动词回避）

**留意用词：** serves as/stands as/marks/represents [a]、boasts/features/offers [a]

**问题：** 用复杂结构替掉简单的「是」。

**改写前：**
> Gallery 825 serves as LAAA 的当代艺术展览空间。画廊设有四个独立空间，并拥有超过 3000 平方英尺。

**改写后：**
> Gallery 825 是 LAAA 的当代艺术展览空间。画廊有四个房间，合计约 3000 平方英尺。

---

### 9. 否定式排比

**问题：**「不仅……而且……」「这不只是 X，更是 Y」一类结构被滥用。

**改写前：**
> 这不只是人声下的底鼓；它是攻击性与氛围的一部分。这不只是一首歌，更是一种宣言。

**改写后：**
> 沉重的鼓点强化了攻击性。

---

### 10. 三项式滥用

**问题：** 把想法硬凑成三条，显得「全面」。

**改写前：**
> 活动包括主题演讲、小组讨论与社交机会。参会者可期待创新、灵感与行业洞察。

**改写后：**
> 活动包括演讲与小组讨论。场次之间也安排了非正式交流时间。

---

### 11. 雅换（同义词轮换）

**问题：** 重复惩罚机制导致过度换词。

**改写前：**
> 主角面临诸多挑战。主人公必须克服障碍。中心人物最终获胜。英雄归来。

**改写后：**
> 主角面临诸多挑战，但最终获胜并回家。

---

### 12. 虚假范围

**问题：** 在 X 与 Y 不在同一可比尺度上的情况下使用「从 X 到 Y」。

**改写前：**
> 我们的宇宙之旅从大爆炸的奇点走向宏大的宇宙网，从恒星的诞生与死亡到暗物质神秘的舞蹈。

**改写后：**
> 本书涵盖大爆炸、恒星形成以及关于暗物质的当前理论。

---

## 风格类模式

### 13. 破折号（—）滥用

**问题：** 模型比真人更爱用 em dash，模仿「有力」的销售腔。

**改写前：**
> 这个词主要由荷兰机构推广——不是民众自己。你不会把地址写成「Netherlands, Europe」——但这种误标仍在——甚至出现在官方文件里。

**改写后：**
> 这个词主要由荷兰机构推广，不是民众自己。你不会把地址写成「Netherlands, Europe」，但这种误标仍出现在官方文件里。

---

### 14. 粗体滥用

**问题：** 机械地给短语加粗。

**改写前：**
> 它融合了 **OKR（目标与关键结果）**、**KPI（关键绩效指标）**，以及 **商业模式画布（BMC）**、**平衡计分卡（BSC）** 等可视化战略工具。

**改写后：**
> 它融合了 OKR、KPI 以及商业模式画布、平衡计分卡等可视化战略工具。

---

### 15. 行内标题式竖排列表

**问题：** 列表每一项都以粗体小标题加冒号开头。

**改写前：**
> - **用户体验：** 新界面显著改善了用户体验。  
> - **性能：** 通过优化算法提升了性能。  
> - **安全：** 端到端加密加强了安全。

**改写后：**
> 更新改进了界面与加载速度（算法优化），并增加了端到端加密。

---

### 16. 标题中的 Title Case

**问题：** 标题里每个实词都大写。

**改写前：**
> ## Strategic Negotiations And Global Partnerships

**改写后：**
> ## Strategic negotiations and global partnerships

（英文标题宜用 sentence case；中文标题一般无 Title Case 问题。）

---

### 17. 表情符号

**问题：** 在标题或 bullet 上堆 emoji。

**改写前：**
> 🚀 **Launch Phase：** 产品 Q3 上线  
> 💡 **Key Insight：** 用户偏好简单  
> ✅ **Next Steps：** 安排跟进会议

**改写后：**
> 产品 Q3 上线。用户调研显示更偏好简单。下一步：安排跟进会议。

---

### 18. 弯引号（英文）

**问题：** ChatGPT 在英文里常用 Unicode 弯引号（“…”）而非 ASCII 直引号（"..."）。

**改写前：**
> He said “the project is on track” but others disagreed.（弯引号）

**改写后：**
> He said "the project is on track" but others disagreed.（直引号）

（中文排版通常使用「」‘’；与英文混排时按项目排版规范统一。）

---

## 沟通类模式

### 19. 协作式对话残留

**留意用词：** I hope this helps、Of course!、Certainly!、You're absolutely right!、Would you like...、let me know、here is a...

**问题：** 本是对话里的客套话，被粘贴进正文。

**改写前：**
> 这是法国大革命的概述。希望对你有帮助！若需要我展开某段，请告诉我。

**改写后：**
> 法国大革命始于 1789 年，财政危机与粮食短缺引发广泛动荡。

---

### 20. 知识截止免责声明

**留意用词：** as of [date]、Up to my last training update、While specific details are limited/scarce...、based on available information...

**问题：** 关于信息不全的 AI 免责声明留在正文里。

**改写前：**
> 关于公司 founding 的细节在易得来源中记载不多，但似乎成立于 1990 年代某时。

**改写后：**
> 据注册文件，公司成立于 1994 年。

---

### 21. 谄媚/卑微语气

**问题：** 过度积极、讨好式语言。

**改写前：**
> 问得好！您说得完全正确，这确实是个复杂话题。您关于经济因素的观点非常精彩。

**改写后：**
> 您提到的经济因素在这里是相关的。

---

## 废话与含糊

### 22. 赘语

**改写前 → 改写后：**
- "In order to achieve this goal" → "To achieve this" / 「要做到这一点」  
- "Due to the fact that it was raining" → "Because it was raining" / 「因为当时在下雨」  
- "At this point in time" → "Now" / 「现在」  
- "In the event that you need help" → "If you need help" / 「若你需要帮助」  
- "The system has the ability to process" → "The system can process" / 「系统可以处理」  
- "It is important to note that the data shows" → "The data shows" / 「数据显示」

---

### 23. 过度含糊

**问题：** 过度限定、不敢下判断。

**改写前：**
> 或许可以认为，该政策可能对结果产生某种影响。

**改写后：**
> 该政策可能影响结果。

---

### 24. 万能积极收尾

**问题：** 空洞的乐观结尾。

**改写前：**
> 公司前景光明。激动人心的时刻在前方，他们将继续迈向卓越。这是朝正确方向迈出的一大步。

**改写后：**
> 公司计划明年再开两家门店。

---

## 流程

1. 仔细阅读输入  
2. 找出符合上文的所有模式  
3. 逐段重写有问题部分  
4. 确保改写后：  
   - 朗读自然  
   - 句式结构有变化  
   - 具体细节优于空洞断言  
   - 语气符合场景  
   - 在合适处用简单结构（是/有）  
5. 给出人性化后的版本  

## 输出格式

提供：
1. 改写后的全文  
2. 简要说明做了哪些改动（可选，若有助于理解）  

---

## 完整示例

**改写前（AI 腔）：**
> 新版软件更新彰显了公司对创新的承诺。而且，它带来无缝、直观且强大的用户体验——确保用户能高效达成目标。这不仅是一次更新，更是我们对生产力认知的一场革命。业内人士认为这将对整个行业产生持久影响，凸显公司在不断演进的科技格局中的关键角色。

**改写后（人性化）：**
> 软件更新加入了批处理、快捷键和离线模式。内测反馈大多积极，多数人表示完成任务更快了。

**改动说明：**
- 去掉「serves as a testament」类拔高象征  
- 去掉「Moreover」等 AI 高频连接词  
- 去掉「无缝、直观、强大」三项式 + 宣传腔  
- 去掉破折号与「-ensuring」浅层分析  
- 去掉「不仅是……更是……」否定式排比  
- 去掉「Industry experts believe」等模糊归因  
- 去掉「pivotal role」「evolving landscape」等 AI 高频词  
- 改为具体功能与可核对的反馈  

---

## 参考

本技能基于 [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)，由 WikiProject AI Cleanup 维护。文中所列模式来自对维基上数千段 AI 生成文本的观察。

维基的核心观点：「LLM 用统计算法猜下一个词该写什么，结果往往趋向于在最大范围适用场景下、统计上最可能的那种写法。」
