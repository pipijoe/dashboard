import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

function SortHeader({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-muted/70 hover:text-foreground">
      {label}
      <ArrowDownUp className="h-3 w-3" />
    </button>
  );
}

export function FundConfigurationScreen() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>交易信息</CardTitle>
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
            <table className="min-w-[900px] text-sm">
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
    </section>
  );
}
