import { ArrowDownUp, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardTopLeft from "@/screens/components/interbank/AssetOverview";
import InterbankDistribution from "@/screens/components/interbank/InterbankDistribution";

const transactionRows = [
  {
    date: "2026-04-18",
    counterparty: "华东银行",
    product: "同业活期",
    amount: "8,000.00 万元",
    rate: "1.85%",
    term: "7天",
    valueDate: "2026-04-18",
    maturityDate: "2026-04-25"
  },
  {
    date: "2026-04-15",
    counterparty: "城市商业银行A",
    product: "同业定期",
    amount: "15,000.00 万元",
    rate: "2.10%",
    term: "3个月",
    valueDate: "2026-04-16",
    maturityDate: "2026-07-16"
  },
  {
    date: "2026-04-09",
    counterparty: "省联社",
    product: "债券质押式回购",
    amount: "12,500.00 万元",
    rate: "2.22%",
    term: "14天",
    valueDate: "2026-04-10",
    maturityDate: "2026-04-24"
  },
  {
    date: "2026-04-02",
    counterparty: "沿海银行",
    product: "同业存单",
    amount: "20,000.00 万元",
    rate: "2.35%",
    term: "6个月",
    valueDate: "2026-04-03",
    maturityDate: "2026-10-03"
  },
  {
    date: "2026-03-28",
    counterparty: "农业发展银行",
    product: "拆借",
    amount: "6,800.00 万元",
    rate: "1.72%",
    term: "3天",
    valueDate: "2026-03-29",
    maturityDate: "2026-04-01"
  }
];

const interbankAssetRows = [
  {
    assetType: "同业定期存款",
    principalWan: 12000,
    rate: 0.022,
    valueDate: "2026-01-10",
    maturityDate: "2026-07-10",
    accruedInterestWan: 67.8
  },
  {
    assetType: "同业存单",
    principalWan: 8500,
    rate: 0.024,
    valueDate: "2026-02-18",
    maturityDate: "2026-10-18",
    accruedInterestWan: 34.7
  },
  {
    assetType: "债券质押式回购",
    principalWan: 6000,
    rate: 0.0195,
    valueDate: "2026-04-16",
    maturityDate: "2026-05-16",
    accruedInterestWan: 2.24
  },
  {
    assetType: "拆借",
    principalWan: 4200,
    rate: 0.0185,
    valueDate: "2026-04-20",
    maturityDate: "2026-06-20",
    accruedInterestWan: 0.64
  }
];

const financingChannelRows = [
  { channel: "政策性银行同业拆借", institution: "国家开发银行", amountWan: 12000, termDays: 30, rate: 1.72 },
  { channel: "股份行同业存单", institution: "华东银行", amountWan: 15000, termDays: 90, rate: 1.95 },
  { channel: "城商行同业借款", institution: "城市商业银行A", amountWan: 8000, termDays: 14, rate: 1.88 },
  { channel: "债券质押式回购", institution: "中央结算交易商", amountWan: 10000, termDays: 7, rate: 1.66 }
];

const financingPlanRows = [
  { name: "方案A-短期滚动", scaleWan: 12000, term: "7天×4期", annualCostRate: 1.68 },
  { name: "方案B-中期锁价", scaleWan: 12000, term: "3个月", annualCostRate: 1.86 },
  { name: "方案C-组合融资", scaleWan: 12000, term: "7天+1个月+2个月", annualCostRate: 1.74 }
];

const calculatorAsOfDate = "2026-04-23";

const ncdPositionRows = [
  {
    id: "NCD-001",
    issuer: "华东银行",
    rating: "AAA",
    termBucket: "3个月内",
    faceValueWan: 5000,
    holdingCostPrice: 99.32,
    currentFullPrice: 99.48,
    couponRate: 0.0195,
    remainingDays: 45,
    reinvestmentDays: 45
  },
  {
    id: "NCD-002",
    issuer: "城市商业银行A",
    rating: "AA+",
    termBucket: "3-6个月",
    faceValueWan: 3500,
    holdingCostPrice: 98.95,
    currentFullPrice: 99.12,
    couponRate: 0.021,
    remainingDays: 118,
    reinvestmentDays: 118
  },
  {
    id: "NCD-003",
    issuer: "沿海银行",
    rating: "AAA",
    termBucket: "6-12个月",
    faceValueWan: 2800,
    holdingCostPrice: 98.88,
    currentFullPrice: 98.71,
    couponRate: 0.0225,
    remainingDays: 226,
    reinvestmentDays: 226
  },
  {
    id: "NCD-004",
    issuer: "省联社",
    rating: "AA",
    termBucket: "3-6个月",
    faceValueWan: 2000,
    holdingCostPrice: 99.26,
    currentFullPrice: 99.34,
    couponRate: 0.0205,
    remainingDays: 160,
    reinvestmentDays: 160
  }
];

function toDate(date: string) {
  return new Date(`${date}T00:00:00`);
}

function getRemainingDays(maturityDate: string, asOfDate: string) {
  const maturity = toDate(maturityDate).getTime();
  const asOf = toDate(asOfDate).getTime();
  const diffDays = Math.ceil((maturity - asOf) / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 0);
}

function formatWan(value: number) {
  return `${value.toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} 万元`;
}

function formatRate(value: number) {
  return `${value.toFixed(2)}%`;
}

function formatSignedWan(value: number) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatWan(value)}`;
}

function SortHeader({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-muted/70 hover:text-foreground">
      {label}
      <ArrowDownUp className="h-3 w-3" />
    </button>
  );
}

export function FundConfigurationScreen() {
  const [issuerFilter, setIssuerFilter] = useState("全部");
  const [termFilter, setTermFilter] = useState("全部");
  const [ratingFilter, setRatingFilter] = useState("全部");
  const [curveShiftBp, setCurveShiftBp] = useState(0);
  const [reinvestmentRate, setReinvestmentRate] = useState(1.95);

  const realizedIncomeWan = interbankAssetRows.reduce((total, row) => total + row.accruedInterestWan, 0);
  const predictedFutureIncomeWan = interbankAssetRows.reduce((total, row) => {
    const remainingDays = getRemainingDays(row.maturityDate, calculatorAsOfDate);
    return total + (row.principalWan * row.rate * remainingDays) / 365;
  }, 0);
  const annualIncomeEstimateWan = realizedIncomeWan + predictedFutureIncomeWan;
  const channelCostRows = financingChannelRows.map((row) => ({
    ...row,
    costWan: (row.amountWan * (row.rate / 100) * row.termDays) / 365
  }));
  const minChannelRate = Math.min(...channelCostRows.map((row) => row.rate));
  const minPlanCostRate = Math.min(...financingPlanRows.map((row) => row.annualCostRate));
  const maxPlanCostRate = Math.max(...financingPlanRows.map((row) => row.annualCostRate));
  const costRange = Math.max(maxPlanCostRate - minPlanCostRate, 0.01);
  const issuerOptions = ["全部", ...Array.from(new Set(ncdPositionRows.map((row) => row.issuer)))];
  const termOptions = ["全部", ...Array.from(new Set(ncdPositionRows.map((row) => row.termBucket)))];
  const ratingOptions = ["全部", ...Array.from(new Set(ncdPositionRows.map((row) => row.rating)))];

  const filteredNcdRows = useMemo(
    () =>
      ncdPositionRows.filter((row) => {
        const matchIssuer = issuerFilter === "全部" || row.issuer === issuerFilter;
        const matchTerm = termFilter === "全部" || row.termBucket === termFilter;
        const matchRating = ratingFilter === "全部" || row.rating === ratingFilter;
        return matchIssuer && matchTerm && matchRating;
      }),
    [issuerFilter, ratingFilter, termFilter]
  );

  const adjustmentRows = useMemo(() => {
    const shiftImpact = -(curveShiftBp / 10000) * 2.2 * 100;
    return filteredNcdRows.map((row) => {
      const expectedSellPrice = row.currentFullPrice + shiftImpact;
      const capitalGainWan = ((expectedSellPrice - row.holdingCostPrice) * row.faceValueWan) / 100;
      const reinvestmentAmountWan = (expectedSellPrice * row.faceValueWan) / 100;
      const reinvestmentIncomeWan = (reinvestmentAmountWan * (reinvestmentRate / 100) * row.reinvestmentDays) / 365;
      const remainingCouponWan = (row.faceValueWan * row.couponRate * row.remainingDays) / 365;
      const netContributionWan = capitalGainWan + reinvestmentIncomeWan - remainingCouponWan;

      return {
        ...row,
        expectedSellPrice,
        capitalGainWan,
        reinvestmentAmountWan,
        reinvestmentIncomeWan,
        remainingCouponWan,
        netContributionWan
      };
    });
  }, [curveShiftBp, filteredNcdRows, reinvestmentRate]);

  const totals = useMemo(() => {
    return adjustmentRows.reduce(
      (acc, row) => {
        acc.faceValueWan += row.faceValueWan;
        acc.reinvestmentAmountWan += row.reinvestmentAmountWan;
        acc.capitalGainWan += row.capitalGainWan;
        acc.reinvestmentIncomeWan += row.reinvestmentIncomeWan;
        acc.remainingCouponWan += row.remainingCouponWan;
        acc.netContributionWan += row.netContributionWan;
        return acc;
      },
      {
        faceValueWan: 0,
        reinvestmentAmountWan: 0,
        capitalGainWan: 0,
        reinvestmentIncomeWan: 0,
        remainingCouponWan: 0,
        netContributionWan: 0
      }
    );
  }, [adjustmentRows]);
  const avgExpectedSellPrice =
    totals.faceValueWan > 0 ? (totals.reinvestmentAmountWan / totals.faceValueWan) * 100 : 0;

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
            <DashboardTopLeft />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
              <CardTitle>交易信息</CardTitle>
              <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                <Download className="h-4 w-4" />
                下载
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm text-muted-foreground">
                  交易对手筛选
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2">
                    <option>全部</option>
                    <option>华东银行</option>
                    <option>城市商业银行A</option>
                    <option>省联社</option>
                    <option>沿海银行</option>
                    <option>农业发展银行</option>
                  </select>
                </label>
                <label className="space-y-1 text-sm text-muted-foreground">
                  业务品种筛选
                  <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2">
                    <option>全部</option>
                    <option>同业活期</option>
                    <option>同业定期</option>
                    <option>同业存单</option>
                    <option>拆借</option>
                    <option>债券质押式回购</option>
                    <option>票据交易</option>
                  </select>
                </label>
              </div>

              <div className="overflow-auto rounded-md border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">
                        <SortHeader label="交易日期" />
                      </th>
                      <th className="px-3 py-2 text-left font-medium">交易对手</th>
                      <th className="px-3 py-2 text-left font-medium">业务类型</th>
                      <th className="px-3 py-2 text-left font-medium">
                        <SortHeader label="金额" />
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        <SortHeader label="利率" />
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        <SortHeader label="期限" />
                      </th>
                      <th className="px-3 py-2 text-left font-medium">起息日</th>
                      <th className="px-3 py-2 text-left font-medium">到期日</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionRows.map((row) => (
                      <tr key={`${row.date}-${row.counterparty}-${row.product}`} className="border-t border-border">
                        <td className="px-3 py-2">{row.date}</td>
                        <td className="px-3 py-2">{row.counterparty}</td>
                        <td className="px-3 py-2">{row.product}</td>
                        <td className="px-3 py-2">{row.amount}</td>
                        <td className="px-3 py-2">{row.rate}</td>
                        <td className="px-3 py-2">{row.term}</td>
                        <td className="px-3 py-2">{row.valueDate}</td>
                        <td className="px-3 py-2">{row.maturityDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">共 25 条记录，当前第 1 / 5 页</p>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                    <ChevronLeft className="h-4 w-4" />
                    上一页
                  </button>
                  <button className="rounded-md border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground">1</button>
                  <button className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">2</button>
                  <button className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">3</button>
                  <button className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary">
                    下一页
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>融资方案</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="channel-analysis" className="w-full">
                <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
                  <TabsTrigger value="channel-analysis">融资渠道分析</TabsTrigger>
                  <TabsTrigger value="plan-comparison">融资成本对比</TabsTrigger>
                </TabsList>

                <TabsContent value="channel-analysis" className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    通过报价系统取值对比各金融机构同业利率，自动计算渠道成本并将最低利率项标红高亮展示。
                  </p>
                  <div className="overflow-auto rounded-md border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/60 text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">融资渠道</th>
                          <th className="px-3 py-2 text-left font-medium">金融机构</th>
                          <th className="px-3 py-2 text-left font-medium">融资规模</th>
                          <th className="px-3 py-2 text-left font-medium">期限</th>
                          <th className="px-3 py-2 text-left font-medium">同业利率</th>
                          <th className="px-3 py-2 text-left font-medium">成本测算</th>
                        </tr>
                      </thead>
                      <tbody>
                        {channelCostRows.map((row) => {
                          const isBestRate = row.rate === minChannelRate;
                          return (
                            <tr key={`${row.channel}-${row.institution}`} className="border-t border-border">
                              <td className="px-3 py-2">{row.channel}</td>
                              <td className="px-3 py-2">{row.institution}</td>
                              <td className="px-3 py-2">{formatWan(row.amountWan)}</td>
                              <td className="px-3 py-2">{row.termDays} 天</td>
                              <td className={`px-3 py-2 font-medium ${isBestRate ? "text-red-600" : ""}`}>{formatRate(row.rate)}</td>
                              <td className={`px-3 py-2 font-medium ${isBestRate ? "text-red-600" : ""}`}>{formatWan(row.costWan)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="plan-comparison" className="space-y-3">
                  <p className="text-xs text-muted-foreground">从规模、期限、成本三个维度对融资方案进行比选，辅助选择最优融资路径。</p>
                  <div className="space-y-2 rounded-md border border-border p-3">
                    {financingPlanRows.map((plan) => {
                      const widthPercent = ((plan.annualCostRate - minPlanCostRate) / costRange) * 60 + 40;
                      const isBestPlan = plan.annualCostRate === minPlanCostRate;
                      return (
                        <div key={plan.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                              {plan.name}｜规模 {formatWan(plan.scaleWan)}｜期限 {plan.term}
                            </span>
                            <span className={isBestPlan ? "font-semibold text-primary" : ""}>{formatRate(plan.annualCostRate)}</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full ${isBestPlan ? "bg-primary" : "bg-slate-400"}`}
                              style={{ width: `${Math.min(widthPercent, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <InterbankDistribution />
        <Card>
          <CardHeader>
            <CardTitle>测算工具</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current-year-income" className="w-full">
              <TabsList className="h-auto w-full flex-wrap justify-start gap-1 bg-muted/60 p-1">
                <TabsTrigger value="current-year-income">当年收益测算</TabsTrigger>
                <TabsTrigger value="annual-income-estimation">全年收益匡算</TabsTrigger>
                <TabsTrigger value="position-adjustment-income">调仓收益计算</TabsTrigger>
                <TabsTrigger value="discounted-pricing">再贴现定价工具</TabsTrigger>
                <TabsTrigger value="rediscount-sell-estimation">转贴现卖出测算工具</TabsTrigger>
              </TabsList>

              <TabsContent value="current-year-income" className="space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-md border border-border bg-muted/20 p-3">
                    <p className="text-xs text-muted-foreground">已实现收益（当年已计提）</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{formatWan(realizedIncomeWan)}</p>
                  </div>
                  <div className="rounded-md border border-border bg-muted/20 p-3">
                    <p className="text-xs text-muted-foreground">未来预测收益</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{formatWan(predictedFutureIncomeWan)}</p>
                  </div>
                  <div className="rounded-md border border-border bg-primary/5 p-3">
                    <p className="text-xs text-muted-foreground">当年收益测算合计</p>
                    <p className="mt-1 text-lg font-semibold text-primary">{formatWan(annualIncomeEstimateWan)}</p>
                  </div>
                </div>

                <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                  计算逻辑（分段累加法）：当年收益 = 已实现收益 + 未来预测收益，未来收益 = Σ(单笔本金 × 合同利率 × 剩余存续天数 / 365)；
                  测算基准日：{calculatorAsOfDate}。
                </p>

                <div className="overflow-auto rounded-md border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/60 text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium">资产类型</th>
                        <th className="px-3 py-2 text-left font-medium">当前余额/面值</th>
                        <th className="px-3 py-2 text-left font-medium">执行利率/票面利率</th>
                        <th className="px-3 py-2 text-left font-medium">起息日</th>
                        <th className="px-3 py-2 text-left font-medium">到期日</th>
                        <th className="px-3 py-2 text-left font-medium">当年已计提利息</th>
                        <th className="px-3 py-2 text-left font-medium">剩余存续天数</th>
                        <th className="px-3 py-2 text-left font-medium">未来预测收益</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interbankAssetRows.map((row) => {
                        const remainingDays = getRemainingDays(row.maturityDate, calculatorAsOfDate);
                        const forecastIncome = (row.principalWan * row.rate * remainingDays) / 365;
                        return (
                          <tr key={`${row.assetType}-${row.valueDate}-${row.maturityDate}`} className="border-t border-border">
                            <td className="px-3 py-2">{row.assetType}</td>
                            <td className="px-3 py-2">{formatWan(row.principalWan)}</td>
                            <td className="px-3 py-2">{(row.rate * 100).toFixed(2)}%</td>
                            <td className="px-3 py-2">{row.valueDate}</td>
                            <td className="px-3 py-2">{row.maturityDate}</td>
                            <td className="px-3 py-2">{formatWan(row.accruedInterestWan)}</td>
                            <td className="px-3 py-2">{remainingDays} 天</td>
                            <td className="px-3 py-2">{formatWan(forecastIncome)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="annual-income-estimation">
                <div className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">全年收益匡算功能预留中。</div>
              </TabsContent>
              <TabsContent value="position-adjustment-income">
                <div className="space-y-4">
                  <div className="rounded-md border border-border bg-muted/20 p-3">
                    <p className="text-xs text-muted-foreground">
                      BI 计算器：实时测算“持有到期”与“择机卖出+再投资”差异。收益率曲线平移范围 -20BP ~ +20BP；再投资利率默认同期限 SHIBOR（示例值 1.95%）。
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                    <label className="space-y-1 text-sm text-muted-foreground">
                      发行行筛选
                      <select
                        value={issuerFilter}
                        onChange={(event) => setIssuerFilter(event.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2"
                      >
                        {issuerOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1 text-sm text-muted-foreground">
                      剩余期限筛选
                      <select
                        value={termFilter}
                        onChange={(event) => setTermFilter(event.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2"
                      >
                        {termOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1 text-sm text-muted-foreground">
                      评级筛选
                      <select
                        value={ratingFilter}
                        onChange={(event) => setRatingFilter(event.target.value)}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2"
                      >
                        {ratingOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1 text-sm text-muted-foreground xl:col-span-2">
                      收益率曲线平移：<span className="font-medium text-foreground">{curveShiftBp} BP</span>
                      <input
                        type="range"
                        min={-20}
                        max={20}
                        step={1}
                        value={curveShiftBp}
                        onChange={(event) => setCurveShiftBp(Number(event.target.value))}
                        className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                      />
                    </label>

                    <label className="space-y-1 text-sm text-muted-foreground">
                      再投资利率（%）
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={reinvestmentRate}
                        onChange={(event) => setReinvestmentRate(Number(event.target.value))}
                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-md border border-border bg-muted/20 p-3">
                      <p className="text-xs text-muted-foreground">预计卖出全价（加权）</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">{avgExpectedSellPrice.toFixed(4)}</p>
                    </div>
                    <div className="rounded-md border border-border bg-muted/20 p-3">
                      <p className="text-xs text-muted-foreground">预计资本利得</p>
                      <p className={`mt-1 text-lg font-semibold ${totals.capitalGainWan >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatSignedWan(totals.capitalGainWan)}
                      </p>
                    </div>
                    <div className="rounded-md border border-border bg-primary/5 p-3">
                      <p className="text-xs text-muted-foreground">调仓后总收益（资本利得+再投资收益）</p>
                      <p className={`mt-1 text-lg font-semibold ${totals.capitalGainWan + totals.reinvestmentIncomeWan >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatSignedWan(totals.capitalGainWan + totals.reinvestmentIncomeWan)}
                      </p>
                    </div>
                  </div>

                  <p className="rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                    资本利得 = (卖出全价 − 持仓成本) × 持仓面值；再投资收益 = 再投资金额 × 再投资利率 × 再投资天数 / 365；
                    调仓净贡献 = (资本利得 + 再投资收益) − 剩余持有期票息。测算基准日：{calculatorAsOfDate}。
                  </p>

                  <div className="overflow-auto rounded-md border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/60 text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium">存单ID</th>
                          <th className="px-3 py-2 text-left font-medium">发行行</th>
                          <th className="px-3 py-2 text-left font-medium">评级</th>
                          <th className="px-3 py-2 text-left font-medium">剩余期限</th>
                          <th className="px-3 py-2 text-left font-medium">持仓面值</th>
                          <th className="px-3 py-2 text-left font-medium">持仓成本</th>
                          <th className="px-3 py-2 text-left font-medium">预计卖出全价</th>
                          <th className="px-3 py-2 text-left font-medium">资本利得</th>
                          <th className="px-3 py-2 text-left font-medium">再投资收益</th>
                          <th className="px-3 py-2 text-left font-medium">剩余持有期票息</th>
                          <th className="px-3 py-2 text-left font-medium">调仓净贡献</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adjustmentRows.map((row) => (
                          <tr key={row.id} className="border-t border-border">
                            <td className="px-3 py-2">{row.id}</td>
                            <td className="px-3 py-2">{row.issuer}</td>
                            <td className="px-3 py-2">{row.rating}</td>
                            <td className="px-3 py-2">{row.termBucket}</td>
                            <td className="px-3 py-2">{formatWan(row.faceValueWan)}</td>
                            <td className="px-3 py-2">{row.holdingCostPrice.toFixed(4)}</td>
                            <td className="px-3 py-2">{row.expectedSellPrice.toFixed(4)}</td>
                            <td className={`px-3 py-2 font-medium ${row.capitalGainWan >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {formatSignedWan(row.capitalGainWan)}
                            </td>
                            <td className="px-3 py-2">{formatWan(row.reinvestmentIncomeWan)}</td>
                            <td className="px-3 py-2">{formatWan(row.remainingCouponWan)}</td>
                            <td className={`px-3 py-2 font-medium ${row.netContributionWan >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                              {formatSignedWan(row.netContributionWan)}
                            </td>
                          </tr>
                        ))}
                        {adjustmentRows.length === 0 ? (
                          <tr className="border-t border-border">
                            <td className="px-3 py-4 text-center text-muted-foreground" colSpan={11}>
                              当前筛选条件下无存单持仓。
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="discounted-pricing">
                <div className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">再贴现定价工具功能预留中。</div>
              </TabsContent>
              <TabsContent value="rediscount-sell-estimation">
                <div className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">转贴现卖出测算工具功能预留中。</div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
