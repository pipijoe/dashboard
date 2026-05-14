import { useMemo } from "react";
import {
  AlertTriangle,
  Banknote,
  CheckCircle2,
  Landmark,
  PieChart as PieChartIcon,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BankType = "国有大行" | "股份制银行" | "城商行" | "农商行" | "外资银行";
type CreditStatus = "额度不足" | "有额度用不出" | "正常";

type BankCreditLimit = {
  bankName: string;
  bankType: BankType;
  creditLimit: number;
  usedLimit: number;
  remainingLimit: number;
  usageRate: number;
  businessDemand: number;
  status: CreditStatus;
};

type RawBankCreditLimit = Omit<BankCreditLimit, "remainingLimit" | "usageRate" | "status">;

type TypeSummary = {
  bankType: BankType;
  bankCount: number;
  creditLimit: number;
  usedLimit: number;
  remainingLimit: number;
  businessDemand: number;
  usageRate: number;
  insufficientCount: number;
  idleCount: number;
};

const bankTypeOrder: BankType[] = ["国有大行", "股份制银行", "城商行", "农商行", "外资银行"];

const rawCreditLimits: RawBankCreditLimit[] = [
  { bankName: "工商银行", bankType: "国有大行", creditLimit: 120, usedLimit: 108, businessDemand: 21 },
  { bankName: "建设银行", bankType: "国有大行", creditLimit: 105, usedLimit: 72, businessDemand: 12 },
  { bankName: "农业银行", bankType: "国有大行", creditLimit: 92, usedLimit: 38, businessDemand: 8 },
  { bankName: "招商银行", bankType: "股份制银行", creditLimit: 80, usedLimit: 75, businessDemand: 14 },
  { bankName: "兴业银行", bankType: "股份制银行", creditLimit: 68, usedLimit: 29, businessDemand: 6 },
  { bankName: "浦发银行", bankType: "股份制银行", creditLimit: 62, usedLimit: 55, businessDemand: 10 },
  { bankName: "北京银行", bankType: "城商行", creditLimit: 46, usedLimit: 16, businessDemand: 7 },
  { bankName: "宁波银行", bankType: "城商行", creditLimit: 42, usedLimit: 36, businessDemand: 11 },
  { bankName: "杭州银行", bankType: "城商行", creditLimit: 36, usedLimit: 13, businessDemand: 4 },
  { bankName: "广州农商行", bankType: "农商行", creditLimit: 24, usedLimit: 19, businessDemand: 7 },
  { bankName: "上海农商行", bankType: "农商行", creditLimit: 22, usedLimit: 8, businessDemand: 3 },
  { bankName: "汇丰银行", bankType: "外资银行", creditLimit: 18, usedLimit: 6, businessDemand: 3 },
  { bankName: "渣打银行", bankType: "外资银行", creditLimit: 16, usedLimit: 14, businessDemand: 5 },
];

const statusStyles: Record<CreditStatus, { label: string; badge: string; row: string; bar: string; dot: string }> = {
  额度不足: {
    label: "额度不足",
    badge: "border-rose-200 bg-rose-50 text-rose-700",
    row: "bg-rose-50/70",
    bar: "#e11d48",
    dot: "bg-rose-500",
  },
  有额度用不出: {
    label: "有额度用不出",
    badge: "border-amber-200 bg-amber-50 text-amber-700",
    row: "bg-amber-50/70",
    bar: "#f59e0b",
    dot: "bg-amber-500",
  },
  正常: {
    label: "正常",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    row: "bg-white",
    bar: "#10b981",
    dot: "bg-emerald-500",
  },
};

const bankTypeColors: Record<BankType, string> = {
  国有大行: "#dc2626",
  股份制银行: "#f97316",
  城商行: "#2563eb",
  农商行: "#16a34a",
  外资银行: "#7c3aed",
};

function identifyCreditStatus(usageRate: number, remainingLimit: number, businessDemand: number): CreditStatus {
  if (usageRate <= 45 && remainingLimit >= 25) {
    return "有额度用不出";
  }

  if (usageRate >= 80 && businessDemand > remainingLimit) {
    return "额度不足";
  }

  return "正常";
}

function buildCreditLimitData(items: RawBankCreditLimit[]): BankCreditLimit[] {
  return items.map((item) => {
    const remainingLimit = Number((item.creditLimit - item.usedLimit).toFixed(1));
    const usageRate = Number(((item.usedLimit / item.creditLimit) * 100).toFixed(1));

    return {
      ...item,
      remainingLimit,
      usageRate,
      status: identifyCreditStatus(usageRate, remainingLimit, item.businessDemand),
    };
  });
}

function formatAmount(value: number) {
  return `${value.toFixed(1)}亿元`;
}

function formatRate(value: number) {
  return `${value.toFixed(1)}%`;
}

function UsageTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: BankCreditLimit; value: number }>; label?: string }) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div className="rounded-lg border border-border bg-white/95 p-3 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">银行类型：{item.bankType}</p>
      <p className="text-muted-foreground">使用率：{formatRate(item.usageRate)}</p>
      <p className="text-muted-foreground">剩余额度：{formatAmount(item.remainingLimit)}</p>
      <p className="text-muted-foreground">业务需求：{formatAmount(item.businessDemand)}</p>
      <p className="font-semibold text-foreground">识别结果：{item.status}</p>
    </div>
  );
}

function TypeTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-white/95 p-3 text-xs shadow-lg">
      <p className="mb-1 font-semibold text-foreground">{label}</p>
      {payload.map((item) => (
        <p key={item.name} className="text-muted-foreground">
          {item.name}：{formatAmount(Number(item.value))}
        </p>
      ))}
    </div>
  );
}

export function InterbankManagementScreen() {
  const creditLimitData = useMemo(() => buildCreditLimitData(rawCreditLimits), []);
  const usageRanking = useMemo(
    () => [...creditLimitData].sort((a, b) => b.usageRate - a.usageRate),
    [creditLimitData],
  );
  const typeSummary = useMemo<TypeSummary[]>(() => {
    return bankTypeOrder.map((bankType) => {
      const typedItems = creditLimitData.filter((item) => item.bankType === bankType);
      const creditLimit = typedItems.reduce((sum, item) => sum + item.creditLimit, 0);
      const usedLimit = typedItems.reduce((sum, item) => sum + item.usedLimit, 0);
      const remainingLimit = typedItems.reduce((sum, item) => sum + item.remainingLimit, 0);
      const businessDemand = typedItems.reduce((sum, item) => sum + item.businessDemand, 0);

      return {
        bankType,
        bankCount: typedItems.length,
        creditLimit,
        usedLimit,
        remainingLimit,
        businessDemand,
        usageRate: Number(((usedLimit / creditLimit) * 100).toFixed(1)),
        insufficientCount: typedItems.filter((item) => item.status === "额度不足").length,
        idleCount: typedItems.filter((item) => item.status === "有额度用不出").length,
      };
    });
  }, [creditLimitData]);

  const totalCreditLimit = creditLimitData.reduce((sum, item) => sum + item.creditLimit, 0);
  const totalUsedLimit = creditLimitData.reduce((sum, item) => sum + item.usedLimit, 0);
  const totalRemainingLimit = creditLimitData.reduce((sum, item) => sum + item.remainingLimit, 0);
  const insufficientCount = creditLimitData.filter((item) => item.status === "额度不足").length;
  const idleCount = creditLimitData.filter((item) => item.status === "有额度用不出").length;
  const totalUsageRate = Number(((totalUsedLimit / totalCreditLimit) * 100).toFixed(1));

  return (
    <section className="space-y-5 text-xs">
      <div className="rounded-2xl p-4 backdrop-blur">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Interbank Credit Limit Management</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary">同业授信额度管理</h2>
          </div>
          <div className="rounded-full border border-rose-100 bg-rose-50 px-4 py-2 font-medium text-rose-700">
            数据日期：2026年5月14日 09:30
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border border-border bg-gradient-to-br from-rose-500/15 to-rose-50 shadow-sm ring-1 ring-rose-200">
          <CardContent className="space-y-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-rose-700 shadow-sm">
              <WalletCards className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground">授信额度总量</p>
            <p className="text-3xl font-black tracking-tight text-foreground">{totalCreditLimit.toFixed(1)}<span className="ml-1 text-sm font-semibold text-muted-foreground">亿元</span></p>
            <p className="border-t border-white/70 pt-3 text-muted-foreground">已用 {formatAmount(totalUsedLimit)}，剩余 {formatAmount(totalRemainingLimit)}</p>
          </CardContent>
        </Card>
        <Card className="border border-border bg-gradient-to-br from-blue-500/15 to-blue-50 shadow-sm ring-1 ring-blue-200">
          <CardContent className="space-y-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-blue-700 shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground">整体使用率</p>
            <p className="text-3xl font-black tracking-tight text-foreground">{formatRate(totalUsageRate)}</p>
            <p className="border-t border-white/70 pt-3 text-muted-foreground">按已使用额度 / 授信额度自动计算</p>
          </CardContent>
        </Card>
        <Card className="border border-border bg-gradient-to-br from-rose-500/15 to-rose-50 shadow-sm ring-1 ring-rose-200">
          <CardContent className="space-y-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-rose-700 shadow-sm">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground">额度不足银行</p>
            <p className="text-3xl font-black tracking-tight text-foreground">{insufficientCount}<span className="ml-1 text-sm font-semibold text-muted-foreground">家</span></p>
            <p className="border-t border-white/70 pt-3 text-muted-foreground">使用率高且业务需求金额大于剩余额度</p>
          </CardContent>
        </Card>
        <Card className="border border-border bg-gradient-to-br from-amber-500/15 to-amber-50 shadow-sm ring-1 ring-amber-200">
          <CardContent className="space-y-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-amber-700 shadow-sm">
              <Banknote className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-muted-foreground">有额度用不出</p>
            <p className="text-3xl font-black tracking-tight text-foreground">{idleCount}<span className="ml-1 text-sm font-semibold text-muted-foreground">家</span></p>
            <p className="border-t border-white/70 pt-3 text-muted-foreground">使用率低且剩余额度高，需排查准入和报价原因</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <Card className="border border-border bg-white/90 xl:col-span-7">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center justify-between text-xl">
              银行额度使用率排行
              <span className="text-xs font-normal text-muted-foreground">颜色按规则识别结果区分</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[430px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageRanking} layout="vertical" margin={{ left: 26, right: 32, top: 10, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3caca" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis type="category" dataKey="bankName" width={82} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <Tooltip content={<UsageTooltip />} />
                <Bar dataKey="usageRate" name="额度使用率" radius={[0, 10, 10, 0]} barSize={15}>
                  {usageRanking.map((entry) => (
                    <Cell key={entry.bankName} fill={statusStyles[entry.status].bar} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-white/90 xl:col-span-5">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-xl">
              <PieChartIcon className="h-5 w-5 text-primary" /> 银行类型维度汇总
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="h-[245px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typeSummary} margin={{ left: 0, right: 8, top: 14, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3caca" />
                  <XAxis dataKey="bankType" tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `${value}亿`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                  <Tooltip content={<TypeTooltip />} />
                  <Legend />
                  <Bar dataKey="usedLimit" name="已使用额度" stackId="limit" fill="#e11d48" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="remainingLimit" name="剩余额度" stackId="limit" fill="#fecdd3" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {typeSummary.map((item) => (
                <div key={item.bankType} className="rounded-xl border border-border bg-white p-3 shadow-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-semibold text-foreground">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: bankTypeColors[item.bankType] }} />
                      {item.bankType}
                    </span>
                    <span className="text-muted-foreground">{item.bankCount}家</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-rose-100">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${item.usageRate}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-muted-foreground">
                    <span>使用率 {formatRate(item.usageRate)}</span>
                    <span>风险 {item.insufficientCount + item.idleCount}家</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-white/90">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center justify-between text-xl">
            授信额度识别明细
            <span className="text-xs font-normal text-muted-foreground">规则：低使用率高剩余 / 高使用率且需求大于剩余</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-4">
          <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-left">
            <thead className="text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">银行名称</th>
                <th className="px-3 py-2 font-medium">银行类型</th>
                <th className="px-3 py-2 text-right font-medium">授信额度</th>
                <th className="px-3 py-2 text-right font-medium">已使用额度</th>
                <th className="px-3 py-2 text-right font-medium">剩余额度</th>
                <th className="px-3 py-2 text-right font-medium">额度使用率</th>
                <th className="px-3 py-2 text-right font-medium">业务需求金额</th>
                <th className="px-3 py-2 font-medium">识别结果</th>
              </tr>
            </thead>
            <tbody>
              {creditLimitData.map((item) => (
                <tr key={item.bankName} className={cn("rounded-xl shadow-sm", statusStyles[item.status].row)}>
                  <td className="rounded-l-xl border-y border-l border-border px-3 py-3 font-semibold text-foreground">
                    <span className="flex items-center gap-2">
                      <Landmark className="h-4 w-4 text-primary" /> {item.bankName}
                    </span>
                  </td>
                  <td className="border-y border-border px-3 py-3 text-muted-foreground">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-2.5 py-1 font-medium text-foreground">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: bankTypeColors[item.bankType] }} />
                      {item.bankType}
                    </span>
                  </td>
                  <td className="border-y border-border px-3 py-3 text-right font-medium">{formatAmount(item.creditLimit)}</td>
                  <td className="border-y border-border px-3 py-3 text-right font-medium">{formatAmount(item.usedLimit)}</td>
                  <td className="border-y border-border px-3 py-3 text-right font-medium">{formatAmount(item.remainingLimit)}</td>
                  <td className="border-y border-border px-3 py-3 text-right font-bold text-foreground">{formatRate(item.usageRate)}</td>
                  <td className="border-y border-border px-3 py-3 text-right font-medium">{formatAmount(item.businessDemand)}</td>
                  <td className="rounded-r-xl border-y border-r border-border px-3 py-3">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-semibold", statusStyles[item.status].badge)}>
                      {item.status === "正常" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                      <span className={cn("h-2 w-2 rounded-full", statusStyles[item.status].dot)} />
                      {statusStyles[item.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </section>
  );
}
