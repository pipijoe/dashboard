import { FtpTrend } from "@/components/charts/FtpTrend";
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
  {
    term: "7D",
    shibor: 1.4291,
    previousHigh: 1.33,
    institutionRates: {
      交行: 0.3,
      中信: null,
      兴业: 1.33,
      北京: null,
      杭州: null,
      宁波: null,
    },
  },
  {
    term: "14D",
    shibor: 1.4795,
    previousHigh: 1.4,
    institutionRates: {
      交行: 0.3,
      中信: null,
      兴业: 1.4,
      北京: null,
      杭州: null,
      宁波: null,
    },
  },
  {
    term: "1M",
    shibor: 1.5248,
    previousHigh: 1.49,
    institutionRates: {
      交行: 0.3,
      中信: null,
      兴业: 1.4,
      北京: null,
      杭州: null,
      宁波: 1.49,
    },
  },
  {
    term: "3M",
    shibor: 1.5358,
    previousHigh: 1.49,
    institutionRates: {
      交行: 0.3,
      中信: null,
      兴业: 1.4,
      北京: null,
      杭州: null,
      宁波: 1.49,
    },
  },
  {
    term: "6M",
    shibor: 1.547,
    previousHigh: 1.52,
    institutionRates: {
      交行: 1.45,
      中信: null,
      兴业: 1.45,
      北京: null,
      杭州: null,
      宁波: 1.52,
    },
  },
  {
    term: "9M",
    shibor: 1.558,
    previousHigh: 1.52,
    institutionRates: {
      交行: 1.52,
      中信: 1.52,
      兴业: 1.5,
      北京: null,
      杭州: null,
      宁波: 1.52,
    },
  },
  {
    term: "1Y",
    shibor: 1.567,
    previousHigh: 1.55,
    institutionRates: {
      交行: 1.5,
      中信: 1.53,
      兴业: 1.5,
      北京: null,
      杭州: null,
      宁波: 1.55,
    },
  },
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
    aaPlusBank: "华瑞",
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
    aaPlusBank: "温州民商",
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
    aaPlusBank: "温州民商",
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
    aaPlusBank: "温州民商",
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
    aaPlusBank: "温州民商",
  },
];

const ftpTrend = [
  { date: "03-12", depositFtp: 2.02, loanFtp: 2.58 },
  { date: "03-13", depositFtp: 2.04, loanFtp: 2.61 },
  { date: "03-14", depositFtp: 2.01, loanFtp: 2.57 },
  { date: "03-15", depositFtp: 2.07, loanFtp: 2.66 },
  { date: "03-16", depositFtp: 2.1, loanFtp: 2.7 },
  { date: "03-17", depositFtp: 2.08, loanFtp: 2.68 },
  { date: "03-18", depositFtp: 2.12, loanFtp: 2.72 },
];

const marketRateTrend = [
  {
    date: "02-18",
    shiborOn: 1.42,
    shibor7d: 1.53,
    shibor1m: 1.62,
    shibor3m: 1.69,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "02-21",
    shiborOn: 1.38,
    shibor7d: 1.49,
    shibor1m: 1.6,
    shibor3m: 1.67,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "02-26",
    shiborOn: 1.45,
    shibor7d: 1.56,
    shibor1m: 1.61,
    shibor3m: 1.66,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "03-03",
    shiborOn: 1.5,
    shibor7d: 1.6,
    shibor1m: 1.59,
    shibor3m: 1.63,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "03-06",
    shiborOn: 1.47,
    shibor7d: 1.55,
    shibor1m: 1.58,
    shibor3m: 1.61,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "03-11",
    shiborOn: 1.39,
    shibor7d: 1.48,
    shibor1m: 1.56,
    shibor3m: 1.59,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "03-14",
    shiborOn: 1.36,
    shibor7d: 1.46,
    shibor1m: 1.55,
    shibor3m: 1.57,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "03-17",
    shiborOn: 1.41,
    shibor7d: 1.5,
    shibor1m: 1.54,
    shibor3m: 1.56,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
  {
    date: "03-18",
    shiborOn: 1.43,
    shibor7d: 1.52,
    shibor1m: 1.52,
    shibor3m: 1.54,
    lpr1y: 3.1,
    lpr5y: 3.6,
  },
] as const;

const marketRateSeries = [
  {
    key: "shiborOn",
    label: "隔夜SHIBOR",
    color: "#0ea5e9",
    strokeWidth: 2.5,
  },
  { key: "shibor7d", label: "7D SHIBOR", color: "#2563eb", strokeWidth: 2.5 },
  { key: "shibor1m", label: "1M SHIBOR", color: "#7c3aed", strokeWidth: 2.5 },
  { key: "shibor3m", label: "3M SHIBOR", color: "#db2777", strokeWidth: 2.5 },
  { key: "lpr1y", label: "1年期LPR", color: "#f97316", strokeWidth: 3.5 },
  {
    key: "lpr5y",
    label: "5年期以上LPR",
    color: "#dc2626",
    strokeWidth: 3.5,
  },
] as const;

type MarketRateKey = (typeof marketRateSeries)[number]["key"];

const marketAnalysis = [
  {
    title: "货币政策",
    summary:
      "央行维持公开市场净投放，跨季资金平稳；7D逆回购利率维持不变，短端价格中枢偏稳。",
  },
  {
    title: "税期影响",
    summary:
      "4月下旬税期临近，预计对隔夜与7D资金价格形成阶段性抬升，需关注大行融出节奏。",
  },
  {
    title: "存单发行",
    summary:
      "本周存单发行放量，3M-6M供给较多；高评级发行利率小幅回落，低评级分层仍明显。",
  },
  {
    title: "跨月流动性",
    summary:
      "跨月备付需求提前释放，隔夜资金需求有抬升迹象；大行净融出规模整体可控，波动区间预计收窄。",
  },
  {
    title: "期限利差",
    summary:
      "1M-3M期限利差维持低位震荡，市场对后续资金中枢预期趋于一致，曲线斜率变化有限。",
  },
  {
    title: "机构行为",
    summary:
      "城商行与农商行继续偏好中短久期配置，国股行在关键时点加大报价深度，市场成交连续性改善。",
  },
];

function formatRate(value: number) {
  return value.toFixed(4);
}

function getMaxRate(row: QuoteRow) {
  return Math.max(
    ...Object.values(row.institutionRates).filter(
      (value): value is number => typeof value === "number",
    ),
  );
}

export function InterbankQuoteScreen() {
  const depositSpread = 2.0 - 1.5;
  const loanSpread = 4.5 - 2.5;
  const allRates = ftpTrend.flatMap((point) => [
    point.depositFtp,
    point.loanFtp,
  ]);
  const rateMin = Math.min(...allRates);
  const rateMax = Math.max(...allRates);
  const chartPadding = 0.06;
  const minFtp = Math.max(0, rateMin - chartPadding);
  const maxFtp = rateMax + chartPadding;
  const chartRange = maxFtp - minFtp || 1;
  const yTicks = Array.from(
    { length: 5 },
    (_, index) => maxFtp - (chartRange / 4) * index,
  );

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
    .filter(
      (_, index) =>
        index === 0 || index === ftpTrend.length - 1 || index % 2 === 0,
    );
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

  const marketRateValues = marketRateTrend.flatMap((point) =>
    marketRateSeries.map((series) => point[series.key]),
  );
  const marketRateMin =
    Math.floor((Math.min(...marketRateValues) - 0.1) * 10) / 10;
  const marketRateMax =
    Math.ceil((Math.max(...marketRateValues) + 0.1) * 10) / 10;
  const marketRateRange = marketRateMax - marketRateMin || 1;
  const marketRateTicks = Array.from(
    { length: 5 },
    (_, index) => marketRateMax - (marketRateRange / 4) * index,
  );
  const latestMarketRate = marketRateTrend[marketRateTrend.length - 1];
  const previousMarketRate = marketRateTrend[marketRateTrend.length - 2];
  const oneYearSpread = latestMarketRate.lpr1y - latestMarketRate.shibor1m;
  const fiveYearSpread = latestMarketRate.lpr5y - latestMarketRate.shibor3m;
  const spreadChange =
    oneYearSpread - (previousMarketRate.lpr1y - previousMarketRate.shibor1m);
  const toMarketRateY = (value: number) =>
    ((marketRateMax - value) / marketRateRange) * 100;
  const getMarketRatePath = (key: MarketRateKey) => {
    const points = marketRateTrend.map((point, index) => {
      const x = (index / (marketRateTrend.length - 1)) * 100;
      const y = toMarketRateY(point[key]);

      return { x, y };
    });

    return points.reduce((path, point, index) => {
      if (index === 0) {
        return `M ${point.x} ${point.y}`;
      }
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;

      return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, "");
  };

  return (
    <section className="space-y-4">
      <Card className="overflow-hidden border border-border">
        <CardHeader className="py-5 text-center ">
          <CardTitle className="text-4xl font-extrabold tracking-wider">
            {asOfDate}
          </CardTitle>
        </CardHeader>
        <div className="bg-orange-500 py-2 text-center text-4xl font-bold text-white">
          银行同业报价
        </div>
        <CardContent className="bg-[rgb(239,239,239)] p-0">
          <div className="border-b border-border bg-[#e7d8cc] py-2 text-center text-2xl font-semibold">
            同业存款
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-[26px] leading-tight">
              <thead>
                <tr className="bg-[#c9c9c9]">
                  <th className="border border-[#9c9c9c] px-3 py-2">
                    存款期限
                  </th>
                  <th className="border border-[#9c9c9c] px-3 py-2">Shibor</th>
                  <th className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-2">
                    当日最高
                  </th>
                  <th className="border border-[#9c9c9c] px-3 py-2">较上日</th>
                  {institutions.map((name) => (
                    <th
                      key={name}
                      className="border border-[#9c9c9c] px-3 py-2"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {quoteRows.map((row) => {
                  const maxRate = getMaxRate(row);

                  return (
                    <tr
                      key={row.term}
                      className="odd:bg-[#ececec] even:bg-[#e5e5e5]"
                    >
                      <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">
                        {row.term}
                      </td>
                      <td className="border border-[#9c9c9c] px-3 py-1 font-semibold text-[#1f4e79]">
                        {row.shibor ? formatRate(row.shibor) : "-"}
                      </td>
                      <td className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-1 font-bold">
                        {formatRate(maxRate)}
                      </td>
                      <td className="border border-[#9c9c9c] px-3 py-1 font-semibold text-[#665200]">
                        {formatRate(row.previousHigh)}
                      </td>
                      {institutions.map((name) => {
                        const rate = row.institutionRates[name];
                        const isMax = rate !== null && rate === maxRate;

                        return (
                          <td
                            key={`${row.term}-${name}`}
                            className={`border border-[#9c9c9c] px-3 py-1 font-semibold ${
                              isMax
                                ? "bg-red-100 text-red-700"
                                : "text-foreground"
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
          <div className="border-b border-border bg-[#e7d8cc] py-2 text-center text-2xl font-semibold">
            同业存单
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-center text-[22px] leading-tight">
              <thead>
                <tr className="bg-[#d1d1d1]">
                  <th rowSpan={2} className="border border-[#9c9c9c] px-3 py-2">
                    存款期限
                  </th>
                  <th
                    colSpan={2}
                    className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-2"
                  >
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
                  <th className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-2">
                    当日最高
                  </th>
                  <th className="border border-[#9c9c9c] bg-[#f4e2a3] px-3 py-2">
                    较上日涨跌
                  </th>
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
                  <tr
                    key={row.term}
                    className="odd:bg-[#ececec] even:bg-[#e5e5e5]"
                  >
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">
                      {row.term}
                    </td>
                    <td className="border border-[#9c9c9c] bg-[#f6c000] px-3 py-1 font-bold">
                      {formatRate(row.stateOwnedPeak)}
                    </td>
                    <td
                      className={`border border-[#9c9c9c] px-3 py-1 font-semibold ${
                        row.dayChange < 0
                          ? "text-green-600"
                          : row.dayChange > 0
                            ? "text-red-600"
                            : "text-foreground"
                      }`}
                    >
                      {row.dayChange > 0
                        ? `+${row.dayChange.toFixed(2)}`
                        : row.dayChange.toFixed(2)}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">
                      {formatRate(row.bigSixRate)}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1">
                      {row.bigSixBank}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">
                      {formatRate(row.nationalStockRate)}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1">
                      {row.nationalStockBank}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">
                      {formatRate(row.otherAaaRate)}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1">
                      {row.otherAaaBank}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1 font-semibold">
                      {formatRate(row.aaPlusRate)}
                    </td>
                    <td className="border border-[#9c9c9c] px-3 py-1">
                      {row.aaPlusBank}
                    </td>
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
            <CardTitle className="text-xl">FTP报价分析</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 px-2 pb-5 md:px-4">
            <div className="grid gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm md:grid-cols-2">
              <div className="space-y-1 rounded bg-background p-3">
                <p className="text-muted-foreground">存款FTP（资金成本价）</p>
                <p className="text-2xl font-bold text-blue-700">
                  {latestFtp.depositFtp.toFixed(2)}%
                </p>
                <p
                  className={
                    depositDeltaBp >= 0 ? "text-red-600" : "text-green-600"
                  }
                >
                  较03-12 {depositDeltaBp >= 0 ? "+" : ""}
                  {depositDeltaBp.toFixed(0)}bp
                </p>
                <p className="text-xs text-muted-foreground">
                  示例中存款部门毛利：{depositSpread.toFixed(2)}%
                </p>
              </div>
              <div className="space-y-1 rounded bg-background p-3">
                <p className="text-muted-foreground">贷款FTP（资金收益价）</p>
                <p className="text-2xl font-bold text-amber-700">
                  {latestFtp.loanFtp.toFixed(2)}%
                </p>
                <p
                  className={
                    loanDeltaBp >= 0 ? "text-red-600" : "text-green-600"
                  }
                >
                  较03-12 {loanDeltaBp >= 0 ? "+" : ""}
                  {loanDeltaBp.toFixed(0)}bp
                </p>
                <p className="text-xs text-muted-foreground">
                  示例中贷款部门息差：{loanSpread.toFixed(2)}%
                </p>
              </div>
            </div>
            <FtpTrend />
          </CardContent>
        </Card>

        <Card className="border border-border xl:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">货币市场分析</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketAnalysis.map((item) => (
              <article
                key={item.title}
                className="rounded-md border border-border bg-muted/40 p-3"
              >
                <h3 className="mb-1 text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.summary}
                </p>
              </article>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden border border-border">
        <CardHeader className="border-b border-border bg-slate-900 text-white">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <CardTitle className="text-2xl">市场利率走势图</CardTitle>
              <p className="mt-1 text-sm text-slate-300">
                SHIBOR走势与LPR报价叠加对比，跟踪资金面与贷款定价基准利差变化
              </p>
            </div>
            <div className="rounded-full bg-white/10 px-4 py-1 text-sm text-slate-200">
              数据区间：02-18 至 03-18
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 bg-slate-50 p-4 md:p-5">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">1M SHIBOR</p>
              <p className="mt-2 text-3xl font-bold text-blue-700">
                {latestMarketRate.shibor1m.toFixed(2)}%
              </p>
              <p className="mt-1 text-xs text-green-600">较上期下行2bp</p>
            </div>
            <div className="rounded-xl border border-violet-100 bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">3M SHIBOR</p>
              <p className="mt-2 text-3xl font-bold text-violet-700">
                {latestMarketRate.shibor3m.toFixed(2)}%
              </p>
              <p className="mt-1 text-xs text-green-600">较月初下行9bp</p>
            </div>
            <div className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">1年期LPR-1M SHIBOR</p>
              <p className="mt-2 text-3xl font-bold text-orange-600">
                {(oneYearSpread * 100).toFixed(0)}bp
              </p>
              <p
                className={
                  spreadChange >= 0
                    ? "mt-1 text-xs text-red-600"
                    : "mt-1 text-xs text-green-600"
                }
              >
                较上期{spreadChange >= 0 ? "扩大" : "收窄"}
                {Math.abs(spreadChange * 100).toFixed(0)}bp
              </p>
            </div>
            <div className="rounded-xl border border-red-100 bg-white p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">5年期LPR-3M SHIBOR</p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {(fiveYearSpread * 100).toFixed(0)}bp
              </p>
              <p className="mt-1 text-xs text-muted-foreground">中长期报价利差保持高位</p>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-12">
            <div className="rounded-xl border border-border bg-white p-4 shadow-sm xl:col-span-8">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">SHIBOR期限结构与LPR叠加走势</h3>
                  <p className="text-sm text-muted-foreground">
                    不同期限SHIBOR反映短端资金成本，LPR曲线用于观察贷款基准定价锚的相对稳定性。
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {marketRateSeries.map((series) => (
                    <span
                      key={series.key}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1"
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: series.color }}
                      />
                      {series.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative h-[360px] rounded-lg bg-gradient-to-b from-white to-slate-50 p-3">
                <svg
                  viewBox="0 0 760 320"
                  className="h-full w-full overflow-visible"
                  role="img"
                  aria-label="SHIBOR与LPR利率走势图"
                >
                  {marketRateTicks.map((tick, index) => {
                    const y = 30 + (index / (marketRateTicks.length - 1)) * 235;

                    return (
                      <g key={tick}>
                        <line
                          x1="58"
                          x2="720"
                          y1={y}
                          y2={y}
                          stroke="#e2e8f0"
                          strokeDasharray="4 6"
                        />
                        <text
                          x="48"
                          y={y + 4}
                          textAnchor="end"
                          className="fill-slate-500 text-[11px]"
                        >
                          {tick.toFixed(2)}%
                        </text>
                      </g>
                    );
                  })}
                  {marketRateTrend.map((point, index) => {
                    const x = 58 + (index / (marketRateTrend.length - 1)) * 662;

                    return (
                      <g key={point.date}>
                        <line x1={x} x2={x} y1="30" y2="265" stroke="#f1f5f9" />
                        <text
                          x={x}
                          y="292"
                          textAnchor="middle"
                          className="fill-slate-500 text-[11px]"
                        >
                          {point.date}
                        </text>
                      </g>
                    );
                  })}
                  {marketRateSeries.map((series) => (
                    <path
                      key={series.key}
                      d={getMarketRatePath(series.key)}
                      fill="none"
                      stroke={series.color}
                      strokeWidth={series.strokeWidth}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      transform="translate(58 30) scale(6.62 2.35)"
                    />
                  ))}
                  {marketRateSeries.map((series) => {
                    const value = latestMarketRate[series.key];
                    return (
                      <g key={`${series.key}-latest`}>
                        <circle
                          cx="720"
                          cy={30 + toMarketRateY(value) * 2.35}
                          r="4"
                          fill="white"
                          stroke={series.color}
                          strokeWidth="2"
                        />
                        <text
                          x="730"
                          y={34 + toMarketRateY(value) * 2.35}
                          className="fill-slate-600 text-[11px]"
                        >
                          {value.toFixed(2)}%
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="space-y-3 xl:col-span-4">
              <article className="rounded-xl border border-border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">SHIBOR走势观察</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  隔夜与7D品种围绕1.4%-1.6%区间震荡，1M、3M期限缓慢下行，显示跨月后资金预期趋稳，期限结构斜率收敛。
                </p>
              </article>
              <article className="rounded-xl border border-border bg-white p-4 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">LPR叠加对比分析</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  LPR报价保持稳定，而中短端SHIBOR小幅回落，1年期LPR与1M SHIBOR利差扩大至
                  {(oneYearSpread * 100).toFixed(0)}bp，可作为贷款重定价与内部FTP调整的监测信号。
                </p>
              </article>
              <article className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <h3 className="mb-2 text-lg font-semibold text-amber-900">利差监测提示</h3>
                <p className="text-sm leading-6 text-amber-800">
                  若后续SHIBOR继续下行而LPR维持不变，贷款端基准利差将被动扩大；建议同步关注存单报价、公开市场操作与贷款投放节奏。
                </p>
              </article>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
