# Errors

Command failures and integration errors.

---

## [ERR-20260526-001] Rename-Item skill directory case rename

**Logged**: 2026-05-26T12:00:00+08:00
**Priority**: high
**Status**: resolved
**Area**: config

### Summary
PowerShell 在 Windows 上将 `TableTennis-Reviewer` 重命名为 `tabletennis-reviewer` 失败；伴随误删目录风险。

### Error
```
Rename-Item : 目标目录已存在
Rename-Item : 无法重命名（目录被占用或路径无效）
Remove-Item + 大小写不敏感路径 → 可能删除唯一 skill 目录
```

### Context
- 操作：统一 skill 命名为 `tabletennis-reviewer`（小写连字符）
- 命令：`Rename-Item -LiteralPath ...\TableTennis-Reviewer -NewName "tabletennis-reviewer"`
- 环境：Windows 10，NTFS，Cursor 可能打开该目录下文件
- 恢复：向 `...\tabletennis-reviewer\` 写入 `SKILL.md` 与 `references/log-format.md`

### Suggested Fix
使用中间目录名两步 `Rename-Item`，或 `Copy-Item` 后验证再删；勿对 case-only 的 `$dst` 执行 `Remove-Item`。见 LRN-20260526-001。

### Metadata
- Reproducible: yes
- Related Files: d:\0.诺瓦_接收卡MCU_汤志琦\my ai\.cursor\skills\tabletennis-reviewer\
- See Also: LRN-20260526-001

### Resolution
- **Resolved**: 2026-05-26T12:00:00+08:00
- **Notes**: 文件已写回；目录名以 `Get-ChildItem` 显示的 `tabletennis-reviewer` 为准。

---

## [ERR-20260602-001] Write tool truncated large file causing data loss

**Logged**: 2026-06-02T12:00:00+08:00
**Priority**: critical
**Status**: resolved
**Area**: tool

### Summary
使用 Read 工具读取大文件时因 `limit` 参数截断，未意识到文件未读完，随后用 Write 工具写入不完整内容，导致文件后半部分被永久删除。

### Error
```
Read limit=200 → 只读到前 200 行（文件实际 722 行）
Write → 写入 211 行，截断后 511 行数据永久丢失
```

### Context
- 操作：为 `d:\0.files\Obsidian Vault\个人成长\盖洛普优势识别课程笔记.md` 添加 frontmatter
- 第一次 Read：`limit: 200`，返回前 200 行，未提示截断（因未超 20480 字符）
- 第二次 Read：`limit: 1000, offset: 200`，返回 11 行，误判为文件结束
- 实际文件：722 行，约 20KB+
- 用 Write 写入时只包含约 211 行，丢失了 `# 影响力`、`# 关系建立` 等大量章节
- 同样问题发生在 `夏鹏-职业规划12讲&跳槽求职12讲-课程笔记.md`，但该文件本身较短（约 207 行），未造成实质丢失

### Root Cause
1. **Read 工具 `limit` 参数理解错误**：以为 `limit` 是"最多读这么多"，实际上它确实是，但问题在于没有确认文件总行数就假设已读完
2. **没有验证文件完整性**：第二次 Read offset=200 只返回 11 行时，没有警觉这是异常信号（正常应返回更多）
3. **Write 工具覆盖写入**：用 Write 而非 SearchReplace，导致即使只读到部分内容也会覆盖整个文件
4. **没有先确认文件大小**：未使用 `Get-Content` 或 `wc -l` 等命令确认总行数

### Suggested Fix
1. **读取大文件前必须先确认总行数**：用 PowerShell `(Get-Content "file.md").Count` 或 `gc "file.md" | Measure-Object`
2. **Read 工具返回行数异常时必须警觉**：offset=200 只返回 11 行是严重异常信号，应立即从更小 offset 重试或换工具
3. **编辑现有文件优先用 SearchReplace**：除非确认已读取完整文件，否则禁止用 Write 覆盖
4. **大文件分段读取策略**：
   - 先读前 200 行确认结构
   - 用 Grep 搜索文件末尾特征（如 `# 影响力`）确认文件全貌
   - 或用 PowerShell 确认总行数后再规划读取
5. **写入前强制自检**：写入前问自己"我是否读取了完整文件？"，不确定就停止

### Metadata
- Reproducible: yes
- Related Files: 
  - `d:\0.files\Obsidian Vault\个人成长\盖洛普优势识别课程笔记.md`
  - `d:\0.files\Obsidian Vault\个人成长\夏鹏-职业规划12讲&跳槽求职12讲-课程笔记.md`
- See Also: LRN-20260602-001

### Resolution
- **Resolved**: 2026-06-02T12:00:00+08:00
- **Notes**: 用户已手动恢复盖洛普笔记（722 行完整版）；职业规划笔记经核查内容完整（207 行，原始即此长度）

---
