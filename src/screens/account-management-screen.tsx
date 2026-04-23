import { BlockGrid } from "@/components/block-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const blocks = ["账户总览", "账户分类", "账户余额趋势", "久悬账户", "开户销户统计", "账户风险分级"];

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
  }
];

export function AccountManagementScreen() {
  return (
    <section className="grid grid-cols-12 gap-4">
      <div className="col-span-12 xl:col-span-8">
        <BlockGrid blocks={blocks} />
      </div>
      <Card className="col-span-12 xl:col-span-4">
        <CardHeader>
          <CardTitle>交易信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
            <label className="space-y-1 text-sm text-muted-foreground">
              交易对手
              <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none ring-primary/30 focus:ring-2">
                <option>全部</option>
                <option>华东银行</option>
                <option>城市商业银行A</option>
                <option>省联社</option>
              </select>
            </label>
            <label className="space-y-1 text-sm text-muted-foreground">
              业务品种
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
            <table className="min-w-[760px] text-sm">
              <thead className="bg-muted/60 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">交易日期</th>
                  <th className="px-3 py-2 text-left font-medium">交易对手</th>
                  <th className="px-3 py-2 text-left font-medium">业务类型</th>
                  <th className="px-3 py-2 text-left font-medium">金额</th>
                  <th className="px-3 py-2 text-left font-medium">利率</th>
                  <th className="px-3 py-2 text-left font-medium">期限</th>
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

          <div className="flex justify-end">
            <button className="rounded-md border border-primary bg-primary px-3 py-1.5 text-sm text-primary-foreground transition-opacity hover:opacity-90">导出交易记录</button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
