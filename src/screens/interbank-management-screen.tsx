import { AlertTriangle, Banknote, Building2, FilePlus2, FileX2 } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type InterbankAccount = {
  bankName: string;
  bankType: string;
  accountCount: number;
  normalAccountCount: number;
  openedThisPeriod: number;
  closedThisPeriod: number;
  isRiskBank: boolean;
  riskTags: string[];
};

type KpiItem = {
  label: string;
  value: number;
  unit: string;
  description: string;
  tone: "rose" | "amber" | "blue" | "emerald";
  icon: typeof Building2;
};

const interbankAccounts: InterbankAccount[] = [
  {
    bankName: "国家开发银行",
    bankType: "政策性银行",
    accountCount: 16,
    normalAccountCount: 16,
    openedThisPeriod: 2,
    closedThisPeriod: 0,
    isRiskBank: false,
    riskTags: [],
  },
  {
    bankName: "交通银行",
    bankType: "国有大型商业银行",
    accountCount: 24,
    normalAccountCount: 23,
    openedThisPeriod: 3,
    closedThisPeriod: 1,
    isRiskBank: false,
    riskTags: ["资料待补正"],
  },
  {
    bankName: "招商银行",
    bankType: "股份制商业银行",
    accountCount: 18,
    normalAccountCount: 18,
    openedThisPeriod: 1,
    closedThisPeriod: 0,
    isRiskBank: false,
    riskTags: [],
  },
  {
    bankName: "华东银行",
    bankType: "股份制商业银行",
    accountCount: 15,
    normalAccountCount: 11,
    openedThisPeriod: 2,
    closedThisPeriod: 3,
    isRiskBank: true,
    riskTags: ["评级下调", "授信压降"],
  },
  {
    bankName: "宁波银行",
    bankType: "城市商业银行",
    accountCount: 12,
    normalAccountCount: 12,
    openedThisPeriod: 1,
    closedThisPeriod: 0,
    isRiskBank: false,
    riskTags: [],
  },
  {
    bankName: "城市商业银行A",
    bankType: "城市商业银行",
    accountCount: 9,
    normalAccountCount: 6,
    openedThisPeriod: 0,
    closedThisPeriod: 2,
    isRiskBank: true,
    riskTags: ["舆情预警", "交易限额"],
  },
  {
    bankName: "上海农商银行",
    bankType: "农村商业银行",
    accountCount: 7,
    normalAccountCount: 7,
    openedThisPeriod: 1,
    closedThisPeriod: 0,
    isRiskBank: false,
    riskTags: [],
  },
  {
    bankName: "北方农商银行",
    bankType: "农村商业银行",
    accountCount: 5,
    normalAccountCount: 3,
    openedThisPeriod: 0,
    closedThisPeriod: 1,
    isRiskBank: true,
    riskTags: ["资本充足率关注"],
  },
];

const accountTrend = [
  { period: "01月", opened: 7, closed: 3, netIncrease: 4 },
  { period: "02月", opened: 6, closed: 2, netIncrease: 4 },
  { period: "03月", opened: 9, closed: 4, netIncrease: 5 },
  { period: "04月", opened: 8, closed: 5, netIncrease: 3 },
  { period: "05月", opened: 10, closed: 7, netIncrease: 3 },
];

const bankTypeDistribution = interbankAccounts.reduce<Array<{ bankType: string; accounts: number; riskAccounts: number }>>(
  (items, account) => {
    const current = items.find((item) => item.bankType === account.bankType);
    if (current) {
      current.accounts += account.accountCount;
      current.riskAccounts += account.isRiskBank ? account.accountCount : 0;
      return items;
    }

    items.push({
      bankType: account.bankType,
      accounts: account.accountCount,
      riskAccounts: account.isRiskBank ? account.accountCount : 0,
    });
    return items;
  },
  [],
);

const kpiToneClass = {
  rose: "from-rose-500/15 to-rose-50 text-rose-700 ring-rose-200",
  amber: "from-amber-500/20 to-amber-50 text-amber-700 ring-amber-200",
  blue: "from-blue-500/15 to-blue-50 text-blue-700 ring-blue-200",
  emerald: "from-emerald-500/15 to-emerald-50 text-emerald-700 ring-emerald-200",
};

function formatNumber(value: number) {
  return value.toLocaleString("zh-CN");
}

function formatTrendLegend(value: unknown) {
  const legendMap: Record<string, string> = { opened: "开立账户", closed: "销户账户", netIncrease: "净增账户" };
  return typeof value === "string" ? legendMap[value] ?? value : String(value);
}

function formatDistributionLegend(value: unknown) {
  const legendMap: Record<string, string> = { accounts: "账户数量", riskAccounts: "风险银行账户" };
  return typeof value === "string" ? legendMap[value] ?? value : String(value);
}

function InterbankManagementTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; name?: string; value: number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) {
    return null;
  }

  const labelMap: Record<string, string> = {
    opened: "开立账户",
    closed: "销户账户",
    netIncrease: "净增账户",
    accounts: "账户数量",
    riskAccounts: "风险银行账户",
  };

  return (
    <div className="rounded-lg border border-border bg-white/95 p-3 text-xs shadow-lg">
      <p className="mb-2 font-semibold text-foreground">{label}</p>
      <div className="space-y-1">
        {payload.map((item) => (
          <p key={item.dataKey} className="flex items-center gap-2 text-muted-foreground">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            {labelMap[item.dataKey] ?? item.name ?? item.dataKey}：{formatNumber(Number(item.value))}户
          </p>
        ))}
      </div>
    </div>
  );
}

export function InterbankManagementScreen() {
  const totalAccounts = interbankAccounts.reduce((sum, item) => sum + item.accountCount, 0);
  const openedThisPeriod = interbankAccounts.reduce((sum, item) => sum + item.openedThisPeriod, 0);
  const closedThisPeriod = interbankAccounts.reduce((sum, item) => sum + item.closedThisPeriod, 0);
  const riskBankAccounts = interbankAccounts.reduce((sum, item) => sum + (item.isRiskBank ? item.accountCount : 0), 0);
  const riskBankCount = interbankAccounts.filter((item) => item.isRiskBank).length;

  const kpiItems: KpiItem[] = [
    {
      label: "同业账户总数",
      value: totalAccounts,
      unit: "户",
      description: `覆盖 ${interbankAccounts.length} 家同业银行`,
      tone: "blue",
      icon: Building2,
    },
    {
      label: "本期开立",
      value: openedThisPeriod,
      unit: "户",
      description: "本期新开同业账户",
      tone: "emerald",
      icon: FilePlus2,
    },
    {
      label: "本期销户",
      value: closedThisPeriod,
      unit: "户",
      description: "含主动清理与风险退出",
      tone: "amber",
      icon: FileX2,
    },
    {
      label: "关联风险银行账户数",
      value: riskBankAccounts,
      unit: "户",
      description: `关联 ${riskBankCount} 家风险银行`,
      tone: "rose",
      icon: AlertTriangle,
    },
  ];

  return (
    <section className="space-y-5 text-xs">
      <div className="rounded-2xl p-4 backdrop-blur">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-semibold uppercase tracking-[0.28em] text-rose-600">Interbank Account Management</p>
            <h2 className="mt-2 text-3xl font-extrabold text-primary">同业账户管理</h2>
          </div>
          <div className="rounded-full border border-rose-100 bg-rose-50 px-4 py-2 font-medium text-rose-700">
            数据日期：2026年5月14日 09:30
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiItems.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className={cn("border border-border bg-gradient-to-br p-1 shadow-sm ring-1", kpiToneClass[item.tone])}>
              <CardContent className="space-y-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-black tracking-tight text-foreground">{formatNumber(item.value)}</span>
                    <span className="pb-1 font-semibold text-muted-foreground">{item.unit}</span>
                  </div>
                </div>
                <p className="rounded-lg bg-white/70 px-3 py-2 font-medium text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-12">
        <Card className="border border-border bg-white/90 xl:col-span-7">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">开销户趋势</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={accountTrend} margin={{ left: 4, right: 8, top: 16, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3caca" />
                <XAxis dataKey="period" tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `${value}户`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <Tooltip content={<InterbankManagementTooltip />} />
                <Legend formatter={formatTrendLegend} />
                <Bar dataKey="opened" fill="#10b981" radius={[8, 8, 0, 0]} barSize={26} />
                <Bar dataKey="closed" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={26} />
                <Line type="monotone" dataKey="netIncrease" stroke="#e11d48" strokeWidth={3} dot={{ r: 4, fill: "#e11d48" }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-white/90 xl:col-span-5">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl">账户类型分布</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bankTypeDistribution} layout="vertical" margin={{ left: 44, right: 24, top: 10, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3caca" />
                <XAxis type="number" tickFormatter={(value) => `${value}户`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <YAxis type="category" dataKey="bankType" width={116} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                <Tooltip content={<InterbankManagementTooltip />} />
                <Legend formatter={formatDistributionLegend} />
                <Bar dataKey="accounts" fill="#2563eb" radius={[0, 10, 10, 0]} barSize={16} />
                <Bar dataKey="riskAccounts" fill="#e11d48" radius={[0, 10, 10, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-white/90">
        <CardHeader className="pb-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-xl">同业账户明细</CardTitle>
            <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700">
              <Banknote className="h-3 w-3" /> {formatNumber(totalAccounts)} 户账户
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-rose-50/80 hover:bg-rose-50/80">
                <TableHead>银行名称</TableHead>
                <TableHead>银行类型</TableHead>
                <TableHead className="text-right">账户数量</TableHead>
                <TableHead className="text-right">正常账户数</TableHead>
                <TableHead className="text-right">本期开立</TableHead>
                <TableHead className="text-right">本期销户</TableHead>
                <TableHead>风险状态</TableHead>
                <TableHead>风险标签</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interbankAccounts.map((account) => (
                <TableRow key={account.bankName} className={cn(account.isRiskBank && "bg-rose-50/70 hover:bg-rose-100/70")}>
                  <TableCell className="font-semibold text-foreground">{account.bankName}</TableCell>
                  <TableCell className="text-muted-foreground">{account.bankType}</TableCell>
                  <TableCell className="text-right font-semibold">{formatNumber(account.accountCount)}</TableCell>
                  <TableCell className="text-right">{formatNumber(account.normalAccountCount)}</TableCell>
                  <TableCell className="text-right text-emerald-700">+{formatNumber(account.openedThisPeriod)}</TableCell>
                  <TableCell className="text-right text-amber-700">-{formatNumber(account.closedThisPeriod)}</TableCell>
                  <TableCell>
                    {account.isRiskBank ? (
                      <Badge variant="destructive" className="shadow-sm shadow-rose-200">
                        <AlertTriangle className="h-3 w-3" /> 风险银行
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                        正常
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      {account.riskTags.length > 0 ? (
                        account.riskTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className={cn(
                              "border-amber-200 bg-amber-50 text-amber-700",
                              account.isRiskBank && "border-rose-200 bg-rose-50 text-rose-700",
                            )}
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
