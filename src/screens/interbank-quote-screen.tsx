import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type QuoteRow = {
  term: string;
  shibor?: number;
  previousHigh: number;
  institutionRates: Record<string, number | null>;
};

type CdRow = {
  term: string;
  stateOwnedPeak: number;
  dayChange: number;
  bigSixRate: number;
  bigSixBank: string;
  nationalStockRate: number;
  nationalStockBank: string;
  otherAaaRate: number;
  otherAaaBank: string;
  aaPlusRate: number;
  aaPlusBank: string;
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

const cdRows: CdRow[] = [
  {
    term: "1M",
    stateOwnedPeak: 1.49,
    dayChange: 0,
    bigSixRate: 1.49,
    bigSixBank: "农行",
    nationalStockRate: 1.49,
    nationalStockBank: "华夏",
    otherAaaRate: 1.53,
    otherAaaBank: "哈尔滨",
    aaPlusRate: 1.6,
    aaPlusBank: "华瑞"
  },
  {
    term: "3M",
    stateOwnedPeak: 1.49,
    dayChange: 0,
    bigSixRate: 1.49,
    bigSixBank: "农行",
    nationalStockRate: 1.49,
    nationalStockBank: "华夏/浦发",
    otherAaaRate: 1.59,
    otherAaaBank: "哈尔滨",
    aaPlusRate: 1.8,
    aaPlusBank: "温州民商"
  },
  {
    term: "6M",
    stateOwnedPeak: 1.5,
    dayChange: 0,
    bigSixRate: 1.5,
    bigSixBank: "农行",
    nationalStockRate: 1.5,
    nationalStockBank: "华夏",
    otherAaaRate: 1.62,
    otherAaaBank: "哈尔滨",
    aaPlusRate: 1.82,
    aaPlusBank: "温州民商"
  },
  {
    term: "9M",
    stateOwnedPeak: 1.52,
    dayChange: 0,
    bigSixRate: 1.52,
    bigSixBank: "农行/交行",
    nationalStockRate: 1.52,
    nationalStockBank: "华夏",
    otherAaaRate: 1.63,
    otherAaaBank: "哈尔滨",
    aaPlusRate: 1.85,
    aaPlusBank: "温州民商"
  },
  {
    term: "1Y",
    stateOwnedPeak: 1.52,
    dayChange: -0.02,
    bigSixRate: 1.52,
    bigSixBank: "交行",
    nationalStockRate: 1.52,
    nationalStockBank: "浦发/华夏",
    otherAaaRate: 1.63,
    otherAaaBank: "哈尔滨",
    aaPlusRate: 1.9,
    aaPlusBank: "温州民商"
  }
];

const ftpTrend = [
  { date: "03-12", depositFtp: 2.02, loanFtp: 2.58 },
  { date: "03-13", depositFtp: 2.04, loanFtp: 2.61 },
  { date: "03-14", depositFtp: 2.01, loanFtp: 2.57 },
  { date: "03-15", depositFtp: 2.07, loanFtp: 2.66 },
  { date: "03-16", depositFtp: 2.1, loanFtp: 2.7 },
  { date: "03-17", depositFtp: 2.08, loanFtp: 2.68 },
  { date: "03-18", depositFtp: 2.12, loanFtp: 2.72 }
];

const marketAnalysis = [
  {
    title: "货币政策",
    summary: "央行维持公开市场净投放，跨季资金平稳；7D逆回购利率维持不变，短端价格中枢偏稳。"
  },
  {
    title: "税期影响",
    summary: "4月下旬税期临近，预计对隔夜与7D资金价格形成阶段性抬升，需关注大行融出节奏。"
  },
  {
    title: "存单发行",
    summary: "本周存单发行放量，3M-6M供给较多；高评级发行利率小幅回落，低评级分层仍明显。"
  },
  {
    title: "跨月流动性",
    summary: "跨月备付需求提前释放，隔夜资金需求有抬升迹象；大行净融出规模整体可控，波动区间预计收窄。"
  },
  {
    title: "期限利差",
    summary: "1M-3M期限利差维持低位震荡，市场对后续资金中枢预期趋于一致，曲线斜率变化有限。"
  },
  {
    title: "机构行为",
    summary: "城商行与农商行继续偏好中短久期配置，国股行在关键时点加大报价深度，市场成交连续性改善。"
  }
];

function formatRate(value: number) {
  return value.toFixed(4);
}

function getMaxRate(row: QuoteRow) {
  return Math.max(...Object.values(row.institutionRates).filter((value): value is number => typeof value === "number"));
}

export function InterbankQuoteScreen() {
  const depositSpread = 2.0 - 1.5;
  const loanSpread = 4.5 - 2.5;
  const allRates = ftpTrend.flatMap((point) => [point.depositFtp, point.loanFtp]);
  const rateMin = Math.min(...allRates);
  const rateMax = Math.max(...allRates);
  const chartPadding = 0.06;
  const minFtp = Math.max(0, rateMin - chartPadding);
  const maxFtp = rateMax + chartPadding;
  const chartRange = maxFtp - minFtp || 1;
  const yTicks = Array.from({ length: 5 }, (_, index) => maxFtp - (chartRange / 4) * index);

  const latestFtp = ftpTrend[ftpTrend.length - 1];
  const depositDelta = latestFtp.depositFtp - ftpTrend[0].depositFtp;
  const loanDelta = latestFtp.loanFtp - ftpTrend[0].loanFtp;
  const depositDeltaBp = depositDelta * 100;
  const loanDeltaBp = loanDelta * 100;

  const toY = (value: number) => ((maxFtp - value) / chartRange) * 100;

  const xLabels = ftpTrend
    .map((point, index) => {
      const x = (index / (ftpTrend.length - 1)) * 100;

      return { x, label: point.date };
    })
    .filter((_, index) => index === 0 || index === ftpTrend.length - 1 || index % 2 === 0);
  const getCurvePath = (key: "depositFtp" | "loanFtp") => {
    const points = ftpTrend.map((point, index) => {
      const x = (index / (ftpTrend.length - 1)) * 100;
      const y = toY(point[key]);

      return { x, y };
    });
    if (points.length === 0) {
      return "";
    }

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const controlX = (previous.x + current.x) / 2;
      path += ` C ${controlX} ${previous.y}, ${controlX} ${current.y}, ${current.x} ${current.y}`;
    }

    return path;
  };
  const depositCurvePath = getCurvePath("depositFtp");
  const loanCurvePath = getCurvePath("loanFtp");

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
                  <th className="border border-[#9c9c9c] px-3 py-2">较上日</th>
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
                      <td className="border border-[#9c9c9c] px-3 py-1 font-semibold text-[#665200]">{formatRate(row.previousHigh)}</td>
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
        </CardContent>
      </Card>

      <Card className="overflow-hidden border border-border">
        <CardContent className="bg-[#efefef] p-0">
          <div className="border-b border-border bg-[#e7d8cc] py-2 text-center text-2xl font-semibold">同业存单</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-[22px] leading-tight">
              <thead>
                <tr className="bg-[#d1d1d1]">
                  <th rowSpan={2} className="border border-[#9c9c9c] px-3 py-2">
                    存款期限
                  </th>
                  <th colSpan={2} className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-2">
                    国有及国股行
                  </th>
                  <th colSpan={2} className="border border-[#9c9c9c] px-3 py-2">
                    六大国有
                  </th>
                  <th colSpan={2} className="border border-[#9c9c9c] px-3 py-2">
                    全国股份制
                  </th>
                  <th colSpan={2} className="border border-[#9c9c9c] px-3 py-2">
                    其他AAA
                  </th>
                  <th colSpan={2} className="border border-[#9c9c9c] px-3 py-2">
                    AA+
                  </th>
                </tr>
                <tr className="bg-[#dddddd] text-[18px]">
                  <th className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-2">当日最高</th>
                  <th className="border border-[#9c9c9c] bg-[#f4e2a3] px-3 py-2">较上日涨跌</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价行</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价行</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价行</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价</th>
                  <th className="border border-[#9c9c9c] px-3 py-2">报价行</th>
                </tr>
              </thead>
              <tbody>
                {cdRows.map((row) => (
                  <tr key={row.term} className="odd:bg-[#ececec] even:bg-[#e5e5e5]">
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">{row.term}</td>
                    <td className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-1 font-bold">{formatRate(row.stateOwnedPeak)}</td>
                    <td
                      className={`border border-[#9c9c9c] px-3 py-1 font-semibold ${
                        row.dayChange < 0 ? "text-green-600" : row.dayChange > 0 ? "text-red-600" : "text-foreground"
                      }`}
                    >
                      {row.dayChange > 0 ? `+${row.dayChange.toFixed(2)}` : row.dayChange.toFixed(2)}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">{formatRate(row.bigSixRate)}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1">{row.bigSixBank}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">{formatRate(row.nationalStockRate)}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1">{row.nationalStockBank}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">{formatRate(row.otherAaaRate)}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1">{row.otherAaaBank}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">{formatRate(row.aaPlusRate)}</td>
                    <td className="border border-[#9c9c9c] px-3 py-1">{row.aaPlusBank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="border border-border xl:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">FTP报价趋势图</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-2 pb-5 md:px-4">
            <div className="grid gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm md:grid-cols-2">
              <div className="space-y-1 rounded bg-background p-3">
                <p className="text-muted-foreground">存款FTP（资金成本价）</p>
                <p className="text-2xl font-bold text-blue-700">{latestFtp.depositFtp.toFixed(2)}%</p>
                <p className={depositDeltaBp >= 0 ? "text-red-600" : "text-green-600"}>
                  较03-12 {depositDeltaBp >= 0 ? "+" : ""}
                  {depositDeltaBp.toFixed(0)}bp
                </p>
                <p className="text-xs text-muted-foreground">示例中存款部门毛利：{depositSpread.toFixed(2)}%</p>
              </div>
              <div className="space-y-1 rounded bg-background p-3">
                <p className="text-muted-foreground">贷款FTP（资金收益价）</p>
                <p className="text-2xl font-bold text-amber-700">{latestFtp.loanFtp.toFixed(2)}%</p>
                <p className={loanDeltaBp >= 0 ? "text-red-600" : "text-green-600"}>
                  较03-12 {loanDeltaBp >= 0 ? "+" : ""}
                  {loanDeltaBp.toFixed(0)}bp
                </p>
                <p className="text-xs text-muted-foreground">示例中贷款部门息差：{loanSpread.toFixed(2)}%</p>
              </div>
            </div>
            <div className="h-72 rounded-md border border-border bg-slate-50 px-2 py-3 md:px-4">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {yTicks.map((tick) => {
                  const y = toY(tick);

                  return (
                    <g key={tick}>
                      <line x1={0} y1={y} x2={100} y2={y} stroke="#cbd5e1" strokeDasharray="2 2" strokeWidth="0.5" />
                      <text x={1} y={Math.max(4, y - 1)} fontSize="3" fill="#64748b">
                        {tick.toFixed(2)}%
                      </text>
                    </g>
                  );
                })}
                <path d={depositCurvePath} fill="none" stroke="#1d4ed8" strokeWidth="2.2" strokeLinecap="round" />
                <path d={loanCurvePath} fill="none" stroke="#b45309" strokeWidth="2.2" strokeLinecap="round" />
                {ftpTrend.map((point, index) => {
                  const x = (index / (ftpTrend.length - 1)) * 100;
                  const depositY = toY(point.depositFtp);
                  const loanY = toY(point.loanFtp);

                  return (
                    <g key={point.date}>
                      <circle cx={x} cy={depositY} r="1.7" fill="#1d4ed8" />
                      <circle cx={x} cy={loanY} r="1.7" fill="#b45309" />
                    </g>
                  );
                })}
                {xLabels.map((item) => (
                  <text key={item.label} x={item.x} y={99} fontSize="3" fill="#64748b" textAnchor="middle">
                    {item.label}
                  </text>
                ))}
              </svg>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="rounded bg-blue-100 px-2 py-1 text-blue-700">● 存款FTP（资金成本）</span>
              <span className="rounded bg-amber-100 px-2 py-1 text-amber-700">● 贷款FTP（资金收益）</span>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              {ftpTrend.map((point) => (
                <span key={point.date} className="rounded bg-muted px-2 py-1">
                  {point.date}：存款 {point.depositFtp.toFixed(2)}% / 贷款 {point.loanFtp.toFixed(2)}%
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border xl:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">货币市场分析</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketAnalysis.map((item) => (
              <article key={item.title} className="rounded-md border border-border bg-muted/40 p-3">
                <h3 className="mb-1 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.summary}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
