# 大屏系统框架（Vite + React + TailwindCSS + shadcn/ui）

## 已定义的大屏访问路径

- 银行关系大屏：`/screens/bank-relationship`
- 资金驾驶舱大屏：`/screens/fund-cockpit`
- 账户管理大屏：`/screens/account-management`

## 图表工具选择建议

推荐使用 **Apache ECharts**（搭配 `echarts-for-react`）：

- 对大屏场景友好，支持复杂布局、地图、关系图、仪表盘、3D（扩展）等。
- 视觉定制能力强，适合红色主题与金融驾驶舱风格。
- 性能成熟，适配数据量较大的实时/准实时展示。

当前代码先用色块占位，后续可以把每个占位块替换为 ECharts 组件。

## 启动

```bash
npm install
npm run dev
```
