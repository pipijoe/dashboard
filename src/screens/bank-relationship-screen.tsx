import { type ReactNode, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";
import { Building2, ChartColumnIncreasing, HandCoins, Landmark, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DepositTrendItem = {
  month: string;
  totalDeposit: number;
};

type CreditBusiness = {
  product: string;
  balance: number;
  amount: number;
  rate: number;
  term: string;
};

type CreditLine = {
  totalLine: number;
  remainingLine: number;
  usedLine: number;
  loanUsed: number;
  guaranteeUsed: number;
};

type MemberRankingItem = {
  member: string;
  amount: number;
};

type QuoteItem = {
  product: "存款" | "同业存款" | "贷款";
  tenor: string;
  bankRate: number;
  marketBenchmark: number;
  feeRate?: number;
};

type Score = {
  businessCooperation: number;
  businessCompetitiveness: number;
  riskStatus: number;
  globalNetwork: number;
};

type BankProfile = {
  name: string;
  category: string;
  type: string;
  riskBank: boolean;
  deposit: DepositTrendItem[];
  creditBusiness: CreditBusiness[];
  creditLine: CreditLine;
  rankings: {
    deposit: MemberRankingItem[];
    loan: MemberRankingItem[];
    credit: MemberRankingItem[];
  };
  quotes: QuoteItem[];
  score: Score;
};

const memberUnits = [
  "华东分公司",
  "华南分公司",
  "华北分公司",
  "西南分公司",
  "西北分公司",
  "华中分公司",
  "东北分公司",
  "国际业务中心",
  "供应链事业部",
  "工程总包事业部",
];

function buildRanking(baseAmount: number, step: number): MemberRankingItem[] {
  return memberUnits.map((member, index) => ({
    member,
    amount: Number((baseAmount - index * step).toFixed(1)),
  }));
}

const banks: BankProfile[] = [
  {
    name: "交通银行",
    category: "一类银行",
    type: "国有商业银行",
    riskBank: false,
    deposit: [
      { month: "2025-06", totalDeposit: 74.8 },
      { month: "2025-07", totalDeposit: 76.2 },
      { month: "2025-08", totalDeposit: 75.6 },
      { month: "2025-09", totalDeposit: 78.1 },
      { month: "2025-10", totalDeposit: 79.4 },
      { month: "2025-11", totalDeposit: 80.2 },
      { month: "2025-12", totalDeposit: 82.6 },
      { month: "2026-01", totalDeposit: 81.3 },
      { month: "2026-02", totalDeposit: 80.8 },
      { month: "2026-03", totalDeposit: 82.7 },
      { month: "2026-04", totalDeposit: 84.5 },
      { month: "2026-05", totalDeposit: 86.1 },
    ],
    creditBusiness: [
      { product: "贷款", balance: 66.2, amount: 18.1, rate: 2.98, term: "1Y以内 42%" },
      { product: "保理", balance: 8.7, amount: 3.2, rate: 3.24, term: "1-3Y 46%" },
      { product: "保函", balance: 12.4, amount: 5.6, rate: 1.12, term: "3Y以上 12%" },
      { product: "信用证", balance: 9.8, amount: 4.1, rate: 1.35, term: "6M以内 37%" },
    ],
    creditLine: {
      totalLine: 180,
      remainingLine: 62.5,
      usedLine: 117.5,
      loanUsed: 88,
      guaranteeUsed: 29.5,
    },
    rankings: {
      deposit: buildRanking(31.2, 1.5),
      loan: buildRanking(27.6, 1.2),
      credit: buildRanking(39.8, 1.8),
    },
    quotes: [
      { product: "存款", tenor: "7D", bankRate: 1.65, marketBenchmark: 1.52 },
      { product: "存款", tenor: "1M", bankRate: 1.78, marketBenchmark: 1.62 },
      { product: "同业存款", tenor: "3M", bankRate: 1.92, marketBenchmark: 1.8 },
      { product: "贷款", tenor: "1Y", bankRate: 3.05, marketBenchmark: 3.1, feeRate: 0.18 },
      { product: "贷款", tenor: "3Y", bankRate: 3.3, marketBenchmark: 3.45, feeRate: 0.2 },
    ],
    score: {
      businessCooperation: 92,
      businessCompetitiveness: 88,
      riskStatus: 84,
      globalNetwork: 90,
    },
  },
  {
    name: "招商银行",
    category: "二类银行",
    type: "股份制商业银行",
    riskBank: false,
    deposit: [
      { month: "2025-06", totalDeposit: 51.5 },
      { month: "2025-07", totalDeposit: 52.3 },
      { month: "2025-08", totalDeposit: 53.1 },
      { month: "2025-09", totalDeposit: 54.8 },
      { month: "2025-10", totalDeposit: 55.6 },
      { month: "2025-11", totalDeposit: 56.2 },
      { month: "2025-12", totalDeposit: 57.4 },
      { month: "2026-01", totalDeposit: 56.8 },
      { month: "2026-02", totalDeposit: 57.9 },
      { month: "2026-03", totalDeposit: 58.6 },
      { month: "2026-04", totalDeposit: 60.4 },
      { month: "2026-05", totalDeposit: 61.7 },
    ],
    creditBusiness: [
      { product: "贷款", balance: 40.6, amount: 15.8, rate: 3.1, term: "1Y以内 36%" },
      { product: "保理", balance: 6.1, amount: 2.9, rate: 3.42, term: "1-3Y 40%" },
      { product: "保函", balance: 7.8, amount: 3.5, rate: 1.18, term: "3Y以上 15%" },
      { product: "信用证", balance: 5.4, amount: 2.1, rate: 1.4, term: "6M以内 41%" },
    ],
    creditLine: {
      totalLine: 120,
      remainingLine: 40.7,
      usedLine: 79.3,
      loanUsed: 59.2,
      guaranteeUsed: 20.1,
    },
    rankings: {
      deposit: buildRanking(24.4, 1.1),
      loan: buildRanking(19.2, 0.9),
      credit: buildRanking(26.6, 1.2),
    },
    quotes: [
      { product: "存款", tenor: "7D", bankRate: 1.62, marketBenchmark: 1.52 },
      { product: "同业存款", tenor: "1M", bankRate: 1.76, marketBenchmark: 1.62 },
      { product: "同业存款", tenor: "3M", bankRate: 1.88, marketBenchmark: 1.8 },
      { product: "贷款", tenor: "1Y", bankRate: 3.15, marketBenchmark: 3.1, feeRate: 0.22 },
      { product: "贷款", tenor: "3Y", bankRate: 3.35, marketBenchmark: 3.45, feeRate: 0.25 },
    ],
    score: {
      businessCooperation: 84,
      businessCompetitiveness: 87,
      riskStatus: 81,
      globalNetwork: 78,
    },
  },
  {
    name: "某区域城商行A",
    category: "三类银行",
    type: "城商行",
    riskBank: true,
    deposit: [
      { month: "2025-06", totalDeposit: 23.4 },
      { month: "2025-07", totalDeposit: 22.9 },
      { month: "2025-08", totalDeposit: 22.1 },
      { month: "2025-09", totalDeposit: 21.7 },
      { month: "2025-10", totalDeposit: 21.2 },
      { month: "2025-11", totalDeposit: 20.8 },
      { month: "2025-12", totalDeposit: 20.5 },
      { month: "2026-01", totalDeposit: 19.8 },
      { month: "2026-02", totalDeposit: 19.4 },
      { month: "2026-03", totalDeposit: 18.9 },
      { month: "2026-04", totalDeposit: 18.2 },
      { month: "2026-05", totalDeposit: 17.9 },
    ],
    creditBusiness: [
      { product: "贷款", balance: 12.8, amount: 6.2, rate: 3.9, term: "1Y以内 58%" },
      { product: "保理", balance: 1.7, amount: 1.2, rate: 4.25, term: "1-3Y 31%" },
      { product: "保函", balance: 2.1, amount: 1.6, rate: 1.58, term: "3Y以上 11%" },
      { product: "信用证", balance: 1.2, amount: 0.8, rate: 1.75, term: "6M以内 63%" },
    ],
    creditLine: {
      totalLine: 36,
      remainingLine: 8.4,
      usedLine: 27.6,
      loanUsed: 20.8,
      guaranteeUsed: 6.8,
    },
    rankings: {
      deposit: buildRanking(9.8, 0.5),
      loan: buildRanking(7.5, 0.36),
      credit: buildRanking(11.4, 0.58),
    },
    quotes: [
      { product: "存款", tenor: "7D", bankRate: 1.8, marketBenchmark: 1.52 },
      { product: "同业存款", tenor: "1M", bankRate: 1.98, marketBenchmark: 1.62 },
      { product: "同业存款", tenor: "3M", bankRate: 2.2, marketBenchmark: 1.8 },
      { product: "贷款", tenor: "1Y", bankRate: 4.05, marketBenchmark: 3.1, feeRate: 0.4 },
      { product: "贷款", tenor: "3Y", bankRate: 4.4, marketBenchmark: 3.45, feeRate: 0.48 },
    ],
    score: {
      businessCooperation: 58,
      businessCompetitiveness: 62,
      riskStatus: 54,
      globalNetwork: 45,
    },
  },
];

const scoreWeights = {
  businessCooperation: 0.4,
  businessCompetitiveness: 0.3,
  riskStatus: 0.2,
  globalNetwork: 0.1,
};

const depositChartConfig = {
  totalDeposit: { label: "存款总额", color: "var(--chart-1)" },
} satisfies ChartConfig;

const loanChartConfig = {
  balance: { label: "余额", color: "var(--chart-3)" },
  amount: { label: "发生额", color: "var(--chart-4)" },
} satisfies ChartConfig;

const creditChartConfig = {
  loanUsed: { label: "贷款占用", color: "var(--chart-1)" },
  guaranteeUsed: { label: "保函占用", color: "var(--chart-5)" },
} satisfies ChartConfig;

const scoreChartConfig = {
  value: { label: "评分", color: "var(--chart-2)" },
} satisfies ChartConfig;

function formatMoney(value: number) {
  return `${value.toFixed(1)} 亿元`;
}

function computeLabel(total: number) {
  if (total >= 85) {
    return "战略核心银行";
  }
  if (total >= 70) {
    return "重点合作银行";
  }

  return "观察银行";
}

function getHealthTone(score: number) {
  if (score >= 85) {
    return "text-emerald-700 bg-emerald-50 border-emerald-200";
  }
  if (score >= 70) {
    return "text-amber-700 bg-amber-50 border-amber-200";
  }

  return "text-rose-700 bg-rose-50 border-rose-200";
}

type BusinessSectionProps = {
  title: string;
  icon: ReactNode;
  summary: ReactNode;
  rankingData: MemberRankingItem[];
};

function BusinessSection({ title, icon, summary, rankingData }: BusinessSectionProps) {
  return (
    <Card className="border border-border bg-card/95">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid items-stretch gap-4 lg:grid-cols-[96px_minmax(0,1.6fr)_minmax(280px,1fr)]">
        <div className="flex h-full items-start justify-center">
          <div className="rounded-xl border border-border bg-muted/40 p-4 text-primary shadow-sm">{icon}</div>
        </div>

        <div className="h-full space-y-3">{summary}</div>

        <div className="flex h-full flex-col rounded-lg border border-border p-3">
          <p className="mb-2 text-sm font-medium">前十成员单位业务金额排行</p>
          <ul className="space-y-1 overflow-auto text-xs">
            {rankingData.map((item, index) => (
              <li key={item.member} className="flex items-center justify-between rounded bg-muted/50 px-2 py-1.5">
                <span>
                  {index + 1}. {item.member}
                </span>
                <span className="font-medium text-muted-foreground">{formatMoney(item.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function BankRelationshipScreen() {
  const [selectedBankName, setSelectedBankName] = useState(banks[0].name);
  const [productFilter, setProductFilter] = useState<QuoteItem["product"] | "全部">("全部");
  const [tenorFilter, setTenorFilter] = useState("全部");

  const selectedBank = banks.find((bank) => bank.name === selectedBankName) ?? banks[0];

  const scoreTotal =
    selectedBank.score.businessCooperation * scoreWeights.businessCooperation +
    selectedBank.score.businessCompetitiveness * scoreWeights.businessCompetitiveness +
    selectedBank.score.riskStatus * scoreWeights.riskStatus +
    selectedBank.score.globalNetwork * scoreWeights.globalNetwork;

  const quoteTenors = useMemo(() => {
    return Array.from(new Set(selectedBank.quotes.map((item) => item.tenor)));
  }, [selectedBank.quotes]);

  const filteredQuotes = selectedBank.quotes.filter((item) => {
    const productPass = productFilter === "全部" || item.product === productFilter;
    const tenorPass = tenorFilter === "全部" || item.tenor === tenorFilter;

    return productPass && tenorPass;
  });

  const rankedBanks = banks
    .map((bank) => {
      const total =
        bank.score.businessCooperation * scoreWeights.businessCooperation +
        bank.score.businessCompetitiveness * scoreWeights.businessCompetitiveness +
        bank.score.riskStatus * scoreWeights.riskStatus +
        bank.score.globalNetwork * scoreWeights.globalNetwork;

      return {
        name: bank.name,
        total,
        label: computeLabel(total),
      };
    })
    .sort((left, right) => right.total - left.total);

  const radarData = [
    { dimension: "业务合作紧密度", value: selectedBank.score.businessCooperation },
    { dimension: "业务竞争力", value: selectedBank.score.businessCompetitiveness },
    { dimension: "综合风险状况", value: selectedBank.score.riskStatus },
    { dimension: "全球网络布局", value: selectedBank.score.globalNetwork },
  ];

  const creditUsageData = [
    { name: "loanUsed", value: selectedBank.creditLine.loanUsed, fill: "var(--color-loanUsed)" },
    { name: "guaranteeUsed", value: selectedBank.creditLine.guaranteeUsed, fill: "var(--color-guaranteeUsed)" },
  ];
  const creditUsageRate = (selectedBank.creditLine.usedLine / selectedBank.creditLine.totalLine) * 100;
  const quoteWinCount = selectedBank.quotes.filter((item) => item.bankRate <= item.marketBenchmark).length;
  const quoteWinRate = (quoteWinCount / selectedBank.quotes.length) * 100;
  const selectedCurrentDeposit = selectedBank.deposit[selectedBank.deposit.length - 1]?.totalDeposit ?? 0;
  const selectedFirstDeposit = selectedBank.deposit[0]?.totalDeposit ?? 0;
  const groupCurrentDeposit = banks.reduce((total, bank) => {
    const latestDeposit = bank.deposit[bank.deposit.length - 1]?.totalDeposit ?? 0;

    return total + latestDeposit;
  }, 0);
  const depositShareRate = groupCurrentDeposit > 0 ? (selectedCurrentDeposit / groupCurrentDeposit) * 100 : 0;
  const depositYearGrowthRate =
    selectedFirstDeposit > 0 ? ((selectedCurrentDeposit - selectedFirstDeposit) / selectedFirstDeposit) * 100 : 0;
  const healthTone = getHealthTone(scoreTotal);

  return (
    <section className="space-y-4">
      <Card className="border border-border bg-card/95">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">银行选择与入口</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedBankName} onValueChange={setSelectedBankName}>
              <SelectTrigger className="w-56 bg-white">
                <SelectValue placeholder="请选择银行" />
              </SelectTrigger>
              <SelectContent>
                {banks.map((bank) => (
                  <SelectItem key={bank.name} value={bank.name}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
              {selectedBank.category} / {selectedBank.type}
            </span>
            <span
              className={`rounded-md px-2 py-1 text-xs font-medium ${
                selectedBank.riskBank ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {selectedBank.riskBank ? "风险银行" : "正常银行"}
            </span>
            <span className={`rounded-md border px-2 py-1 text-xs font-medium ${healthTone}`}>
              关系健康度：{computeLabel(scoreTotal)}
            </span>
          </div>
          <Link
            to="/screens/bank-directory"
            className="rounded-md border border-primary bg-primary px-3 py-2 text-sm text-primary-foreground"
          >
            展示全部银行（合作银行名录）
          </Link>
        </CardContent>
      </Card>

      <BusinessSection
        title="存款业务统计"
        icon={<Landmark className="h-10 w-10" />}
        rankingData={selectedBank.rankings.deposit}
        summary={
          <>
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
              <div className="h-[240px] rounded-lg border border-border p-2">
                <ChartContainer config={depositChartConfig} className="h-full w-full">
                  <LineChart data={selectedBank.deposit} margin={{ left: 4, right: 12, top: 12 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} minTickGap={12} />
                    <YAxis tickLine={false} axisLine={false} width={42} />
                    <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value} 亿元`} />} />
                    <Line
                      type="monotone"
                      dataKey="totalDeposit"
                      stroke="var(--color-totalDeposit)"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              <div className="flex flex-col justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div>
                  <p className="text-xs text-muted-foreground">当前集团在该行存款份额</p>
                  <p className="mt-2 text-3xl font-semibold text-primary">{depositShareRate.toFixed(1)}%</p>
                  <p className="mt-1 text-xs text-muted-foreground">该行存款 / 集团合作银行存款总额</p>
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>当前存款：{formatMoney(selectedCurrentDeposit)}</p>
                  <p>集团合计：{formatMoney(groupCurrentDeposit)}</p>
                  <p>近一年变化：{depositYearGrowthRate >= 0 ? "+" : ""}{depositYearGrowthRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/70 text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 text-left">月份</th>
                  <th className="px-2 py-2 text-right">存款总额</th>
                </tr>
              </thead>
              <tbody>
                {selectedBank.deposit.map((item) => (
                  <tr key={item.month} className="border-b border-border/70 transition-colors hover:bg-muted/40">
                    <td className="px-2 py-2">{item.month}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.totalDeposit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      />

      <BusinessSection
        title="贷款业务统计"
        icon={<HandCoins className="h-10 w-10" />}
        rankingData={selectedBank.rankings.loan}
        summary={
          <>
            <div className="h-[240px] rounded-lg border border-border p-2">
              <ChartContainer config={loanChartConfig} className="h-full w-full">
                <BarChart data={selectedBank.creditBusiness}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="product" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={36} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent formatter={(value) => `${value} 亿元`} />}
                  />
                  <Bar dataKey="balance" fill="var(--color-balance)" radius={4} />
                  <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
                </BarChart>
              </ChartContainer>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/70 text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 text-left">信贷业务</th>
                  <th className="px-2 py-2 text-right">余额</th>
                  <th className="px-2 py-2 text-right">发生额</th>
                  <th className="px-2 py-2 text-right">利率/费率</th>
                  <th className="px-2 py-2 text-right">期限分布</th>
                </tr>
              </thead>
              <tbody>
                {selectedBank.creditBusiness.map((item) => (
                  <tr key={item.product} className="border-b border-border/70 transition-colors hover:bg-muted/40">
                    <td className="px-2 py-2">{item.product}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.balance)}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.amount)}</td>
                    <td className="px-2 py-2 text-right">{item.rate.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-right">{item.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        }
      />

      <BusinessSection
        title="授信用信统计"
        icon={<ShieldCheck className="h-10 w-10" />}
        rankingData={selectedBank.rankings.credit}
        summary={
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">授信总额</p>
                <p className="text-xl font-semibold">{formatMoney(selectedBank.creditLine.totalLine)}</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">剩余额度</p>
                <p className="text-xl font-semibold">{formatMoney(selectedBank.creditLine.remainingLine)}</p>
              </div>
            </div>
            <div className="h-[220px] rounded-lg border border-border p-2">
              <ChartContainer config={creditChartConfig} className="h-full w-full">
                <PieChart>
                  <Pie data={creditUsageData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={84}>
                    {creditUsageData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${value} 亿元`} />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">用信余额（当前已使用授信金额）</p>
              <p className="text-xl font-semibold">{formatMoney(selectedBank.creditLine.usedLine)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                构成：贷款余额 {formatMoney(selectedBank.creditLine.loanUsed)} + 保函占用额 {formatMoney(selectedBank.creditLine.guaranteeUsed)}
              </p>
              <p className="mt-2 text-xs font-medium text-foreground">用信率：{creditUsageRate.toFixed(1)}%</p>
            </div>
          </>
        }
      />

      <Card className="border border-border bg-card/95">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">银行同业报价（可按产品/期限对比）</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Select
              value={productFilter}
              onValueChange={(value) => setProductFilter(value as QuoteItem["product"] | "全部")}
            >
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="产品类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部">全部产品</SelectItem>
                <SelectItem value="存款">存款</SelectItem>
                <SelectItem value="同业存款">同业存款</SelectItem>
                <SelectItem value="贷款">贷款</SelectItem>
              </SelectContent>
            </Select>

            <Select value={tenorFilter} onValueChange={setTenorFilter}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="期限" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="全部">全部期限</SelectItem>
                {quoteTenors.map((tenor) => (
                  <SelectItem key={tenor} value={tenor}>
                    {tenor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-muted/70 text-muted-foreground">
              <tr>
                <th className="px-2 py-2 text-left">产品</th>
                <th className="px-2 py-2 text-right">期限</th>
                <th className="px-2 py-2 text-right">银行报价</th>
                <th className="px-2 py-2 text-right">市场基准</th>
                <th className="px-2 py-2 text-right">费率</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((item, index) => (
                  <tr
                    key={`${item.product}-${item.tenor}-${index}`}
                    className="border-b border-border/70 transition-colors hover:bg-muted/40"
                  >
                    <td className="px-2 py-2">{item.product}</td>
                    <td className="px-2 py-2 text-right">{item.tenor}</td>
                    <td
                      className={`px-2 py-2 text-right font-medium ${
                        item.bankRate <= item.marketBenchmark ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {item.bankRate.toFixed(2)}%
                    </td>
                    <td className="px-2 py-2 text-right">{item.marketBenchmark.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-right">
                      {typeof item.feeRate === "number" ? `${item.feeRate.toFixed(2)}%` : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-2 py-6 text-center text-sm text-muted-foreground">
                    当前筛选条件下暂无报价，请尝试切换产品或期限。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="border border-border bg-card/95">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">银行画像与评分体系</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-3">
            <div className="rounded-lg border border-border p-3 text-sm text-muted-foreground">
              基础业务得分 = 业务合作紧密度 × 40% + 业务竞争力 × 30% + 综合风险状况 × 20% + 全球网络布局 × 10%
            </div>
            <div className="h-[300px] rounded-lg border border-border p-2">
              <ChartContainer config={scoreChartConfig} className="h-full w-full">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: "#334155", fontSize: 12 }} />
                  <Radar dataKey="value" stroke="var(--color-value)" fill="var(--color-value)" fillOpacity={0.35} />
                  <ChartTooltip formatter={(value) => `${value} 分`} />
                </RadarChart>
              </ChartContainer>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">当前银行基础业务得分</p>
              <p className="text-3xl font-semibold">{scoreTotal.toFixed(1)}</p>
              <p className="mt-1 text-xs text-muted-foreground">标签：{computeLabel(scoreTotal)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">报价竞争力</p>
                <p className="text-2xl font-semibold">{quoteWinRate.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">低于/等于市场基准笔数</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs text-muted-foreground">授信利用率</p>
                <p className="text-2xl font-semibold">{creditUsageRate.toFixed(0)}%</p>
                <p className="text-xs text-muted-foreground">用信余额 / 授信总额</p>
              </div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="mb-2 text-sm font-medium">合作银行排名（按基础业务得分）</p>
              <ul className="space-y-2 text-sm">
                {rankedBanks.map((item, index) => (
                  <li key={item.name} className="flex items-center justify-between rounded bg-muted/50 px-2 py-1.5">
                    <span>
                      {index + 1}. {item.name}
                    </span>
                    <span className="text-muted-foreground">
                      {item.total.toFixed(1)} / {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground">
              <div className="mb-2 flex items-center gap-2 text-foreground">
                <ChartColumnIncreasing className="h-4 w-4" />
                评分维度说明
              </div>
              <p>业务合作紧密度：银企业务协同深度与合作频次。</p>
              <p>业务竞争力：产品报价、效率与综合服务能力。</p>
              <p>综合风险状况：授信稳定性、运营及合规风险水平。</p>
              <p>全球网络布局：境内外机构覆盖与跨境服务能力。</p>
              <div className="mt-2 flex items-center gap-2 text-foreground">
                <Building2 className="h-4 w-4" />
                分值区间：90-100 领先，70-89 稳健，70以下 观察。
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
