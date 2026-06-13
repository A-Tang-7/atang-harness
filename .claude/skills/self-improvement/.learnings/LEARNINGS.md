# Learnings

Corrections, insights, and knowledge gaps captured during development.

**Categories**: correction | insight | knowledge_gap | best_practice

---

## [LRN-20260531-001] best_practice

**Logged**: 2026-05-31
**Priority**: high
**Status**: promoted
**Area**: config

### Summary
PowerShell 不支持 `&&` / `||` 作为命令分隔符，必须用分号 `;`

### Details
执行 `cd "path" && git status` 时报错：「标记"&&"不是此版本中的有效语句分隔符」。
PowerShell 中 `&&` 不是有效的语句分隔符（PowerShell 7+ 支持，但 Windows PowerShell 5.1 不支持）。
正确写法：`cd "path"; git status`
这个问题在本次会话中重复出现多次，属于习惯性错误（从 bash/sh 迁移过来的肌肉记忆）。

### Suggested Action
1. 所有在 PowerShell 终端执行的复合命令，一律用分号 `;` 分隔
2. 若需条件执行（前命令成功才执行后命令），PowerShell 5.1 用 `if ($?) { ... }`，或升级到 PowerShell 7+ 才支持 `&&`
3. 写命令前确认终端类型：Trae 默认是 PowerShell 5.1，不是 bash

### Metadata
- Source: user_feedback
- Related Files: N/A
- Tags: powershell, windows, terminal, command_separator, recurring
- Pattern-Key: powershell.no_and_and
- Recurrence-Count: 3+
- First-Seen: 2026-05-23
- Last-Seen: 2026-05-31

### Resolution
- **Promoted**: AGENTS.md §5（工具与环境）
- **Notes**: 已写入硬性规则，后续会话自动约束

---

## [LRN-20260523-001] correction

**Logged**: 2026-05-23
**Priority**: high
**Status**: pending
**Area**: config

### Summary
SearchReplace 工具传空 old_str 和 new_str 会误删文件内容

### Details
在读取随手记.md 时误用了 SearchReplace 工具（应该用 Read），且 old_str 和 new_str 都传了空字符串，结果匹配到内容并替换为空，相当于删除了文件中的那行文本。虽然立即用 Write 恢复了，但这是不该犯的操作失误。

### Suggested Action
- 读取文件始终用 Read 工具，不要用 SearchReplace
- SearchReplace 的 old_str 必须有明确且唯一匹配的内容
- 永远不要传空字符串作为 old_str 或 new_str

### Metadata
- Source: user_correction
- Related Files: d:\0.files\Obsidian Vault\杂项\随手记.md
- Tags: tool_misuse, SearchReplace, file_safety

---

## [LRN-20260529-001] correction

**Logged**: 2026-05-29
**Priority**: high
**Status**: pending
**Area**: tool

### Summary
PowerShell 管道传输 `git diff` 输出时出现 GBK/UTF-8 混码，导致无法直接阅读 diff 内容

### Details
在 `ai-agent` 仓库执行 `git diff AGENTS.md` 后，尝试用管道 `| Select-Object -First 100` 查看输出：
- 终端返回大量乱码（`鏀瑰姩` 等 GBK 编码的 UTF-8 字节被错误解码）
- 无法快速判断改动范围，被迫多次重试和确认
- 同时第一次 `git commit` 因多行字符串在 PowerShell 中的换行处理异常而失败（`git status` 仍显示未提交），需重新执行 `git add` + `git commit`
- 根因：
  1. PowerShell 默认代码页与 git 输出编码不一致（git 输出 UTF-8，终端按 GBK 解码）
  2. 多行提交信息 `"..."` 在 PowerShell 中的换行符处理与 bash 不同，导致 commit 命令解析异常

### Suggested Action
1. 在 PowerShell 中查看 git diff 时，优先用 `git diff --no-color > diff.txt` 落盘后用 `Read` 工具读取，避免管道编码问题
2. 或者设置 git 配置 `git config core.quotepath false` 和 `git config i18n.logOutputEncoding utf-8`，减少编码不一致
3. 多行提交信息在 PowerShell 中用单行的 `"第一行"` 或 Here-String `@"..."@` 格式，避免直接换行
4. 简单提交直接用 `"update: xxx"` 单行，复杂提交信息先写入文件再用 `git commit -F file`

### Metadata
- Source: user_correction
- Related Files: d:\0.files\ai-agent\AGENTS.md
- Tags: powershell, encoding, git, diff, commit, windows
- Pattern-Key: powershell.git_encoding
- Recurrence-Count: 1
- First-Seen: 2026-05-29
- Last-Seen: 2026-05-29

---

## [LRN-20260526-001] best_practice

**Logged**: 2026-05-26T12:00:00+08:00
**Priority**: high
**Status**: promoted
**Area**: config

### Summary
Windows NTFS 大小写不敏感：仅改大小写/风格的目录名不能一次 `Rename-Item`，且 `$src` 与 `$dst` 路径字符串不同也可能指向同一目录。

### Details
重命名 skill 目录 `TableTennis-Reviewer` → `tabletennis-reviewer` 时：
- 直接 `Rename-Item -NewName "tabletennis-reviewer"` 报「目标已存在」（系统视为同一路径）。
- 两步重命名若目录被 IDE 占用会失败。
- 脚本在 `Test-Path $dst` 后 `Remove-Item $dst` 时，因大小写不敏感会删掉**唯一**源目录（数据风险）。
- 用 `Write` 写到新路径字符串可落盘且内容正确，但资源管理器/IDE 可能仍显示旧目录名；需 Reload Window 或重新 `@` 路径。

### Suggested Action
1. 改名：先改到**完全不同**的中间名，再改目标名；或 `Copy-Item` 到新名后确认再删旧目录；Git 仓库用 `git mv` 两步。
2. **禁止**在 Win 上对「仅大小写不同」的 `$src`/`$dst` 做 `Remove-Item`。
3. 改内容前不要删「目标路径」；重命名后用 `Get-ChildItem -LiteralPath` 核对磁盘上的 `Name`。

### Metadata
- Source: conversation
- Related Files: d:\0.诺瓦_接收卡MCU_汤志琦\my ai\.cursor\skills\tabletennis-reviewer\SKILL.md
- Tags: windows, powershell, rename, ntfs, skills, cursor
- Pattern-Key: windows.rename_case_insensitive
- Recurrence-Count: 1
- First-Seen: 2026-05-26
- Last-Seen: 2026-05-26

### Resolution
- **Promoted**: AGENTS.md §5（Windows 目录重命名）
- **Notes**: 技能目录已用 `tabletennis-reviewer` 内容恢复；用户 IDE 可能仍缓存 `TableTennis-Reviewer` 显示名。

---

## [LRN-20260526-002] correction

**Logged**: 2026-05-26
**Priority**: high
**Status**: pending
**Area**: tool

### Summary
Read 工具截断大文件后，从 offset 续读可能只拿到极少行，误判为文件已结束

### Details
复盘 `2026乒乓成长记录.md`（839 行，约 20KB+）时：
- 第一次 Read 被截断在 20480 字符（line 839），提示 "File content truncated due to size limit"
- 接着 Read offset=839 limit=500，只返回 1 行（line 839 即对手表格最后一行）
- 错误断定文件结束于 3 月 20 日，实际最后记录是 5 月 22 日
- 根因：文件刚好在 line 839 处达到 20480 字截断边界；offset=839 读到的 1 行已是真正末尾，但前面 4~5 月内容（line 460-839）根本没被读到。忽略了截断警告 + 没验证读取结果是否完整

### Suggested Action
1. 收到 "File content truncated due to size limit" 时，必须把截断行号只当作「此位置前内容不完整」，不要当作文件结构边界
2. 断点续读时 offset 应退回到已知完整读取的行之前（如从 offset=400），确保重叠覆盖
3. 续读后核对：只拿到 <10 行是异常信号，需从更小 offset 重试
4. 大文件优先用 Grep 定位结构（如 `^## [0-9]月|^### 2026\.`) 确认文件全貌，再按需分段读取

### Metadata
- Source: user_correction
- Related Files: d:\0.files\Obsidian Vault\生活\乒乓\2026乒乓成长记录.md
- Tags: tool_misuse, Read, truncation, offset, large_file

---

## [LRN-20260528-001] correction

**Logged**: 2026-05-28
**Priority**: high
**Status**: pending
**Area**: date

### Summary
复盘时未先确认今日日期，凭记忆把第二场日期写成 05.26

### Details
用户告知今日打球复盘，第一场 05.26（李立杰 1h），第二场是当日刚打的（周传钦 2h + 李雯锋）。在写回时：
- 未主动确认当日日期
- 直接把第二场合并到 05.26 条目下，标题改为 `3h`
- 用户随后指出今日是 05.28
- 根因：心理上按"第一场"的日期延续了，没单独停下来想"今天几号"；tabletennis-reviewer 流程里虽提到了日期取默认今天，但没有强制在执行第 4 步收输入前先读日期

### Suggested Action
1. 写回前必须先用 PowerShell（`Get-Date -Format 'yyyy.MM.dd'`）或 WebSearch 确认当日日期，不能凭印象
2. tabletennis-reviewer 流程第 4 步收输入时，如果用户没给日期，应该主动用工具确认今日日期再继续
3. 跨场次追加时，日期不同的条目独立新建，不要合并到同一条

### Metadata
- Source: user_feedback
- Related Files: d:\0.files\Obsidian Vault\生活\乒乓\2026乒乓成长记录.md
- Tags: date_mistake, process_error, tabletennis-reviewer

---

## [LRN-20260602-001] correction

**Logged**: 2026-06-02
**Priority**: critical
**Status**: pending
**Area**: tool

### Summary
Read 工具 `limit` 参数截断 + Write 工具覆盖 = 大文件内容被永久删除

### Details
为 Obsidian Vault 笔记添加 frontmatter 时：
1. 读取 `盖洛普优势识别课程笔记.md` 使用 `limit: 200`，只读到前 200 行
2. 续读 `offset: 200, limit: 1000` 只返回 11 行，**误判为文件已结束**
3. 实际文件 722 行，后续还有 `# 影响力`、`# 关系建立` 等大量内容
4. 使用 Write 工具写入时，只包含约 211 行，后半部分 511 行被永久删除
5. 同样操作发生在 `夏鹏-职业规划12讲&跳槽求职12讲-课程笔记.md`，但该文件原始即约 207 行，未造成实质丢失

### Root Cause
1. **没有确认文件总行数**：未用 PowerShell `(Get-Content).Count` 或 Grep 确认文件规模
2. **Read 返回异常未警觉**：offset=200 只返回 11 行是严重异常，应重试或换工具
3. **Write 覆盖风险**：编辑现有文件应优先用 SearchReplace，而非 Write
4. **缺少"读取完整性"自检**：写入前未问自己"是否已读完整文件"

### Suggested Action
1. **编辑现有文件优先用 SearchReplace**，禁止用 Write 覆盖未确认完整的文件
2. **读取大文件前必须先确认总行数**：`(Get-Content "file.md").Count`
3. **Read 返回行数异常时必须停止**：offset=200 返回 <50 行应立即从 offset=100 重试
4. **写入前强制自检**："我是否读取了完整文件？"
5. **大文件策略**：
   - 先用 Grep 搜索文件末尾特征确认全貌
   - 或用 PowerShell 确认总行数后分段读取
   - 或用 SearchReplace 局部修改，避免全文件重写

### Metadata
- Source: user_correction
- Related Files: 
  - `d:\0.files\Obsidian Vault\个人成长\盖洛普优势识别课程笔记.md`
  - `d:\0.files\Obsidian Vault\个人成长\夏鹏-职业规划12讲&跳槽求职12讲-课程笔记.md`
- Tags: tool_misuse, Read, Write, truncation, data_loss, file_safety, critical
- Pattern-Key: file.read_incomplete_write_full
- Recurrence-Count: 1
- First-Seen: 2026-06-02
- Last-Seen: 2026-06-02

### Resolution
- **Status**: 用户已手动恢复盖洛普笔记（722 行完整版）
- **Promote Target**: AGENTS.md §6（工具与环境）、CLAUDE.md（双向链接规范新增文件安全章节）

---
