---
name: superpowers
description: "superpowers 技能包入口。提供 6 个核心方法论 skill：brainstorming、writing-plans、subagent-driven-development、dispatching-parallel-agents、executing-plans、verification-before-completion。"
---

# superpowers：方法论技能包

## 概述

superpowers 是嵌入式 AI Agent 的**方法论骨架**，提供 6 个核心 skill，覆盖从创意到交付的完整流程。

## 6 个核心 Skill

| Skill | 用途 | 入口文件 |
|-------|------|---------|
| **brainstorming** | 创意 → 设计：探索意图、理解需求、产出设计文档 | `brainstorming/SKILL.md` |
| **writing-plans** | 设计 → 计划：基于设计文档产出可执行实施计划 | `writing-plans/SKILL.md` |
| **subagent-driven-development** | 计划 → 执行：通过 subagent 执行计划并管理质量 | `subagent-driven-development/SKILL.md` |
| **dispatching-parallel-agents** | 并行分发：将独立任务并行分发给多个 subagent | `dispatching-parallel-agents/SKILL.md` |
| **executing-plans** | 独立执行：在单独 session 中执行计划（review checkpoint） | `executing-plans/SKILL.md` |
| **verification-before-completion** | 最终闭环：交付前验证所有产物符合预期 | `verification-before-completion/SKILL.md` |

## 流程关系

```
brainstorming
    ↓
writing-plans
    ↓
subagent-driven-development
    ↓
verification-before-completion
    ↓
CP3 交付复盘（必选）
```

**dispatching-parallel-agents** 和 **executing-plans** 为可选分支：
- `dispatching-parallel-agents`：多任务并行时使用
- `executing-plans`：需要独立 session 隔离执行时使用

## 使用约束

1. **必须按顺序执行**：brainstorming → writing-plans → subagent-driven-development → verification
2. **禁止跳过 phase**：不得在未完成前序 skill 的情况下直接进入后续 skill

## 引用

- 完整 brainstorming 流程：`.agents/skills/superpowers/brainstorming/SKILL.md`
- 完整 writing-plans 流程：`.agents/skills/superpowers/writing-plans/SKILL.md`
- 完整 subagent-driven-development 流程：`.agents/skills/superpowers/subagent-driven-development/SKILL.md`
