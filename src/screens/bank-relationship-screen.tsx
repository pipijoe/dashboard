import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DepositStat = {
  type: string;
  averageBalance: number;
  endingBalance: number;
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

type QuoteItem = {
  product: "存款" | "同业存款" | "贷款";
  tenor: string;
  bankRate: number;
  marketBenchmark: number;
  feeRate?: number;
};

type Score = {
  risk: number;
  service: number;
  contribution: number;
};

type BankProfile = {
  name: string;
  category: string;
  type: string;
  riskBank: boolean;
  deposit: DepositStat[];
  creditBusiness: CreditBusiness[];
  creditLine: CreditLine;
  quotes: QuoteItem[];
  score: Score;
};

const banks: BankProfile[] = [
  {
    name: "交通银行",
    category: "一类银行",
    type: "国有商业银行",
    riskBank: false,
    deposit: [
      { type: "活期", averageBalance: 22.4, endingBalance: 23.1 },
      { type: "定期", averageBalance: 30.2, endingBalance: 31.4 },
      { type: "通知存款", averageBalance: 7.5, endingBalance: 7.2 },
      { type: "存单", averageBalance: 10.8, endingBalance: 11.1 },
      { type: "结构性存款", averageBalance: 8.6, endingBalance: 9.3 },
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
    quotes: [
      { product: "存款", tenor: "7D", bankRate: 1.65, marketBenchmark: 1.52 },
      { product: "存款", tenor: "1M", bankRate: 1.78, marketBenchmark: 1.62 },
      { product: "同业存款", tenor: "3M", bankRate: 1.92, marketBenchmark: 1.8 },
      { product: "贷款", tenor: "1Y", bankRate: 3.05, marketBenchmark: 3.1, feeRate: 0.18 },
      { product: "贷款", tenor: "3Y", bankRate: 3.3, marketBenchmark: 3.45, feeRate: 0.2 },
    ],
    score: { risk: 82, service: 86, contribution: 90 },
  },
  {
    name: "招商银行",
    category: "二类银行",
    type: "股份制商业银行",
    riskBank: false,
    deposit: [
      { type: "活期", averageBalance: 16.3, endingBalance: 17.2 },
      { type: "定期", averageBalance: 22.6, endingBalance: 23.3 },
      { type: "通知存款", averageBalance: 4.2, endingBalance: 4.1 },
      { type: "存单", averageBalance: 6.8, endingBalance: 7.6 },
      { type: "结构性存款", averageBalance: 5.1, endingBalance: 4.9 },
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
    quotes: [
      { product: "存款", tenor: "7D", bankRate: 1.62, marketBenchmark: 1.52 },
      { product: "同业存款", tenor: "1M", bankRate: 1.76, marketBenchmark: 1.62 },
      { product: "同业存款", tenor: "3M", bankRate: 1.88, marketBenchmark: 1.8 },
      { product: "贷款", tenor: "1Y", bankRate: 3.15, marketBenchmark: 3.1, feeRate: 0.22 },
      { product: "贷款", tenor: "3Y", bankRate: 3.35, marketBenchmark: 3.45, feeRate: 0.25 },
    ],
    score: { risk: 78, service: 89, contribution: 84 },
  },
  {
    name: "某区域城商行A",
    category: "三类银行",
    type: "城商行",
    riskBank: true,
    deposit: [
      { type: "活期", averageBalance: 6.4, endingBalance: 5.8 },
      { type: "定期", averageBalance: 9.1, endingBalance: 8.4 },
      { type: "通知存款", averageBalance: 1.9, endingBalance: 2.1 },
      { type: "存单", averageBalance: 2.4, endingBalance: 2.3 },
      { type: "结构性存款", averageBalance: 1.2, endingBalance: 1.1 },
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
    quotes: [
      { product: "存款", tenor: "7D", bankRate: 1.8, marketBenchmark: 1.52 },
      { product: "同业存款", tenor: "1M", bankRate: 1.98, marketBenchmark: 1.62 },
      { product: "同业存款", tenor: "3M", bankRate: 2.2, marketBenchmark: 1.8 },
      { product: "贷款", tenor: "1Y", bankRate: 4.05, marketBenchmark: 3.1, feeRate: 0.4 },
      { product: "贷款", tenor: "3Y", bankRate: 4.4, marketBenchmark: 3.45, feeRate: 0.48 },
    ],
    score: { risk: 55, service: 64, contribution: 52 },
  },
];

const scoreWeights = {
  risk: 0.3,
  service: 0.2,
  contribution: 0.5,
};

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

export function BankRelationshipScreen() {
  const [selectedBankName, setSelectedBankName] = useState(banks[0].name);
  const [productFilter, setProductFilter] = useState<QuoteItem["product"] | "全部">("全部");
  const [tenorFilter, setTenorFilter] = useState("全部");

  const selectedBank =
    banks.find((bank) => bank.name === selectedBankName) ?? banks[0];

  const scoreTotal =
    selectedBank.score.risk * scoreWeights.risk +
    selectedBank.score.service * scoreWeights.service +
    selectedBank.score.contribution * scoreWeights.contribution;

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
        bank.score.risk * scoreWeights.risk +
        bank.score.service * scoreWeights.service +
        bank.score.contribution * scoreWeights.contribution;

      return {
        name: bank.name,
        total,
        label: computeLabel(total),
      };
    })
    .sort((left, right) => right.total - left.total);

  const radarData = [
    { dimension: "风险维度", value: selectedBank.score.risk },
    { dimension: "服务能力", value: selectedBank.score.service },
    { dimension: "综合贡献", value: selectedBank.score.contribution },
  ];

  return (
    <section className="space-y-4">
      <Card className="border border-border bg-card/95">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">1区｜银行选择与入口</CardTitle>
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
                selectedBank.riskBank
                  ? "bg-red-100 text-red-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {selectedBank.riskBank ? "风险银行" : "正常银行"}
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

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-border bg-card/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">2区左｜存款业务统计</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead className="bg-muted/70 text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 text-left">存款类型</th>
                  <th className="px-2 py-2 text-right">日均存款余额</th>
                  <th className="px-2 py-2 text-right">期末余额</th>
                </tr>
              </thead>
              <tbody>
                {selectedBank.deposit.map((item) => (
                  <tr key={item.type} className="border-b border-border/70">
                    <td className="px-2 py-2">{item.type}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.averageBalance)}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">2区右｜贷款业务统计</CardTitle>
          </CardHeader>
          <CardContent>
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
                  <tr key={item.product} className="border-b border-border/70">
                    <td className="px-2 py-2">{item.product}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.balance)}</td>
                    <td className="px-2 py-2 text-right">{formatMoney(item.amount)}</td>
                    <td className="px-2 py-2 text-right">{item.rate.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-right">{item.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-border bg-card/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">3区左｜授信用信统计</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">授信总额</p>
              <p className="text-xl font-semibold">{formatMoney(selectedBank.creditLine.totalLine)}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">剩余额度</p>
              <p className="text-xl font-semibold">{formatMoney(selectedBank.creditLine.remainingLine)}</p>
            </div>
            <div className="rounded-lg border border-border p-3 sm:col-span-2">
              <p className="text-xs text-muted-foreground">
                用信余额（当前已使用授信金额）
              </p>
              <p className="text-xl font-semibold">{formatMoney(selectedBank.creditLine.usedLine)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                构成：贷款余额 {formatMoney(selectedBank.creditLine.loanUsed)} + 保函占用额{" "}
                {formatMoney(selectedBank.creditLine.guaranteeUsed)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">3区右｜银行业务报价（可按产品/期限对比）</CardTitle>
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
                {filteredQuotes.map((item, index) => (
                  <tr key={`${item.product}-${item.tenor}-${index}`} className="border-b border-border/70">
                    <td className="px-2 py-2">{item.product}</td>
                    <td className="px-2 py-2 text-right">{item.tenor}</td>
                    <td className="px-2 py-2 text-right">{item.bankRate.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-right">{item.marketBenchmark.toFixed(2)}%</td>
                    <td className="px-2 py-2 text-right">
                      {typeof item.feeRate === "number" ? `${item.feeRate.toFixed(2)}%` : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card/95">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">4区｜银行画像与评分体系</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-3">
            <div className="rounded-lg border border-border p-3 text-sm text-muted-foreground">
              评分公式：总分 = 风险维度 × 30% + 服务能力 × 20% + 综合贡献 × 50%
            </div>
            <div className="h-[300px] rounded-lg border border-border p-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" tick={{ fill: "#334155", fontSize: 12 }} />
                  <Radar
                    dataKey="value"
                    stroke="#ef4444"
                    fill="#f87171"
                    fillOpacity={0.35}
                  />
                  <Tooltip formatter={(value) => `${value} 分`} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">当前银行总分</p>
              <p className="text-3xl font-semibold">{scoreTotal.toFixed(1)}</p>
              <p className="mt-1 text-xs text-muted-foreground">标签：{computeLabel(scoreTotal)}</p>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="mb-2 text-sm font-medium">合作银行排名（按总分）</p>
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
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
