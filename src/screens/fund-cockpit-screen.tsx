
import { useEffect, useMemo, useState, type ComponentType } from "react";

import {
  Activity,
  ChevronDown,
  CircleAlert,
  Clock3,
  Coins,
  HandCoins,
  Landmark,
  MoveUp,
  Wallet
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const liquidityRows = [
  { label: "流动性资产总计", value: "127.8", unit: "亿元", tone: "emerald", icon: Activity },
  { label: "流动性负债总计", value: "334.67", unit: "亿元", tone: "blue", icon: HandCoins },
  { label: "流动性比例", value: "37.74", unit: "%", tone: "green", icon: MoveUp },
  { label: "本月最低流动性比例", value: "35.14", unit: "%", tone: "amber", icon: CircleAlert }
] as const;

const liquidityTrend = [35.6, 36.2, 35.8, 36.9, 37.2, 37.74];
const liquidityTicks = ["11/01", "11/05", "11/10", "11/15", "11/20", "11/25"];
const barData = [82, 15, 28, 12, 55, 67, 72, 85];

const fundSeries = [
  { month: "6月", deposit: 398, equity: 168, reserve: 96, credit: 185, interbank: 118, invest: 167 },
  { month: "7月", deposit: 405, equity: 171, reserve: 98, credit: 191, interbank: 121, invest: 166 },
  { month: "8月", deposit: 412, equity: 173, reserve: 101, credit: 194, interbank: 124, invest: 166 },
  { month: "9月", deposit: 416, equity: 177, reserve: 102, credit: 197, interbank: 126, invest: 168 },
  { month: "10月", deposit: 423, equity: 181, reserve: 104, credit: 202, interbank: 129, invest: 169 },
  { month: "11月", deposit: 431, equity: 184, reserve: 106, credit: 206, interbank: 132, invest: 171 }
] as const;

const quoteTicks = ["7/1", "7/2", "7/3", "8/1", "8/2", "8/3", "9/1", "9/2", "9/3", "10/1", "10/2", "10/3"];
const marketTicks = ["7/28", "8/1", "8/4", "8/9", "8/12", "8/17"];
const positionTrend = [92, 96, 95, 99, 104, 108];
const positionTicks = ["6月", "7月", "8月", "9月", "10月", "11月"];

const positionDetailRows = [
  { month: "9月", value: "99", mom: "+4.21%", yoy: "+9.13%" },
  { month: "10月", value: "104", mom: "+5.05%", yoy: "+10.64%" },
  { month: "11月", value: "108", mom: "+3.85%", yoy: "+12.50%" }
] as const;

const toneStyles = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700"
} as const;

const quoteTypeFilters = ["定期", "存单"] as const;
const quoteTermFiltersByType = {
  定期: ["1年", "2年", "3年"],
  存单: ["1个月", "3个月", "6个月", "9个月", "12个月"]
} as const;
type QuoteTerm = (typeof quoteTermFiltersByType)[keyof typeof quoteTermFiltersByType][number];

function CardHead({ icon: Icon, title, subtitle }: { icon: ComponentType<{ className?: string }>; title: string; subtitle: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 p-2.5 text-white shadow-sm">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-2xl font-bold leading-none tracking-tight text-slate-900">{title}</h3>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <button className="rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-500 hover:bg-rose-100">
        查看更多 <ChevronDown className="ml-1 inline h-3 w-3" />
      </button>
    </div>
  );
}

export function FundCockpitScreen() {
  const [selectedType, setSelectedType] = useState<(typeof quoteTypeFilters)[number]>("定期");
  const [selectedTerm, setSelectedTerm] = useState<QuoteTerm>("1年");
  const availableQuoteTerms = quoteTermFiltersByType[selectedType];

  useEffect(() => {
    setSelectedTerm(quoteTermFiltersByType[selectedType][0]);
  }, [selectedType]);

  const fundStack = useMemo(() => {
    return fundSeries.map((d) => ({
      ...d,
      sourceTotal: d.deposit + d.equity,
      appTotal: d.reserve + d.credit + d.interbank + d.invest
    }));
  }, []);

  const latestFund = fundStack[fundStack.length - 1];
  const [highlightedRiver, setHighlightedRiver] = useState<string | null>(null);
  const [hoveredRiverPoint, setHoveredRiverPoint] = useState<{
    month: string;
    label: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const sourceDetails = [
    { label: "吸收存款", value: latestFund.deposit, color: "text-emerald-700" },
    { label: "权益资金", value: latestFund.equity, color: "text-amber-700" }
  ] as const;
  const appDetails = [
    { label: "资金备付", value: latestFund.reserve, color: "text-cyan-700" },
    { label: "信贷业务", value: latestFund.credit, color: "text-blue-700" },
    { label: "同业业务", value: latestFund.interbank, color: "text-sky-700" },
    { label: "投资业务", value: latestFund.invest, color: "text-slate-700" }
  ] as const;

  const riverSeries = useMemo(
    () =>
      [
        { key: "deposit", label: "吸收存款", color: "#16a34a" },
        { key: "equity", label: "权益资金", color: "#d97706" },
        { key: "reserve", label: "资金备付", color: "#0891b2" },
        { key: "credit", label: "信贷业务", color: "#2563eb" },
        { key: "interbank", label: "同业业务", color: "#0284c7" },
        { key: "invest", label: "投资业务", color: "#475569" }
      ] as const,
    []
  );

  const riverLayout = useMemo(() => {
    const width = 880;
    const height = 240;
    const padX = 34;
    const padY = 16;
    const drawableWidth = width - padX * 2;
    const drawableHeight = height - padY * 2;
    const xStep = drawableWidth / (fundSeries.length - 1);
    const monthTotals = fundSeries.map((item) => riverSeries.reduce((acc, series) => acc + item[series.key], 0));
    const maxTotal = Math.max(...monthTotals);
    const scaleY = drawableHeight / maxTotal;
    const centerY = height / 2;

    const toSmoothPath = (points: Array<{ x: number; y: number }>) => {
      if (points.length === 0) {
        return "";
      }
      if (points.length === 1) {
        return `M ${points[0].x} ${points[0].y}`;
      }
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i += 1) {
        const prev = points[i - 1];
        const current = points[i];
        const cpX = (prev.x + current.x) / 2;
        path += ` C ${cpX} ${prev.y}, ${cpX} ${current.y}, ${current.x} ${current.y}`;
      }
      return path;
    };

    const layers = riverSeries.map((series) => {
      const topPoints: Array<{ x: number; y: number }> = [];
      const bottomPoints: Array<{ x: number; y: number }> = [];
      const centers: Array<{ x: number; y: number; value: number; month: string }> = [];

      fundSeries.forEach((item, index) => {
        const x = padX + index * xStep;
        const totalHeight = monthTotals[index] * scaleY;
        const baseline = centerY - totalHeight / 2;
        const previousValue = riverSeries
          .slice(0, riverSeries.findIndex((entry) => entry.key === series.key))
          .reduce((sum, entry) => sum + item[entry.key], 0);
        const currentTop = baseline + previousValue * scaleY;
        const currentBottom = currentTop + item[series.key] * scaleY;
        topPoints.push({ x, y: currentTop });
        bottomPoints.push({ x, y: currentBottom });
        centers.push({ x, y: (currentTop + currentBottom) / 2, value: item[series.key], month: item.month });
      });

      const topPath = toSmoothPath(topPoints);
      const bottomPath = toSmoothPath([...bottomPoints].reverse());

      return {
        ...series,
        path: `${topPath} L ${bottomPoints[bottomPoints.length - 1].x} ${bottomPoints[bottomPoints.length - 1].y} ${bottomPath.slice(1)} Z`,
        centers
      };
    });

    return { width, height, padX, layers };
  }, [riverSeries]);

  return (
    <section className="grid grid-cols-12 gap-5 text-xs">
      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-4">
        <CardContent className="p-0">
          <CardHead icon={Activity} title="流动性比例" subtitle="Liquidity Ratio" />

          <Tabs defaultValue="current">
            <TabsList className="w-full">
              <TabsTrigger value="current" className="flex-1">当前</TabsTrigger>
              <TabsTrigger value="trend" className="flex-1">趋势</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <div className="mb-2 rounded-xl border border-blue-100 bg-sky-50 p-3">
                <div className="mb-1.5 flex items-start justify-between">
                  <p className="text-xs text-slate-600">当前流动性比例</p>
                  <div className="text-right text-slate-700">
                    <p className="text-[11px]">监管标准</p>
                    <p className="text-2xl font-semibold text-slate-800">≥25%</p>
                    <p className="text-xs text-green-600">达标</p>
                  </div>
                </div>
                <p className="text-4xl font-extrabold tracking-tight text-blue-600">37.74%</p>
              </div>
              <div className="space-y-2">
                {liquidityRows.slice(0, 2).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${toneStyles[item.tone]}`}>
                      <p className="flex items-center gap-2 text-xs font-medium">
                        <Icon className="h-3.5 w-3.5" />
                        {item.label}
                      </p>
                      <p className="text-right">
                        <span className="text-2xl font-bold">{item.value}</span>
                        <span className="ml-1 text-[11px]">{item.unit}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="trend">
              <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs text-slate-600">近6期流动性比例趋势（%）</p>
                <svg viewBox="0 0 560 170" className="h-36 w-full">
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    points={liquidityTrend
                      .map((v, i) => `${20 + i * 104},${150 - (v - 34) * 15}`)
                      .join(" ")}
                  />
                  {liquidityTrend.map((v, i) => (
                    <g key={i}>
                      <circle cx={20 + i * 104} cy={150 - (v - 34) * 15} r="4" fill="#fff" stroke="#2563eb" strokeWidth="2" />
                      <text x={20 + i * 104} y={140 - (v - 34) * 15} textAnchor="middle" className="fill-slate-500 text-[10px]">{v.toFixed(2)}</text>
                    </g>
                  ))}
                </svg>
                <div className="grid grid-cols-6 text-center text-[10px] text-slate-500">
                  {liquidityTicks.map((tick) => (
                    <span key={tick}>{tick}</span>
                  ))}
                </div>
              </div>
              <div className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${toneStyles[liquidityRows[3].tone]}`}>
                <p className="flex items-center gap-2 text-xs font-medium">
                  <CircleAlert className="h-3.5 w-3.5" />
                  本月最低流动性比例
                </p>
                <p className="text-right">
                  <span className="text-2xl font-bold">35.14</span>
                  <span className="ml-1 text-[11px]">%</span>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-4">
        <CardContent className="p-0">
          <CardHead icon={Clock3} title="同业资产分析" subtitle="Interbank Asset Analysis" />

          <Tabs defaultValue="term">
            <TabsList className="mb-3 w-full">
              <TabsTrigger value="term" className="flex-1">同业期限</TabsTrigger>
              <TabsTrigger value="structure" className="flex-1">同业结构</TabsTrigger>
            </TabsList>

            <TabsContent value="term" className="min-h-[292px]">
              <div className="mb-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-orange-100 bg-orange-50 p-2.5">
                  <p className="text-xs text-slate-600">资产总额</p>
                  <p className="mt-1 text-3xl font-bold text-orange-600">417<span className="ml-1 text-sm">亿</span></p>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-2.5">
                  <p className="text-xs text-slate-600">最长期限</p>
                  <p className="mt-1 text-3xl font-bold text-emerald-600">1Y<span className="ml-1 text-base">85亿</span></p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-2.5">
                <div className="mb-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>期限分布（亿）</span>
                  <span>总量：417亿</span>
                </div>
                <div className="flex h-40 items-end gap-1.5 rounded-lg border border-slate-200 bg-white px-2 pb-1.5 pt-3 shadow-[inset_0_-1px_0_#f1f5f9]">
                  {barData.map((v, idx) => (
                    <div key={idx} className="relative flex h-full flex-1 items-end">
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">{v}</span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-emerald-300 via-cyan-400 to-blue-500 shadow-[0_2px_8px_rgba(14,116,144,0.25)]"
                        style={{ height: `${v}%`, opacity: 0.65 + idx * 0.04 }}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 grid grid-cols-8 text-center text-[10px] text-slate-500">
                  {["1D", "7D", "1M", "2M", "3M", "6M", "9M", "1Y"].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="structure" className="min-h-[292px]">
              <div className="mb-3 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50 p-3">
                <div>
                  <p className="text-xs text-slate-600">资产总额</p>
                  <p className="mt-1 text-4xl font-bold text-violet-600">127.8<span className="ml-1 text-lg">亿</span></p>
                </div>
                <div className="rounded-full bg-violet-100 p-2.5 text-violet-700">
                  <Coins className="h-6 w-6" />
                </div>
              </div>

              <div className="grid place-items-center py-1.5">
                <div
                  className="h-36 w-36 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#f97316 0 45%, #8b5cf6 45% 75%, #5977e8 75% 100%)"
                  }}
                >
                  <div className="m-auto mt-6 h-24 w-24 rounded-full bg-white" />
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-[#5977e8]" />活期 25%</span>
                  <span className="inline-flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-orange-500" />定期 45%</span>
                  <span className="inline-flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-violet-500" />存单 30%</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-4">
        <CardContent className="p-0">
          <CardHead icon={Wallet} title="头寸趋势分析" subtitle="Position Trend Analysis" />
          <div className="mb-3">
            <p className="text-xs text-slate-500">趋势折线图与数据明细表结合，展示环比与同比变化</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <svg viewBox="0 0 560 170" className="h-36 w-full">
              <polyline
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="3"
                points={positionTrend.map((v, i) => `${20 + i * 104},${150 - (v - 88) * 4}`).join(" ")}
              />
              {positionTrend.map((v, i) => (
                <g key={positionTicks[i]}>
                  <circle cx={20 + i * 104} cy={150 - (v - 88) * 4} r="4" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
                </g>
              ))}
            </svg>
            <div className="grid grid-cols-6 text-center text-[10px] text-slate-500">
              {positionTicks.map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-slate-200">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-3 py-2">月份</th>
                  <th className="px-3 py-2">头寸(亿)</th>
                  <th className="px-3 py-2">环比</th>
                  <th className="px-3 py-2 text-right">同比</th>
                </tr>
              </thead>
              <tbody>
                {positionDetailRows.map((row) => (
                  <tr key={row.month} className="border-t border-slate-100 text-slate-700">
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2">{row.value}</td>
                    <td className="px-3 py-2 text-emerald-600">{row.mom}</td>
                    <td className="px-3 py-2 text-right text-blue-600">{row.yoy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-8">
        <CardContent className="p-0">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">资金来源与应用</h3>
              <p className="text-xs text-slate-500">Fund Source &amp; Application Analysis</p>
            </div>
            <button className="rounded-xl bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-500 hover:bg-rose-100">查看更多 <ChevronDown className="ml-1 inline h-3 w-3" /></button>
          </div>

          <div className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs text-slate-600">资金来源</p>
                <p className="mt-1 text-4xl font-bold text-emerald-700">{latestFund.sourceTotal}<span className="ml-1 text-base font-semibold">亿元</span></p>
                <div className="mt-3 space-y-1.5">
                  {sourceDetails.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-emerald-100 bg-white/80 px-2.5 py-1.5 text-[11px]">
                      <span className="text-slate-600">{item.label}</span>
                      <span className={`font-semibold ${item.color}`}>{item.value} 亿元</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                <p className="text-xs text-slate-600">资金应用</p>
                <p className="mt-1 text-4xl font-bold text-sky-700">{latestFund.appTotal}<span className="ml-1 text-base font-semibold">亿元</span></p>
                <div className="mt-3 space-y-1.5">
                  {appDetails.map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-sky-100 bg-white/80 px-2.5 py-1.5 text-[11px]">
                      <span className="text-slate-600">{item.label}</span>
                      <span className={`font-semibold ${item.color}`}>{item.value} 亿元</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <p className="font-medium text-slate-700">主题河流图（资金来源与应用趋势）</p>
              </div>
              <div className="mb-2 flex flex-wrap gap-2">
                {riverLayout.layers.map((series) => (
                  <button
                    key={series.label}
                    onMouseEnter={() => setHighlightedRiver(series.label)}
                    onMouseLeave={() => setHighlightedRiver(null)}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600"
                  >
                    <i className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series.color }} />
                    {series.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                {hoveredRiverPoint ? (
                  <div
                    className="pointer-events-none absolute z-10 rounded-lg border border-slate-200 bg-white/95 px-2 py-1 text-[11px] text-slate-700 shadow"
                    style={{
                      left: `${(hoveredRiverPoint.x / riverLayout.width) * 100}%`,
                      top: `${(hoveredRiverPoint.y / riverLayout.height) * 100}%`,
                      transform: "translate(-50%, -120%)"
                    }}
                  >
                    {hoveredRiverPoint.month} {hoveredRiverPoint.label} {hoveredRiverPoint.value}亿
                  </div>
                ) : null}
                <svg viewBox={`0 0 ${riverLayout.width} ${riverLayout.height}`} className="h-64 w-full">
                {riverLayout.layers.map((series) => {
                  const dimmed = highlightedRiver !== null && highlightedRiver !== series.label;
                  return (
                    <path
                      key={series.label}
                      d={series.path}
                      fill={series.color}
                      opacity={dimmed ? 0.25 : 0.88}
                      className="transition-opacity duration-200"
                      onMouseEnter={() => setHighlightedRiver(series.label)}
                      onMouseLeave={() => {
                        setHighlightedRiver(null);
                        setHoveredRiverPoint(null);
                      }}
                    />
                  );
                })}
                {riverLayout.layers.flatMap((series) =>
                  series.centers.map((point) => (
                    <circle
                      key={`${series.key}-${point.month}`}
                      cx={point.x}
                      cy={point.y}
                      r="9"
                      fill="transparent"
                      onMouseEnter={() => {
                        setHighlightedRiver(series.label);
                        setHoveredRiverPoint({
                          month: point.month,
                          label: series.label,
                          value: point.value,
                          x: point.x,
                          y: point.y
                        });
                      }}
                      onMouseLeave={() => setHoveredRiverPoint(null)}
                    />
                  ))
                )}
                {fundSeries.map((item, index) => {
                  const x = riverLayout.padX + index * ((riverLayout.width - riverLayout.padX * 2) / (fundSeries.length - 1));
                  return (
                    <text key={item.month} x={x} y={riverLayout.height - 4} textAnchor="middle" className="fill-slate-500 text-[10px]">
                      {item.month}
                    </text>
                  );
                })}
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-12 grid gap-5 lg:col-span-4">
        <Card className="rounded-2xl bg-white/90 p-5">
          <CardContent className="p-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">同业市场报价</h3>
              <button className="text-xs font-medium text-rose-500">查看更多 <ChevronDown className="ml-1 inline h-3 w-3" /></button>
            </div>

            <div className="mb-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div>
                <p className="mb-1 text-[11px] text-slate-500">期限筛选</p>
                <div className="flex flex-wrap gap-1.5">
                  {availableQuoteTerms.map((term) => (
                    <button
                      key={term}
                      onClick={() => setSelectedTerm(term)}
                      className={`rounded-full px-2 py-1 text-[11px] ${selectedTerm === term ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-[11px] text-slate-500">类型筛选</p>
                <div className="flex flex-wrap gap-1.5">
                  {quoteTypeFilters.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`rounded-full px-2 py-1 text-[11px] ${selectedType === type ? "bg-fuchsia-600 text-white" : "bg-white text-slate-600"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <svg viewBox="0 0 560 180" className="h-32 w-full">
              <polyline fill="none" stroke="#ec4899" strokeWidth="4" points="12,30 70,35 128,40 186,43 244,47 302,52 360,58 418,63 476,68 544,72" />
              {Array.from({ length: 10 }).map((_, i) => (
                <circle key={i} cx={12 + i * 58} cy={30 + i * 4.8} r="4" fill="#fff" stroke="#ec4899" strokeWidth="3" />
              ))}
            </svg>
            <div className="grid grid-cols-6 text-[10px] text-slate-500">
              {quoteTicks.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">当前筛选：{selectedTerm} / {selectedType}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white/90 p-5">
          <CardContent className="p-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">市场行情</h3>
              <button className="text-xs font-medium text-rose-500">查看更多 <ChevronDown className="ml-1 inline h-3 w-3" /></button>
            </div>
            <svg viewBox="0 0 560 180" className="h-32 w-full">
              <polyline fill="none" stroke="#ef4444" strokeWidth="3" points="10,18 80,28 150,38 220,48 290,72 360,88 430,105 500,114 550,120" />
              <polyline fill="none" stroke="#2563eb" strokeWidth="3" points="10,20 80,26 150,36 220,44 290,68 360,86 430,103 500,112 550,118" />
            </svg>
            <div className="grid grid-cols-6 text-[10px] text-slate-500">
              {marketTicks.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="mt-2 text-center text-[11px]"><span className="text-red-500">-●- SHIBOR隔夜</span> <span className="ml-3 text-blue-500">-●- LPR 1年期</span></p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
