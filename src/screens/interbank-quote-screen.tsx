import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuoteRow = {
  term: string;
  shibor?: number;
  previousHigh: number;
  institutionRates: Record<string, number | null>;
};

const asOfDate = "2026年3月18日";

const institutions = ["交行", "中信", "兴业", "北京", "杭州", "宁波"] as const;

const quoteRows: QuoteRow[] = [
  { term: "7D", shibor: 1.4291, previousHigh: 1.33, institutionRates: { 交行: 0.3, 中信: null, 兴业: 1.33, 北京: null, 杭州: null, 宁波: null } },
  { term: "14D", shibor: 1.4795, previousHigh: 1.4, institutionRates: { 交行: 0.3, 中信: null, 兴业: 1.4, 北京: null, 杭州: null, 宁波: null } },
  { term: "1M", shibor: 1.5248, previousHigh: 1.49, institutionRates: { 交行: 0.3, 中信: null, 兴业: 1.4, 北京: null, 杭州: null, 宁波: 1.49 } },
  { term: "3M", shibor: 1.5358, previousHigh: 1.49, institutionRates: { 交行: 0.3, 中信: null, 兴业: 1.4, 北京: null, 杭州: null, 宁波: 1.49 } },
  { term: "6M", shibor: 1.547, previousHigh: 1.52, institutionRates: { 交行: 1.45, 中信: null, 兴业: 1.45, 北京: null, 杭州: null, 宁波: 1.52 } },
  { term: "9M", shibor: 1.558, previousHigh: 1.52, institutionRates: { 交行: 1.52, 中信: 1.52, 兴业: 1.5, 北京: null, 杭州: null, 宁波: 1.52 } },
  { term: "1Y", shibor: 1.567, previousHigh: 1.55, institutionRates: { 交行: 1.5, 中信: 1.53, 兴业: 1.5, 北京: null, 杭州: null, 宁波: 1.55 } }
];

function formatRate(value: number) {
  return value.toFixed(4);
}

function getMaxRate(row: QuoteRow) {
  return Math.max(...Object.values(row.institutionRates).filter((value): value is number => typeof value === "number"));
}

export function InterbankQuoteScreen() {
  return (
    <section className="space-y-4">
      <Card className="overflow-hidden border border-border">
        <CardHeader className="bg-black py-5 text-center text-white">
          <CardTitle className="text-4xl font-extrabold tracking-wider">{asOfDate}</CardTitle>
        </CardHeader>
        <div className="bg-orange-500 py-2 text-center text-5xl font-bold text-white">银行同业报价</div>
        <CardContent className="bg-[#efefef] p-0">
          <div className="border-b border-border bg-[#e7d8cc] py-2 text-center text-2xl font-semibold">同业/存款</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-[26px] leading-tight">
              <thead>
                <tr className="bg-[#c9c9c9]">
                  <th className="border border-[#9c9c9c] px-3 py-2">存款期限</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">Shibor</th>
                  <th className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-2">当日最高</th>
                  {institutions.map((name) => (
                    <th key={name} className="border border-[#9c9c9c] px-3 py-2">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quoteRows.map((row) => {
                  const maxRate = getMaxRate(row);

                  return (
                    <tr key={row.term} className="odd:bg-[#ececec] even:bg-[#e5e5e5]">
                      <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">{row.term}</td>
                      <td className="border border-[#9c9c9c] px-3 py-1 font-semibold text-[#1f4e79]">
                        {row.shibor ? formatRate(row.shibor) : "-"}
                      </td>
                      <td className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-1 font-bold">{formatRate(maxRate)}</td>
                      {institutions.map((name) => {
                        const rate = row.institutionRates[name];
                        const isMax = rate !== null && rate === maxRate;

                        return (
                          <td
                            key={`${row.term}-${name}`}
                            className={`border border-[#9c9c9c] px-3 py-1 font-semibold ${
                              isMax ? "bg-red-100 text-red-700" : "text-foreground"
                            }`}
                          >
                            {rate === null ? "" : formatRate(rate)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border bg-[#efefef] px-4 py-3 text-sm text-muted-foreground">
            注：每个同业期限类别中，系统会自动将最高报价标红显示。
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
