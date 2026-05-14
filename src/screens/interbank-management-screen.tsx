import {
    AlertTriangle,
    Banknote,
    Building2,
    CheckCircle2,
    CircleSlash2,
    FilePlus2,
    FileX2,
    ShieldCheck,
    TrendingUp,
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

type CreditExposure = {
    bankName: string;
    bankType: string;
    creditLimit: number;
    usedLimit: number;
    pipelineDemand: number;
    status: "额度不足" | "有额度用不出" | "使用健康";
};

type WhiteListBank = {
    bankName: string;
    bankType: string;
    rating: "AAA" | "AA+" | "AA" | "A+";
};

type BlackListBank = {
    bankName: string;
    bankType: string;
    reason: string;
    listedDate: string;
    action: string;
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

const creditExposure: CreditExposure[] = [
    { bankName: "招商银行", bankType: "股份制商业银行", creditLimit: 90, usedLimit: 82, pipelineDemand: 18, status: "额度不足" },
    { bankName: "交通银行", bankType: "国有大型商业银行", creditLimit: 120, usedLimit: 96, pipelineDemand: 20, status: "使用健康" },
    { bankName: "国家开发银行", bankType: "政策性银行", creditLimit: 150, usedLimit: 108, pipelineDemand: 16, status: "使用健康" },
    { bankName: "宁波银行", bankType: "城市商业银行", creditLimit: 55, usedLimit: 31, pipelineDemand: 10, status: "有额度用不出" },
    { bankName: "上海农商银行", bankType: "农村商业银行", creditLimit: 35, usedLimit: 14, pipelineDemand: 7, status: "有额度用不出" },
    { bankName: "华东银行", bankType: "股份制商业银行", creditLimit: 48, usedLimit: 44, pipelineDemand: 14, status: "额度不足" },
    { bankName: "城市商业银行A", bankType: "城市商业银行", creditLimit: 30, usedLimit: 9, pipelineDemand: 4, status: "有额度用不出" },
    { bankName: "北方农商银行", bankType: "农村商业银行", creditLimit: 18, usedLimit: 6, pipelineDemand: 2, status: "有额度用不出" },
];

const whiteListBanks: WhiteListBank[] = [
    { bankName: "国家开发银行", bankType: "政策性银行", rating: "AAA" },
    { bankName: "交通银行", bankType: "国有大型商业银行", rating: "AAA" },
    { bankName: "招商银行", bankType: "股份制商业银行", rating: "AAA" },
    { bankName: "浦发银行", bankType: "股份制商业银行", rating: "AA+" },
    { bankName: "中信银行", bankType: "股份制商业银行", rating: "AA+" },
    { bankName: "宁波银行", bankType: "城市商业银行", rating: "AA+" },
    { bankName: "上海银行", bankType: "城市商业银行", rating: "AA" },
    { bankName: "江苏银行", bankType: "城市商业银行", rating: "AA" },
    { bankName: "上海农商银行", bankType: "农村商业银行", rating: "AA" },
    { bankName: "苏州农商银行", bankType: "农村商业银行", rating: "A+" },
];

const blackListBanks: BlackListBank[] = [
    { bankName: "华东银行", bankType: "股份制商业银行", reason: "主体评级下调且授信压降未完成", listedDate: "2026-04-18", action: "暂停新增交易" },
    { bankName: "城市商业银行A", bankType: "城市商业银行", reason: "负面舆情触发准入复核", listedDate: "2026-03-27", action: "仅允许存量压降" },
    { bankName: "北方农商银行", bankType: "农村商业银行", reason: "资本充足率持续低于预警阈值", listedDate: "2026-02-09", action: "冻结授信额度" },
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

const creditRanking = creditExposure
    .map((item) => ({
        ...item,
        availableLimit: item.creditLimit - item.usedLimit,
        usageRate: Number(((item.usedLimit / item.creditLimit) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.usageRate - a.usageRate);

const creditByBankType = creditExposure
    .reduce<Array<{ bankType: string; creditLimit: number; usedLimit: number; pipelineDemand: number }>>((items, item) => {
        const current = items.find((entry) => entry.bankType === item.bankType);
        if (current) {
            current.creditLimit += item.creditLimit;
            current.usedLimit += item.usedLimit;
            current.pipelineDemand += item.pipelineDemand;
            return items;
        }

        items.push({
            bankType: item.bankType,
            creditLimit: item.creditLimit,
            usedLimit: item.usedLimit,
            pipelineDemand: item.pipelineDemand,
        });
        return items;
    }, [])
    .map((item) => ({
        ...item,
        usageRate: Number(((item.usedLimit / item.creditLimit) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.usageRate - a.usageRate);

const whiteListTypeDistribution = whiteListBanks.reduce<Array<{ name: string; value: number }>>((items, bank) => {
    const current = items.find((item) => item.name === bank.bankType);
    if (current) {
        current.value += 1;
        return items;
    }

    items.push({ name: bank.bankType, value: 1 });
    return items;
}, []);

const whiteListRatingDistribution = whiteListBanks.reduce<Array<{ rating: string; count: number }>>((items, bank) => {
    const current = items.find((item) => item.rating === bank.rating);
    if (current) {
        current.count += 1;
        return items;
    }

    items.push({ rating: bank.rating, count: 1 });
    return items;
}, []);

const kpiToneClass = {
    rose: "from-rose-500/15 to-rose-50 text-rose-700 ring-rose-200",
    amber: "from-amber-500/20 to-amber-50 text-amber-700 ring-amber-200",
    blue: "from-blue-500/15 to-blue-50 text-blue-700 ring-blue-200",
    emerald: "from-emerald-500/15 to-emerald-50 text-emerald-700 ring-emerald-200",
};

const statusClass: Record<CreditExposure["status"], string> = {
    额度不足: "border-rose-200 bg-rose-50 text-rose-700",
    有额度用不出: "border-amber-200 bg-amber-50 text-amber-700",
    使用健康: "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const pieColors = ["#2563eb", "#16a34a", "#f97316", "#a855f7", "#e11d48"];

function formatNumber(value: number) {
    return value.toLocaleString("zh-CN");
}

function formatAmount(value: number) {
    return `${formatNumber(value)}亿元`;
}

function formatTrendLegend(value: unknown) {
    const legendMap: Record<string, string> = { opened: "开立账户", closed: "销户账户", netIncrease: "净增账户" };
    return typeof value === "string" ? legendMap[value] ?? value : String(value);
}

function formatDistributionLegend(value: unknown) {
    const legendMap: Record<string, string> = { accounts: "账户数量", riskAccounts: "风险银行账户" };
    return typeof value === "string" ? legendMap[value] ?? value : String(value);
}

function formatCreditLegend(value: unknown) {
    const legendMap: Record<string, string> = { creditLimit: "授信额度", usedLimit: "已用额度", usageRate: "使用率" };
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

function CreditTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ dataKey: string; name?: string; value: number; color?: string }>; label?: string }) {
    if (!active || !payload?.length) {
        return null;
    }

    const labelMap: Record<string, string> = {
        creditLimit: "授信额度",
        usedLimit: "已用额度",
        usageRate: "使用率",
    };

    return (
        <div className="rounded-lg border border-border bg-white/95 p-3 text-xs shadow-lg">
            <p className="mb-2 font-semibold text-foreground">{label}</p>
            <div className="space-y-1">
                {payload.map((item) => (
                    <p key={item.dataKey} className="flex items-center gap-2 text-muted-foreground">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {labelMap[item.dataKey] ?? item.name ?? item.dataKey}：
                        {item.dataKey === "usageRate" ? `${Number(item.value).toFixed(1)}%` : formatAmount(Number(item.value))}
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
    const totalCreditLimit = creditExposure.reduce((sum, item) => sum + item.creditLimit, 0);
    const totalUsedLimit = creditExposure.reduce((sum, item) => sum + item.usedLimit, 0);
    const totalAvailableLimit = totalCreditLimit - totalUsedLimit;
    const totalUsageRate = Number(((totalUsedLimit / totalCreditLimit) * 100).toFixed(1));
    const insufficientLimitCount = creditExposure.filter((item) => item.status === "额度不足").length;
    const idleLimitCount = creditExposure.filter((item) => item.status === "有额度用不出").length;

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
                        <p className="font-semibold uppercase tracking-[0.28em] text-rose-600">Interbank Management</p>
                        <h2 className="mt-2 text-3xl font-extrabold text-primary">同业管理</h2>
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
                        <Card key={item.label} className="border border-border bg-white/90 shadow-sm">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className={cn("rounded-2xl bg-gradient-to-br p-3 ring-1", kpiToneClass[item.tone])}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{item.label}</p>
                                    <p className="mt-1 text-3xl font-extrabold text-foreground">
                                        {formatNumber(item.value)}
                                        <span className="ml-1 text-sm font-semibold text-muted-foreground">{item.unit}</span>
                                    </p>
                                    <p className="mt-1 text-muted-foreground">{item.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 xl:grid-cols-12">
                <Card className="border border-border bg-white/90 xl:col-span-7">
                    <CardHeader className="pb-0">
                        <CardTitle className="text-xl">账户开销户趋势</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[340px] p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={accountTrend} margin={{ left: 8, right: 20, top: 16, bottom: 8 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3caca" />
                                <XAxis dataKey="period" tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                                <YAxis tickFormatter={(value) => `${value}户`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                                <Tooltip content={<InterbankManagementTooltip />} />
                                <Legend formatter={formatTrendLegend} />
                                <Bar dataKey="opened" fill="#16a34a" radius={[8, 8, 0, 0]} barSize={20} />
                                <Bar dataKey="closed" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={20} />
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
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <TrendingUp className="h-5 w-5 text-rose-600" /> 授信与额度执行分析
                            </CardTitle>
                            <p className="mt-2 text-sm text-muted-foreground">
                                分析授信额度的使用效率和分布情况，按银行类型与具体银行展示额度使用率排行，识别“有额度用不出”或“额度不足”的情况。
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-right sm:grid-cols-4">
                            <div className="rounded-xl bg-blue-50 px-3 py-2 text-blue-700">
                                <p className="text-[11px] text-blue-600/80">授信总额</p>
                                <p className="text-lg font-bold">{formatAmount(totalCreditLimit)}</p>
                            </div>
                            <div className="rounded-xl bg-emerald-50 px-3 py-2 text-emerald-700">
                                <p className="text-[11px] text-emerald-600/80">已用额度</p>
                                <p className="text-lg font-bold">{formatAmount(totalUsedLimit)}</p>
                            </div>
                            <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-700">
                                <p className="text-[11px] text-amber-600/80">可用额度</p>
                                <p className="text-lg font-bold">{formatAmount(totalAvailableLimit)}</p>
                            </div>
                            <div className="rounded-xl bg-rose-50 px-3 py-2 text-rose-700">
                                <p className="text-[11px] text-rose-600/80">整体使用率</p>
                                <p className="text-lg font-bold">{totalUsageRate}%</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                    <div className="grid gap-4 xl:grid-cols-12">
                        <div className="h-[360px] xl:col-span-7">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={creditByBankType} margin={{ left: 8, right: 28, top: 16, bottom: 8 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f3caca" />
                                    <XAxis dataKey="bankType" tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                                    <YAxis yAxisId="amount" tickFormatter={(value) => `${value}亿`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                                    <YAxis yAxisId="rate" orientation="right" tickFormatter={(value) => `${value}%`} tick={{ fill: "#7f1d1d", fontSize: 12 }} />
                                    <Tooltip content={<CreditTooltip />} />
                                    <Legend formatter={formatCreditLegend} />
                                    <Bar yAxisId="amount" dataKey="creditLimit" fill="#93c5fd" radius={[8, 8, 0, 0]} barSize={22} />
                                    <Bar yAxisId="amount" dataKey="usedLimit" fill="#2563eb" radius={[8, 8, 0, 0]} barSize={22} />
                                    <Line yAxisId="rate" type="monotone" dataKey="usageRate" stroke="#e11d48" strokeWidth={3} dot={{ r: 4, fill: "#e11d48" }} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="xl:col-span-5">
                            <div className="mb-3 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-rose-700">
                                    <div className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-4 w-4" />额度不足</div>
                                    <p className="mt-2 text-3xl font-extrabold">{insufficientLimitCount}</p>
                                    <p className="mt-1 text-muted-foreground">使用率高且储备需求超过可用额度</p>
                                </div>
                                <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-amber-700">
                                    <div className="flex items-center gap-2 font-semibold"><CircleSlash2 className="h-4 w-4" />有额度用不出</div>
                                    <p className="mt-2 text-3xl font-extrabold">{idleLimitCount}</p>
                                    <p className="mt-1 text-muted-foreground">额度闲置，需复核准入与报价适配度</p>
                                </div>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-rose-50/80 hover:bg-rose-50/80">
                                        <TableHead>银行</TableHead>
                                        <TableHead className="text-right">授信/已用</TableHead>
                                        <TableHead className="text-right">使用率</TableHead>
                                        <TableHead>识别结果</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {creditRanking.map((item) => (
                                        <TableRow key={item.bankName}>
                                            <TableCell>
                                                <p className="font-semibold text-foreground">{item.bankName}</p>
                                                <p className="text-muted-foreground">{item.bankType}</p>
                                            </TableCell>
                                            <TableCell className="text-right">{item.creditLimit}/{item.usedLimit}亿</TableCell>
                                            <TableCell className="text-right font-semibold">{item.usageRate}%</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={statusClass[item.status]}>{item.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border border-border bg-white/90">
                <CardHeader className="pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <ShieldCheck className="h-5 w-5 text-emerald-600" /> 黑白名单分析
                            </CardTitle>
                            <p className="mt-2 text-sm text-muted-foreground">准入结构分析统计白名单银行数量、类型分布及评级分布，并以列表展示黑名单银行。</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                                <CheckCircle2 className="h-3 w-3" /> 白名单 {whiteListBanks.length} 家
                            </Badge>
                            <Badge variant="outline" className="border-rose-200 bg-rose-50 text-rose-700">
                                <CircleSlash2 className="h-3 w-3" /> 黑名单 {blackListBanks.length} 家
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                    <div className="grid gap-4 xl:grid-cols-12">
                        <div className="h-[300px] rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3 xl:col-span-5">
                            <p className="px-1 pb-2 text-sm font-semibold text-emerald-800">白名单银行类型分布</p>
                            <ResponsiveContainer width="100%" height="88%">
                                <PieChart>
                                    <Pie data={whiteListTypeDistribution} dataKey="value" nameKey="name" innerRadius={54} outerRadius={92} paddingAngle={3} label={({ name, value }) => `${name} ${value}家`}>
                                        {whiteListTypeDistribution.map((item, index) => (
                                            <Cell key={item.name} fill={pieColors[index % pieColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}家`, "银行数量"]} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-[300px] rounded-2xl border border-blue-100 bg-blue-50/40 p-3 xl:col-span-3">
                            <p className="px-1 pb-2 text-sm font-semibold text-blue-800">白名单评级分布</p>
                            <ResponsiveContainer width="100%" height="88%">
                                <BarChart data={whiteListRatingDistribution} margin={{ left: 0, right: 10, top: 10, bottom: 8 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                                    <XAxis dataKey="rating" tick={{ fill: "#1e3a8a", fontSize: 12 }} />
                                    <YAxis allowDecimals={false} tickFormatter={(value) => `${value}家`} tick={{ fill: "#1e3a8a", fontSize: 12 }} />
                                    <Tooltip formatter={(value) => [`${value}家`, "银行数量"]} />
                                    <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} barSize={28} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 xl:col-span-4">
                            <p className="text-sm font-semibold text-slate-800">准入结构摘要</p>
                            <div className="mt-3 space-y-3">
                                {whiteListTypeDistribution.map((item, index) => (
                                    <div key={item.name}>
                                        <div className="mb-1 flex justify-between text-muted-foreground">
                                            <span>{item.name}</span>
                                            <span>{item.value}家 · {Math.round((item.value / whiteListBanks.length) * 100)}%</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-white">
                                            <div className="h-2 rounded-full" style={{ width: `${(item.value / whiteListBanks.length) * 100}%`, backgroundColor: pieColors[index % pieColors.length] }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-rose-100">
                        <div className="flex items-center justify-between border-b border-rose-100 bg-rose-50/70 px-4 py-3">
                            <p className="font-semibold text-rose-800">黑名单列表</p>
                            <p className="text-muted-foreground">触发后限制新增交易并纳入持续跟踪</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-white hover:bg-white">
                                    <TableHead>银行名称</TableHead>
                                    <TableHead>银行类型</TableHead>
                                    <TableHead>列入原因</TableHead>
                                    <TableHead>列入日期</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {blackListBanks.map((bank) => (
                                    <TableRow key={bank.bankName} className="bg-rose-50/40 hover:bg-rose-50/70">
                                        <TableCell className="font-semibold text-foreground">{bank.bankName}</TableCell>
                                        <TableCell className="text-muted-foreground">{bank.bankType}</TableCell>
                                        <TableCell>{bank.reason}</TableCell>
                                        <TableCell>{bank.listedDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

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