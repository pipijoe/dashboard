import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BankDirectoryRow = {
  level: string;
  bankType: string;
  banks: string[];
  riskBank: string;
};

const rows: BankDirectoryRow[] = [
  {
    level: "一类银行（8家）",
    bankType: "主要为政策性银行、国有商业银行",
    banks: [
      "国家开发银行",
      "中国进出口银行",
      "工商银行",
      "农业银行",
      "中国银行",
      "建设银行",
      "交通银行",
      "邮储银行",
    ],
    riskBank: "无",
  },
  {
    level: "二类银行（9家）",
    bankType: "主要为除一类银行以外的中大型股份制商业银行",
    banks: [
      "招商银行",
      "兴业银行",
      "浦发银行",
      "中信银行",
      "民生银行",
      "光大银行",
      "平安银行",
      "华夏银行",
      "北京银行",
    ],
    riskBank: "无",
  },
  {
    level: "三类银行（10家）",
    bankType: "主要为中小商业银行，是一二类银行的补充",
    banks: [
      "广发银行",
      "浙商银行",
      "上海银行",
      "江苏银行",
      "南京银行",
      "宁波银行",
      "徽商银行",
      "杭州银行",
      "成都银行",
      "广州银行",
    ],
    riskBank: "某区域城商行A（观察）",
  },
  {
    level: "外资银行（6家）",
    bankType: "主要为外资银行",
    banks: [
      "汇丰银行（中国）",
      "东亚银行（中国）",
      "渣打银行（中国）",
      "花旗银行（中国）",
      "三井住友银行（中国）",
      "瑞穗银行（中国）",
    ],
    riskBank: "无",
  },
];

export function BankDirectoryScreen() {
  return (
    <section className="space-y-4">
      <Card className="border border-border bg-card/95">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <CardTitle>合作银行名录</CardTitle>
          <Link
            to="/screens/bank-relationship"
            className="rounded-md border border-primary px-3 py-1.5 text-sm text-primary"
          >
            返回银行关系大屏
          </Link>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="bg-muted/70 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left">分类</th>
                <th className="px-3 py-2 text-left">银行类型</th>
                <th className="px-3 py-2 text-left">银行名单</th>
                <th className="px-3 py-2 text-left">风险银行</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.level} className="border-b border-border/70 align-top">
                  <td className="px-3 py-3 font-medium">{row.level}</td>
                  <td className="px-3 py-3">{row.bankType}</td>
                  <td className="px-3 py-3">{row.banks.join("、")}</td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        row.riskBank === "无"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.riskBank}
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
