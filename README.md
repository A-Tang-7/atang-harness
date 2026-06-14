# atang-harness

个人 Claude Code 配置仓库 —— 跨项目共享的全局规则、编程规范、知识库规则以及经过验证的 Skills 集合。

## 目录结构

```
atang-harness/
├── .claude/
│   ├── Coding-CLAUDE.md/
│   │   └── CLAUDE.md             # Coding 时使用的 CLAUDE.md
│   ├── Vault-CLAUDE.md/
│   │   └── CLAUDE.md             # 知识库时使用的 CLAUDE.md
│   ├── settings.local.json       # 项目私有权限配置
│   └── skills/                   # 经个人使用、验证过的 Skills
│       ├── caveman/              # 原始人风格解释器
│       ├── defuddle/             # 文本/代码优化润色
│       ├── elon-musk-perspective/ # 马斯克视角思考分析
│       ├── format-obsidian/      # Obsidian 笔记格式化
│       ├── humanizer/            # AI 文本人性化
│       ├── json-canvas/          # JSON Canvas 处理
│       ├── obsidian-bases/       # Obsidian Bases 数据库操作
│       ├── obsidian-cli/         # Obsidian 命令行工具
│       ├── obsidian-markdown/    # Obsidian Markdown 语法支持
│       ├── pua/                  # PUA 方法论分析
│       ├── settings-merger/      # 多项目 permissions 整合
│       ├── skill-creator/        # Skill 创建工具
│       ├── superpowers/          # 超级能力合集（规划/执行/验证/并行）
│       └── tabletennis-reviewer/ # 乒乓球训练回顾
├── Global/
│   └── CLAUDE.md                 # 全局规则（含 Karpathy 通用准则）
├── README.md
└── statusline.cjs                # 终端状态栏脚本（模型名 + 上下文用量）
```
