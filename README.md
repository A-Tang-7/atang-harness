# atang-harness

个人 Claude Code 配置仓库 —— 跨项目共享的全局规则、编程规范、知识库规则以及经过验证的 Skills 集合。

## 目录结构

```
atang-harness/
├── .claude/
│   └── skills/                # 经个人使用、验证过的 Skills
│       ├── agents/            # 自定义 Agent 定义
│       ├── caveman/           # 原始人风格解释器
│       ├── commands/          # 自定义斜杠命令
│       ├── defuddle/          # 文本/代码优化润色
│       ├── elon-musk-perspective/  # 马斯克视角思考分析
│       ├── format-obsidian/   # Obsidian 笔记格式化
│       ├── humanizer/         # AI 文本人性化
│       ├── json-canvas/       # JSON Canvas 处理
│       ├── obsidian-bases/    # Obsidian Bases 数据库操作
│       ├── obsidian-cli/      # Obsidian 命令行工具
│       ├── obsidian-markdown/ # Obsidian Markdown 语法支持
│       ├── pua/               # PUA 方法论分析
│       ├── self-improvement/  # 自我改进与学习
│       ├── skill-creator/     # Skill 创建工具
│       ├── superpowers/       # 超级能力合集（规划/执行/验证/并行）
│       └── tabletennis-reviewer/  # 乒乓球训练回顾
├── Global/
│   └── CLAUDE.md              # 使用 Claude Code 时需遵守的全局规则
├── Coding/
│   └── CLAUDE.md              # 使用 Claude Code 编程时需遵守的规范
├── Vault/
│   └── CLAUDE.md              # 个人知识库使用 Claude Code 时需遵守的规则
└── statusline.cjs             # 终端状态栏脚本（显示模型名 + 上下文用量）
```
