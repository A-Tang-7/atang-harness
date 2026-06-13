---
name: format-obsidian
description: 格式化 Obsidian vault 中的 markdown 文件 — 添加 frontmatter、将内部链接转换为 wikilink 双链、从 GLOSSARY.md 术语表匹配标签。当用户要求格式化、标准化或批量处理 Obsidian 笔记时使用，或当用户提到添加 frontmatter、wikilink 双链、标签时触发。
---

# Obsidian Vault 格式化工具

批量将 vault 中的 markdown 文件格式化为 Obsidian 标准：添加 frontmatter 元数据、将内部链接转换为 wikilink 双链、匹配统一标签。

## 关联 Skill

本 skill 依赖以下两个 skill 提供 Obsidian 语法与操作规范。执行格式化操作前，应先加载对应 skill：

- **obsidian-markdown** — Obsidian 特有的 Markdown 语法规范，包括 wikilink 格式、frontmatter 属性、嵌入语法、callout、标签规则等。涉及双链转换、frontmatter 格式、嵌入语法时必须遵循此规范。
- **obsidian-cli** — Obsidian 命令行工具，用于格式化后验证标签、检查反向链接。格式化为 batch 操作时无需使用，但用户要求校验格式化结果时应调用。

## 触发条件

当用户提出以下请求时触发此 skill：
- 格式化 vault / 给笔记加 frontmatter / 批量处理笔记
- 转换链接为 wikilink / 添加双链
- 给笔记打标签 / 统一标签
- 标准化或清理 vault

不应触发的情况：创建单篇新笔记（使用 obsidian-markdown skill）、编辑笔记正文内容（常规编辑操作）。

## 执行流程

### 阶段 0：准备工作

1. **加载 GLOSSARY.md** — 读取 vault 根目录下的 `GLOSSARY.md`，提取「统一使用术语」列作为已批准的标签词汇表。表中不存在的即为新标签，后续必须同步回 GLOSSARY.md。
2. **确定目标文件** — 使用 Glob 查找所有 `.md` 文件。排除以下目录：
   - `.claude/` 及其子目录
   - `.trash/` 及其子目录
   - `GLOSSARY.md` 本身（标签单独管理）
   - 已明确作为模板使用的文件
   - 隐藏目录（`.` 开头的目录名）
3. **与用户确认范围** — 按顶级目录分组展示待处理文件数量，询问是处理全部文件还是指定子集。

### 阶段 1：逐文件处理

对每个目标 `.md` 文件依次执行以下步骤。所有修改必须使用 Edit 工具完成 — 禁止使用 Write 覆盖现有文件。

#### 1.1 检查 Frontmatter

若文件已有合法的 YAML frontmatter（首行以 `---` 开头），根据用户指示决定：
- **补全模式**（默认）：保留已有 frontmatter，仅填充缺失字段
- **覆写模式**：完全替换 frontmatter（用户必须明确要求）

若文件无 frontmatter，在文件最顶部插入。

#### 1.2 生成 Frontmatter 字段

Frontmatter 格式遵循 obsidian-markdown 规范中的 Properties（属性）定义：

```yaml
---
title: <笔记标题>
tags: []
created: YYYY-MM-DD
summary: <一句话摘要>
---
```

**title（标题）**：从文件中第一个 `# 标题` 提取。若不存在一级标题，则从文件名（不含扩展名）推导。若文件名含 `&` 符号，保留原样。

**tags（标签）**：按以下规则确定：
1. 阅读文件内容 — 靠近顶部（前 20 行）的关键词和章节标题权重最高
2. 与 GLOSSARY.md「统一使用术语」列逐一匹配
3. 每篇笔记最多分配 1-5 个标签，宁少勿滥
4. 若内容确实需要标签但现有术语表中无匹配项，可创建新标签。**记录所有新标签**供阶段 3 同步使用
5. 标签应为宽泛类别：文件夹级主题（如 `乒乓`、`求职`、`个人成长`）、内容类型（如 `课程笔记`、`书单`）或领域标签（如 `嵌入式`、`自媒体`）
6. 标签格式需符合 obsidian-markdown 规范：可包含字母、数字（不能首字符）、下划线、连字符和斜杠

**created（创建日期）**：按优先级确定：
1. 通过 git log 查询文件的首次提交日期
2. 文件系统的创建日期
3. 以上均不可用时，使用当天日期

使用命令获取首次提交日期：`git log --diff-filter=A --follow --format=%ai -- "path/to/file.md" | tail -1`，解析为 `YYYY-MM-DD` 格式。

**summary（摘要）**：用一句简洁的中文（15-30 字）概括笔记内容。阅读标题、第一个章节标题和开头段落来推断。

#### 1.3 转换内部链接为 Wikilink

链接格式严格遵循 obsidian-markdown 规范中的 Internal Links (Wikilinks) 定义。支持的 wikilink 格式：

```
[[笔记名]]                   链接到笔记
[[笔记名|显示文本]]            自定义显示文本
[[笔记名#标题]]               链接到指定标题
[[笔记名#^块ID]]              链接到指定段落
[[#同文件标题]]                同文件内标题链接
```

**转换映射：**

| 原格式 | 转换后 |
|--------|--------|
| `[文本](路径/文件.md)` | `[[文件\|文本]]` |
| `[文本](路径/文件.md#标题)` | `[[文件#标题\|文本]]` |
| `[文件](路径/文件.md)` (文本==文件名) | `[[文件]]` |
| `[文本](#标题)` (同页面锚点) | `[[#标题\|文本]]` |

**转换规则：**
- 仅转换指向 vault 内 `.md`、`.png`、`.jpg`、`.pdf` 文件的链接
- 外部 URL `[文本](https://...)` 保持原样（obsidian-markdown 规范：外部链接使用标准 Markdown 语法）
- 代码块内（``` 围栏内）的链接一律不转换
- 已是 wikilink 格式的 `[[链接]]` 不做修改

#### 1.4 写入修改

将 frontmatter 插入/更新和链接转换同时应用到同一文件。Edit 操作时确保 `old_string` 精确匹配。对大文件，先用 PowerShell 确认行数：`(Get-Content "文件.md").Count`。

### 阶段 2：更新 INDEX.md

处理完某目录下的文件后，若该目录存在 `INDEX.md`，确保：
1. 具备符合模板的 frontmatter
2. 以 wikilink 列出该目录下所有笔记（使用 `[[笔记名]]` 格式）
3. 按子目录或主题合理组织

若某目录无 INDEX.md 但包含 3 篇以上笔记，主动询问是否创建。

### 阶段 3：同步 GLOSSARY.md

将阶段 1 中产生的所有新标签添加到 GLOSSARY.md「统一使用术语」列。保持表格按合理分组、字母顺序排列。此步骤为强制要求（遵循 CLAUDE.md 规则）。

### 阶段 4：验证（可选，用户要求时执行）

若用户要求验证格式化结果，使用 obsidian-cli 进行校验：

```bash
# 检查标签是否正确识别
obsidian tags sort=count counts

# 检查某文件的反向链接是否正常
obsidian backlinks file="笔记名"

# 读取格式化后的文件确认内容完整
obsidian read file="笔记名"
```

### 阶段 5：汇总报告

输出处理汇总：
- 共处理文件数
- 新增 frontmatter vs 补全 frontmatter 的文件数
- 链接转换数量（Markdown 链接 → wikilink）
- 新建标签及已同步至 GLOSSARY.md 的清单
- 跳过的文件及原因

## 关键约束

- **禁止删除原有内容** — 只能添加或修改 frontmatter 和链接
- **禁止用 Write 覆盖现有文件** — 只能使用 Edit
- **wikilink 格式必须遵循 obsidian-markdown 规范** — 包括普通链接、标题锚点、块引用、嵌入等所有变体
- **vault 内部链接必须使用 Wikilink** `[[笔记名]]` — 标准 Markdown `[文本](路径.md)` 在 vault 内禁止使用
- **外部 URL 使用标准 Markdown** `[文本](url)` — 遵循 obsidian-markdown 规范
- **分配标签前必须先加载 GLOSSARY.md** — 完成后将新标签同步回去
- **使用中文回答**
- **编辑大文件前确认行数** — 使用 PowerShell `(Get-Content "文件.md").Count`

## 边界情况处理

- **callout 块内的链接**：`> [!note]` callout 内的链接仍需转换，callout 语法本身不动
- **锚点链接**：`[文本](#标题)`（同页面锚点）转为 `[[#标题|文本]]`
- **代码块内的链接**：``` 围栏内的链接一律不转换
- **已是 wikilink 的链接**：`[[已有链接]]` 不做任何修改
- **指向不存在文件的链接**：仍然转换为 wikilink，Obsidian 会将其显示为未解析链接
- **仅有 frontmatter 无正文的文件**：跳过（可能是模板或占位文件）
- **block ID 链接**：`[文本](文件.md#^block-id)` 转为 `[[文件#^block-id|文本]]`，`^` 符号是 Obsidian 块引用的标识，需保留

## 示例

**处理前：**
```markdown
# 我的笔记

这是一篇关于[职业规划](个人成长/职业规划.md)的笔记。
参考了[某本书](个人成长/书单推荐.md)的内容。
相关概念见[核心定义](个人成长/职业规划.md#核心定义)。

架构图如下：
![架构图](assets/架构图.png)
```

**处理后：**
```markdown
---
title: 我的笔记
tags: [职业规划, 个人成长]
created: 2026-03-15
summary: 关于职业规划的思考与学习笔记
---

# 我的笔记

这是一篇关于[[职业规划]]的笔记。
参考了[[书单推荐|某本书]]的内容。
相关概念见[[职业规划#核心定义|核心定义]]。

架构图如下：
![](assets/架构图.png)
```
