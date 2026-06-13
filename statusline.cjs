#!/usr/bin/env node
// Claude Code Status Line
// 显示: 模型 | 上下文使用量百分比
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const model = data.model?.display_name || data.model?.id || data._model || 'unknown';
    const used = data.context_window?.used_percentage;
    const ctx = used != null ? `${Math.round(used)}%` : '?%';
    // 截断过长的模型名，保留可读性
    const shortModel = model.length > 40 ? model.slice(0, 38) + '..' : model;
    console.log(`${shortModel}  ${ctx}`);
  } catch (e) {
    console.log('...');
  }
});
var input = '';
