import { ArrowDownUp, ChevronLeft, ChevronRight, Download } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

function SortHeader({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-muted/70 hover:text-foreground">
      {label}
      <ArrowDownUp className="h-3 w-3" />
    </button>
  );
}

export function FundConfigurationScreen() {
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

  return (
    <section>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="space-y-4">
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
                <div className="rounded-md border border-dashed border-border px-3 py-4 text-sm text-muted-foreground">调仓收益计算功能预留中。</div>
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
