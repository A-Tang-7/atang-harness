---
name: self-improvement
description: "记录经验、错误和修正，实现持续改进。适用场景：(1) 命令或操作意外失败，(2) 用户纠正 AI助手（如“不是这样……”“其实……”），(3) 用户请求当前不存在的能力，(4) 外部 API 或工具失败，(5) AI助手发现自身知识过时或不正确，(6) 发现了可复用于重复任务的更优方法。大型任务前也应先回顾既有经验。"
metadata:
---

# 自我改进技能

将经验和错误记录到 Markdown 文件中，以支持持续改进。后续可由Agents把这些记录转化为修复动作，高价值经验可进一步晋升为项目记忆。

## 首次使用初始化

在写入任何日志前，确保当前 skill 目录（与 SKILL.md 同级）存在 `./.learnings/` 目录及其文件。若缺失则创建：

```bash
mkdir -p ./.learnings
[ -f ./.learnings/LEARNINGS.md ] || printf "# Learnings\n\nCorrections, insights, and knowledge gaps captured during development.\n\n**Categories**: correction | insight | knowledge_gap | best_practice\n\n---\n" > ./.learnings/LEARNINGS.md
[ -f ./.learnings/ERRORS.md ] || printf "# Errors\n\nCommand failures and integration errors.\n\n---\n" > ./.learnings/ERRORS.md
[ -f ./.learnings/FEATURE_REQUESTS.md ] || printf "# Feature Requests\n\nCapabilities requested by the user.\n\n---\n" > ./.learnings/FEATURE_REQUESTS.md
```

禁止覆盖已有文件。如果 `./.learnings/` 已初始化，上述操作应为 no-op。

除非用户明确要求该级别细节，否则不要记录密钥、令牌、私钥、环境变量，也不要粘贴完整源码/配置文件。优先写简短摘要或脱敏片段，而不是原始命令输出或完整对话转录。

## 快速参考

| 情况 | 动作 |
|-----------|--------|
| 命令/操作失败     | 记录到 `./.learnings/ERRORS.md` |
| 用户纠正你        | 记录到 `./.learnings/LEARNINGS.md`，分类 `correction` |
| 用户需要缺失功能  | 记录到 `./.learnings/FEATURE_REQUESTS.md` |
| API/外部工具失败  | 记录到 `./.learnings/ERRORS.md`，补充集成细节 |
| 知识过时          | 记录到 `./.learnings/LEARNINGS.md`，分类 `knowledge_gap` |
| 发现更优方法      | 记录到 `./.learnings/LEARNINGS.md`，分类 `best_practice` |
| 简化/加固重复模式 | 在 `./.learnings/LEARNINGS.md` 中记录/更新，带 `Source: simplify-and-harden` 和稳定 `Pattern-Key` |
| 与既有条目相似    | 用 `**See Also**` 关联，必要时提高优先级 |
| 可广泛复用的经验  | 晋升到 `AGENTS.md` |
| 工作流改进        | 晋升到 `AGENTS.md` |
| 工具使用坑点      | 晋升到 `AGENTS.md` |
| 行为模式经验      | 晋升到 `AGENTS.md` |

## 日志格式

### Learning 条目

追加到 `./.learnings/LEARNINGS.md`：

```markdown
## [LRN-YYYYMMDD-XXX] category

**Logged**: ISO-8601 timestamp
**Priority**: low | medium | high | critical
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### 摘要
一行说明本次学习到的内容（使用中文）

### 详情
完整上下文：发生了什么、哪里有问题、正确做法是什么（使用中文）

### 建议动作
给出可执行的具体修复或改进建议（使用中文）

### Metadata
- Source: conversation | error | user_feedback
- Related Files: path/to/file.ext
- Tags: tag1, tag2
- See Also: LRN-20250110-001 (if related to existing entry)
- Pattern-Key: simplify.dead_code | harden.input_validation (optional, for recurring-pattern tracking)
- Recurrence-Count: 1 (optional)
- First-Seen: 2025-01-15 (optional)
- Last-Seen: 2025-01-15 (optional)

---
```

### Error 条目

追加到 `./.learnings/ERRORS.md`：

```markdown
## [ERR-YYYYMMDD-XXX] skill_or_command_name

**Logged**: ISO-8601 timestamp
**Priority**: high
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### 摘要
简要描述失败内容（使用中文）

### 错误信息
实际报错信息或输出（使用中文）

### 上下文
- 执行的命令/操作（使用中文）
- 使用的输入或参数（使用中文）
- 若相关，补充环境信息（使用中文）
- 相关输出的摘要或脱敏片段（默认避免粘贴完整转录和含敏感信息的数据）（使用中文）

### 建议修复
若能识别，请说明可能的解决方案（使用中文）

### Metadata
- Reproducible: yes | no | unknown
- Related Files: path/to/file.ext
- See Also: ERR-20250110-001 (if recurring)

---
```

### Feature Request 条目

追加到 `./.learnings/FEATURE_REQUESTS.md`：

```markdown
## [FEAT-YYYYMMDD-XXX] capability_name

**Logged**: ISO-8601 timestamp
**Priority**: medium
**Status**: pending
**Area**: frontend | backend | infra | tests | docs | config

### 需求能力
用户想要实现的能力（使用中文）

### 用户上下文
他们为什么需要它，正在解决什么问题（使用中文）

### 复杂度评估
simple | medium | complex

### 建议实现
该能力可以如何实现，可能基于哪些现有能力扩展（使用中文）

### Metadata
- Frequency: first_time | recurring
- Related Features: existing_feature_name

---
```

## ID 生成规则

格式：`TYPE-YYYYMMDD-XXX`
- TYPE: `LRN`（learning）、`ERR`（error）、`FEAT`（feature）
- YYYYMMDD: 当前日期
- XXX: 顺序号或随机 3 字符（如 `001`、`A7B`）

示例：`LRN-20250115-001`、`ERR-20250115-A3F`、`FEAT-20250115-002`

## 条目关闭（Resolving Entries）

当问题被修复后，更新该条目：

1. 将 `**Status**: pending` 改为 `**Status**: resolved`
2. 在 Metadata 后新增解决块：

```markdown
### Resolution
- **Resolved**: 2025-01-16T09:00:00Z
- **Commit/PR**: abc123 or #42
- **Notes**: Brief description of what was done
```

其他状态值：
- `in_progress` - 正在处理中
- `wont_fix` - 决定不处理（在 Resolution notes 写明原因）
- `promoted` - 已晋升到 `AGENTS.md` 

## 晋升到项目记忆

当一条经验具备广泛适用性（而非一次性修复）时，应晋升为项目长期记忆。

### 何时晋升

- 经验适用于多个文件/功能
- 任何贡献者（人类或 AI）都应知晓
- 可避免重复犯错
- 涉及项目特有约定

### 晋升目标

| 目标 | 应写入内容 |
|--------|-------------------|
| `AGENTS.md` | 项目事实、通用约定、关键坑点 |
| `AGENTS.md` | 代理工作流、工具使用模式、自动化规则 |
| `AGENTS.md` | 行为准则、沟通风格、原则 |
| `AGENTS.md` | 工具能力、使用模式、集成坑点 |

### 如何晋升

1. **提炼** 为简洁规则或事实
2. **写入** 目标文件合适章节（必要时创建文件）
3. **更新** 原条目：
   - 将 `**Status**: pending` 改为 `**Status**: promoted`
   - 添加 `**Promoted**: AGENTS.md`

### 晋升示例

**Learning**（详细）：
> 项目使用 pnpm workspaces。尝试执行 `npm install` 失败。  
> 锁文件是 `pnpm-lock.yaml`，必须使用 `pnpm install`。

**写入 AGENTS.md**（精炼）：
```markdown
## 构建与依赖
- 包管理器：pnpm（不是 npm）- 请使用 `pnpm install`
```

**Learning**（详细）：
> 修改 API endpoint 后必须重新生成 TypeScript client。  
> 忘记这一步会导致运行期类型不匹配。

**写入 AGENTS.md**（可执行）：
```markdown
## API 变更后
1. 重新生成客户端：`pnpm run generate:api`
2. 检查类型错误：`pnpm tsc --noEmit`
```

## 重复模式识别

如果要记录的内容与已有条目相似：

1. **先搜索**：`grep -r "keyword" ./.learnings/`
2. **建立关联**：在 Metadata 增加 `**See Also**: ERR-20250110-001`
3. 若反复出现，**提高优先级**
4. **考虑系统性修复**：重复问题通常意味着：
   - 文档缺失（→ 晋升到 `AGENTS.md`）
   - 自动化缺失（→ 增补到 `AGENTS.md`）
   - 架构问题（→ 创建技术债工单）

## 简化与加固反馈流

### 吸收流程

1. 从任务总结读取 `simplify_and_harden.learning_loop.candidates`。
2. 对每个候选项，使用 `pattern_key` 作为稳定去重键。
3. 在 `./.learnings/LEARNINGS.md` 搜索该键：
   - `grep -n "Pattern-Key: <pattern_key>" ./.learnings/LEARNINGS.md`
4. 若已存在：
   - 增加 `Recurrence-Count`
   - 更新 `Last-Seen`
   - 用 `See Also` 关联相关条目/任务
5. 若不存在：
   - 创建新 `LRN-...` 条目
   - 设置 `Source: simplify-and-harden`
   - 设置 `Pattern-Key`、`Recurrence-Count: 1`、`First-Seen` / `Last-Seen`

### 晋升规则（系统提示反馈）

当以下条件全部满足时，将重复模式晋升到代理上下文/系统提示文件：

- `Recurrence-Count >= 3`
- 覆盖至少 2 个不同任务
- 出现在 30 天窗口内

可选晋升目标：
- `AGENTS.md`

晋升后的规则应写成简短的预防性规则（编码前/编码中该做什么），而非冗长事故复盘。

## 定期回顾

在自然断点回顾 `./.learnings/`：

### 何时回顾
- 开始新的大型任务前
- 完成功能后
- 在有历史经验的领域工作时
- 活跃开发阶段每周一次

### 快速状态检查
```bash
# 统计 pending 数量
grep -h "Status\*\*: pending" ./.learnings/*.md | wc -l

# 列出 pending 且高优先级项
grep -B5 "Priority\*\*: high" ./.learnings/*.md | grep "^## \["

# 按 area 查找经验
grep -l "Area\*\*: backend" ./.learnings/*.md
```

### 回顾动作
- 关闭已修复项
- 晋升可复用经验
- 关联相关条目
- 升级反复出现的问题

## 触发器（Detection Triggers）

当你观察到以下信号时应自动记录：

**Corrections**（→ `correction` 类型 learning）：
- "不，这样不对……"
- "实际上，应该是……"
- "你在这点上说错了……"
- "这个已经过时了……"

**Feature Requests**（→ feature request）：
- "你还能不能……"
- "我希望你可以……"
- "有没有办法可以……"
- "你为什么不能……"

**Knowledge Gaps**（→ `knowledge_gap` 类型 learning）：
- 用户提供了你未知的信息
- 你引用的文档已过时
- API 实际行为与你认知不一致

**Errors**（→ error 条目）：
- 命令返回非 0 退出码
- 抛出异常或堆栈
- 输出或行为异常
- 超时或连接失败

## 优先级指南

| Priority | 适用场景 |
|----------|-------------|
| `critical` | 阻塞核心功能、存在数据丢失风险或安全问题 |
| `high` | 影响显著、影响高频工作流、重复出现 |
| `medium` | 中等影响、存在替代方案 |
| `low` | 轻微不便、边缘场景、锦上添花 |

## Area 标签

用于按代码库区域筛选经验：

| Area | 范围 |
|------|-------|
| `frontend` | UI、组件、客户端代码 |
| `backend` | API、服务、服务端代码 |
| `infra` | CI/CD、部署、Docker、云资源 |
| `tests` | 测试文件、测试工具、覆盖率 |
| `docs` | 文档、注释、README |
| `config` | 配置文件、环境、设置 |

## 最佳实践

1. **立即记录** - 问题刚发生时上下文最完整
2. **具体描述** - 方便后续代理快速理解
3. **补充复现步骤** - 尤其是错误类条目
4. **关联相关文件** - 让修复更高效
5. **给出具体修复建议** - 不要只写“待排查”
6. **分类保持一致** - 便于过滤检索
7. **积极晋升** - 有价值就写入 `AGENTS.md`
8. **定期回顾** - 过期经验价值会下降

## 自动技能提取

当一条经验足够有价值并可复用时，可通过提供的辅助流程提取为技能。

### 技能提取判定标准

满足任一条件即可考虑提取：

| 标准 | 说明 |
|-----------|-------------|
| **Recurring** | 通过 `See Also` 关联到 2+ 类似问题 |
| **Verified** | 状态为 `resolved` 且修复已验证有效 |
| **Non-obvious** | 需要真实调试/调查才能发现 |
| **Broadly applicable** | 非项目私有，跨代码库可复用 |
| **User-flagged** | 用户明确说“把这个保存成技能” |

### 提取流程

1. **识别候选项**：经验满足提取条件
2. **运行辅助脚本**（或手工创建）：
   ```bash
   ./skills/self-improvement/scripts/extract-skill.sh skill-name --dry-run
   ./skills/self-improvement/scripts/extract-skill.sh skill-name
   ```
3. **定制 SKILL.md**：将经验内容填入模板
4. **更新原经验条目**：状态改为 `promoted_to_skill`，并添加 `Skill-Path`
5. **验证**：在新会话读取该技能，确认其无需上下文即可独立使用

### 手动提取

如果你更偏好手动创建：

1. 创建 `skills/<skill-name>/SKILL.md`
2. 使用 `assets/SKILL-TEMPLATE.md` 模板
3. 遵循 [Agent Skills 规范](https://agentskills.io/specification)：
   - YAML frontmatter 必须包含 `name` 和 `description`
   - name 必须与目录名一致
   - 技能目录下不要放 README.md

### 提取触发信号

出现以下信号时，应考虑把经验升级为技能：

**会话内信号：**
- "把这个保存成一个技能"
- "我总是反复遇到这个问题"
- "这个对其他项目也会有用"
- "记住这个模式"

**日志条目信号：**
- 多个 `See Also` 链接（重复问题）
- 高优先级且已 resolved
- 分类为 `best_practice` 且广泛适用
- 用户对方案给出正向反馈

### 技能质量闸门

提取前请确认：

- [ ] 方案已测试并可用
- [ ] 脱离原始上下文后描述仍清晰
- [ ] 代码示例自包含
- [ ] 无项目私有硬编码值
- [ ] 命名符合规范（小写、连字符）

```markdown
## 自我改进

在解决了非显而易见的问题后，可考虑将其记录到 `./.learnings/`：
1. 使用 self-improvement skill 中定义的格式
2. 用 See Also 关联相关条目
3. 将高价值经验晋升为技能

在对话中可提问：“我是否应该把这个记录为一条学习项？”
```

**Detection**: 会话结束时手动回顾
