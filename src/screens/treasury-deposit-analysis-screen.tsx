import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  CalendarClock,
  Landmark,
  Percent,
  ShieldAlert,
  WalletCards,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DepositCategory = "活期" | "定期" | "存单";

type KpiItem = {
  label: string;
  value: string;
  unit?: string;
  description: string;
  trend?: "up" | "down";
  change?: string;
  tone: "rose" | "amber" | "blue" | "emerald";
  icon: typeof Landmark;
  alert?: boolean;
};

const categoryRouteMap: Record<DepositCategory, string> = {
  活期: "/screens/treasury-deposit/demand",
  定期: "/screens/treasury-deposit/time",
  存单: "/screens/treasury-deposit/certificate",
};

const kpiItems: KpiItem[] = [
  {
    label: "存款总规模",
    value: "438.6",
    unit: "亿元",
    description: "同业活期 + 定期 + 存单",
    trend: "up",
    change: "+3.8% 环比",
    tone: "rose",
    icon: WalletCards,
  },
  {
    label: "当日加权平均利率",
    value: "1.86",
    unit: "%",
    description: "整体存款平均收益率",
    trend: "up",
    change: "+4bp 较昨日",
    tone: "blue",
    icon: Percent,
  },
  {
    label: "本月累计存款利息收入",
    value: "6,428",
    unit: "万元",
    description: "较计划完成率 71.5%",
    trend: "up",
    change: "+9.6% 同比",
    tone: "emerald",
    icon: BadgeDollarSign,
  },
  {
    label: "近30天到期存款总金额",
    value: "92.4",
    unit: "亿元",
    description: "高于预警线 80 亿元",
    trend: "down",
    change: "需续作 21 笔",
    tone: "amber",
    icon: CalendarClock,
    alert: true,
  },
];

const depositComposition: Array<{
  name: DepositCategory;
  value: number;
  color: string;
  note: string;
}> = [
  { name: "活期", value: 126.8, color: "#e11d48", note: "结算沉淀资金" },
  { name: "定期", value: 186.5, color: "#f97316", note: "锁定收益主力" },
  { name: "存单", value: 125.3, color: "#2563eb", note: "灵活配置补充" },
];

const counterpartyTop10 = [
  { bank: "交通银行", amount: 58.2 },
  { bank: "兴业银行", amount: 47.6 },
  { bank: "中信银行", amount: 42.8 },
  { bank: "招商银行", amount: 39.5 },
  { bank: "浦发银行", amount: 35.1 },
  { bank: "宁波银行", amount: 31.7 },
  { bank: "北京银行", amount: 27.4 },
  { bank: "杭州银行", amount: 24.9 },
  { bank: "江苏银行", amount: 21.6 },
  { bank: "上海银行", amount: 18.3 },
];

const maturityDepositCategories = ["同业定期", "同业存单"] as const;
type MaturityDepositCategory = (typeof maturityDepositCategories)[number];

const maturityDistribution: Array<{ term: string } & Record<MaturityDepositCategory, number>> = [
  { term: "小于30天", 同业定期: 57.8, 同业存单: 42.6 },
  { term: "31-90天", 同业定期: 52.1, 同业存单: 41.5 },
  { term: "91-180天", 同业定期: 38.9, 同业存单: 25.7 },
  { term: "181-270天", 同业定期: 24.6, 同业存单: 12.8 },
  { term: "271-366天", 同业定期: 13.1, 同业存单: 2.7 },
  { term: "1Y以上", 同业定期: 6.5, 同业存单: 0 },
];

const rateTrend = [
  { date: "04-15", weightedRate: 1.72, shibor3m: 1.54 },
  { date: "04-20", weightedRate: 1.75, shibor3m: 1.55 },
  { date: "04-25", weightedRate: 1.79, shibor3m: 1.56 },
  { date: "04-30", weightedRate: 1.82, shibor3m: 1.57 },
  { date: "05-05", weightedRate: 1.81, shibor3m: 1.56 },
  { date: "05-10", weightedRate: 1.84, shibor3m: 1.55 },
  { date: "05-14", weightedRate: 1.86, shibor3m: 1.54 },
];

const categoryColors: Record<DepositCategory, string> = {
  活期: "#e11d48",
  定期: "#f97316",
  存单: "#2563eb",
};

const maturityCategoryColors: Record<MaturityDepositCategory, string> = {
  同业定期: "#f97316",
  同业存单: "#2563eb",
};

const kpiToneClass = {
  rose: "from-rose-500/15 to-rose-50 text-rose-700 ring-rose-200",
  amber: "from-amber-500/20 to-amber-50 text-amber-700 ring-amber-200",
  blue: "from-blue-500/15 to-blue-50 text-blue-700 ring-blue-200",
  emerald: "from-emerald-500/15 to-emerald-50 text-emerald-700 ring-emerald-200",
};

function formatAmount(value: number) {
  return `${value.toFixed(1)}亿元`;
}

function getPercent(value: number, total: number) {
  return `${((value / total) * 100).toFixed(1)}%`;
}

function DepositTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: DepositCategory; value: number; note: string } }> }) {
  if (!active || !payload?.length) {
    return null;
  }
  const item = payload[0].payload;
  const total = depositComposition.reduce((sum, current) => sum + current.value, 0);

  return (
    <div className="rounded-lg border border-border bg-white/95 p-3 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-foreground">{item.name}存款</p>
      <p className="text-muted-foreground">规模：{formatAmount(item.value)}</p>
      <p className="text-muted-foreground">占比：{getPercent(item.value, total)}</p>
      <p className="text-muted-foreground">说明：{item.note}</p>
    </div>
  );
}

function CounterpartyTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) {
    return null;
  }
  const total = counterpartyTop10.reduce((sum, item) => sum + item.amount, 0);
  const value = Number(payload[0].value);

  return (
    <div className="rounded-lg border border-border bg-white/95 p-3 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">存款规模：{formatAmount(value)}</p>
      <p className="text-muted-foreground">TOP10占比：{getPercent(value, total)}</p>
    </div>
  );
}

export function TreasuryDepositAnalysisScreen() {
  const navigate = useNavigate();
  const totalDeposit = useMemo(
    () => depositComposition.reduce((sum, item) => sum + item.value, 0),
    [],
  );

  return (
    <section className="space-y-5 text-xs">
      <div className="rounded-2xl border border-rose-100 bg-white/80 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold tracking-[0.28em] text-rose-500">TREASURY DEPOSIT ANALYSIS</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary">财司存款分析大屏</h2>
          </div>
          <div className="rounded-full border border-rose-100 bg-rose-50 px-4 py-2 font-medium text-rose-700">
            数据日期：2026年5月14日 09:30
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiItems.map((item) => {
          const Icon = item.icon;
          const TrendIcon = item.trend === "down" ? ArrowDownRight : ArrowUpRight;

          return (
            <Card
              key={item.label}
              className={cn(
                "relative border border-border bg-gradient-to-br p-1 shadow-sm ring-1",
                kpiToneClass[item.tone],
                item.alert && "border-amber-300 shadow-amber-100",
              )}
            >
              {item.alert ? (
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-amber-500 px-2 py-1 text-[11px] font-semibold text-white">
                  <ShieldAlert className="h-3.5 w-3.5" /> 预警
                </div>
              ) : null}
              <CardContent className="space-y-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-black tracking-tight text-foreground">{item.value}</span>
                    {item.unit ? <span className="pb-1 text-sm font-semibold text-muted-foreground">{item.unit}</span> : null}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-white/70 pt-3">
                  <span className="text-muted-foreground">{item.description}</span>
                  {item.change ? (
                    <span className={cn("inline-flex items-center gap-1 font-bold", item.trend === "down" ? "text-amber-700" : "text-red-600")}>
                      <TrendIcon className="h-4 w-4" /> {item.change}
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <Card className="border border-border bg-white/90 xl:col-span-5">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-between text-xl">
              存款构成
              <span className="text-xs font-normal text-muted-foreground">点击扇形下钻专项页面</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 p-4 lg:grid-cols-[1.35fr_1fr]">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={depositComposition}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={108}
                    paddingAngle={3}
                    onClick={(entry) => navigate(categoryRouteMap[entry.name as DepositCategory])}
                    className="cursor-pointer outline-none"
                  >
                    {depositComposition.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} stroke="rgba(255,255,255,0.95)" strokeWidth={3} />
                    ))}
                  </Pie>
                  <Tooltip content={<DepositTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center gap-3">
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-center">
                <p className="text-muted-foreground">合计规模</p>
                <p className="mt-1 text-3xl font-black text-primary">{totalDeposit.toFixed(1)}亿元</p>
              </div>
              {depositComposition.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => navigate(categoryRouteMap[item.name])}
                  className="flex items-center justify-between rounded-xl border border-border bg-white p-3 text-left transition hover:border-primary hover:bg-rose-50"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}存款
                  </span>
                  <span className="text-muted-foreground">{formatAmount(item.value)} / {getPercent(item.value, totalDeposit)}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-white/90 xl:col-span-7">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">交易对手集中度 TOP10</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={counterpartyTop10} layout="vertical" margin={{ left: 24, right: 28, top: 10, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3caca" />
                <XAxis type="number" tickFormatter={(value) => `${value}亿`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis type="category" dataKey="bank" width={76} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <Tooltip content={<CounterpartyTooltip />} />
                <Bar dataKey="amount" radius={[0, 10, 10, 0]} fill="#e11d48" barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <Card className="border border-border bg-white/90 xl:col-span-6">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">期限分布</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maturityDistribution} margin={{ left: 4, right: 12, top: 16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3caca" />
                <XAxis dataKey="term" tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${value}亿`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <Tooltip formatter={(value, name) => [formatAmount(Number(value)), name]} />
                <Legend />
                {maturityDepositCategories.map((name) => (
                  <Bar key={name} dataKey={name} stackId="deposit" fill={maturityCategoryColors[name]} radius={name === "同业存单" ? [8, 8, 0, 0] : [0, 0, 0, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-white/90 xl:col-span-6">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">利率走势与 Shibor 3M 对比</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={rateTrend} margin={{ left: 4, right: 8, top: 16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3caca" />
                <XAxis dataKey="date" tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis yAxisId="left" domain={[1.45, 1.95]} tickFormatter={(value) => `${value}%`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" domain={[1.45, 1.65]} tickFormatter={(value) => `${value}%`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <Tooltip formatter={(value, name) => [`${Number(value).toFixed(2)}%`, name === "weightedRate" ? "加权平均利率" : "Shibor 3M"]} />
                <Legend formatter={(value) => (value === "weightedRate" ? "加权平均利率" : "Shibor 3M基准")} />
                <Bar yAxisId="right" dataKey="shibor3m" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={26} />
                <Line yAxisId="left" type="monotone" dataKey="weightedRate" stroke="#e11d48" strokeWidth={3} dot={{ r: 4, fill: "#e11d48" }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
