import type { ComponentType } from "react";

import {
  Activity,
  ChevronDown,
  CircleAlert,
  Clock3,
  Coins,
  HandCoins,
  Landmark,
  MoveUp,
  Wallet
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const liquidityRows = [
  { label: "流动性资产总计", value: "127.8", unit: "亿元", tone: "emerald", icon: Activity },
  { label: "流动性负债总计", value: "334.67", unit: "亿元", tone: "blue", icon: HandCoins },
  { label: "流动性比例", value: "37.74", unit: "%", tone: "green", icon: MoveUp },
  { label: "本月最低流动性比例", value: "35.14", unit: "%", tone: "amber", icon: CircleAlert }
];

const barData = [82, 15, 28, 12, 55, 67, 72, 85];

const sourceCards = [
  { label: "存款准备金", value: "132", unit: "亿元", tone: "blue", icon: Landmark },
  { label: "备付资金", value: "95", unit: "亿元", tone: "green", icon: Wallet },
  { label: "信贷", value: "182", unit: "亿元", tone: "amber", icon: Activity },
  { label: "投资用款", value: "144", unit: "亿元", tone: "violet", icon: Activity },
  { label: "吸收存款", value: "397", unit: "亿元", tone: "rose", icon: MoveUp, change: "同比 +5.48%" }
];

const quoteTicks = ["7/1", "7/2", "7/3", "8/1", "8/2", "8/3", "9/1", "9/2", "9/3", "10/1", "10/2", "10/3"];
const marketTicks = ["7/28", "8/1", "8/4", "8/9", "8/12", "8/17"];

const toneStyles = {
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-green-200 bg-green-50 text-green-700",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700"
} as const;

function CardHead({ icon: Icon, title, subtitle }: { icon: ComponentType<{ className?: string }>; title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 p-3 text-white shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-[34px] font-bold leading-none tracking-tight text-slate-900">{title}</h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
      <button className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100">
        查看更多 <ChevronDown className="ml-1 inline h-3 w-3" />
      </button>
    </div>
  );
}

export function FundCockpitScreen() {
  return (
    <section className="grid grid-cols-12 gap-5 text-sm">
      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-4">
        <CardContent className="p-0">
          <CardHead icon={Activity} title="流动性比例" subtitle="Liquidity Ratio" />

          <div className="mb-4 rounded-xl border border-blue-100 bg-sky-50 p-4">
            <div className="mb-2 flex items-start justify-between">
              <p className="text-slate-600">当前流动性比例</p>
              <div className="text-right text-slate-700">
                <p className="text-xs">监管标准</p>
                <p className="text-3xl font-semibold text-slate-800">≥25%</p>
                <p className="text-green-600">达标</p>
              </div>
            </div>
            <p className="text-5xl font-extrabold tracking-tight text-blue-600">37.74%</p>
          </div>

          <div className="space-y-2">
            {liquidityRows.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`flex items-center justify-between rounded-xl border px-4 py-3 ${toneStyles[item.tone]}`}>
                  <p className="flex items-center gap-2 font-medium">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </p>
                  <p className="text-right">
                    <span className="text-3xl font-bold">{item.value}</span>
                    <span className="ml-2 text-xs">{item.unit}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-4">
        <CardContent className="p-0">
          <CardHead icon={Clock3} title="同业资产期限分布" subtitle="Asset Term Distribution" />

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
              <p className="text-slate-600">资产总额</p>
              <p className="mt-2 text-5xl font-bold text-orange-600">417<span className="ml-1 text-xl">亿</span></p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-slate-600">最长期限</p>
              <p className="mt-2 text-5xl font-bold text-emerald-600">1Y<span className="ml-1 text-2xl">85亿</span></p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex h-56 items-end gap-2 border-b border-l border-dashed border-slate-300 px-2 pb-1 pt-4">
              {barData.map((v, idx) => (
                <div key={idx} className="flex-1 rounded-t-lg bg-gradient-to-t from-lime-400 via-emerald-400 to-emerald-600" style={{ height: `${v}%`, opacity: 0.6 + idx * 0.05 }} />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-8 text-center text-xs text-slate-500">
              {["1D", "7D", "1M", "2M", "3M", "6M", "9M", "1Y"].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-4">
        <CardContent className="p-0">
          <CardHead icon={Coins} title="同业资产结构" subtitle="Asset Structure" />

          <div className="mb-6 flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50 p-4">
            <div>
              <p className="text-slate-600">资产总额</p>
              <p className="mt-2 text-5xl font-bold text-violet-600">127.8<span className="ml-1 text-2xl">亿</span></p>
            </div>
            <div className="rounded-full bg-violet-100 p-3 text-violet-700">
              <Coins className="h-7 w-7" />
            </div>
          </div>

          <div className="grid place-items-center py-3">
            <div
              className="h-40 w-40 rounded-full"
              style={{
                background:
                  "conic-gradient(#f97316 0 45%, #8b5cf6 45% 75%, #5977e8 75% 100%)"
              }}
            >
              <div className="m-auto mt-7 h-26 w-26 rounded-full bg-white" />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1"><i className="h-3 w-3 rounded-full bg-[#5977e8]" />活期 25%</span>
              <span className="inline-flex items-center gap-1"><i className="h-3 w-3 rounded-full bg-orange-500" />定期 45%</span>
              <span className="inline-flex items-center gap-1"><i className="h-3 w-3 rounded-full bg-violet-500" />存单 30%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-12 rounded-2xl bg-white/90 p-5 lg:col-span-8">
        <CardContent className="p-0">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-bold text-slate-900">资金来源与应用</h3>
              <p className="text-sm text-slate-500">Fund Source &amp; Application Analysis</p>
            </div>
            <button className="rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-500 hover:bg-rose-100">查看更多 <ChevronDown className="ml-1 inline h-3 w-3" /></button>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-5">
            {sourceCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`rounded-xl border p-3 ${toneStyles[item.tone]}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium">{item.label}</p>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-4xl font-bold text-slate-900">{item.value}</p>
                  <p className="text-sm">{item.unit}</p>
                  {item.change ? <p className="mt-1 text-xs text-rose-600">{item.change}</p> : null}
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <svg viewBox="0 0 820 220" className="h-56 w-full">
              <polyline fill="none" stroke="#2563eb" strokeWidth="3" points="20,140 120,145 220,150 320,152 420,155 520,148 620,140 720,138 800,136" />
              <polyline fill="none" stroke="#16a34a" strokeWidth="3" points="20,155 120,158 220,161 320,163 420,165 520,160 620,156 720,152 800,150" />
              <polyline fill="none" stroke="#ea580c" strokeWidth="3" points="20,120 120,122 220,124 320,126 420,128 520,122 620,116 720,112 800,110" />
              <polyline fill="none" stroke="#7c3aed" strokeWidth="3" points="20,130 120,132 220,134 320,136 420,138 520,130 620,126 720,122 800,120" />
              <polyline fill="none" stroke="#dc2626" strokeWidth="4" points="20,70 120,74 220,76 320,80 420,82 520,78 620,76 720,74 800,72" />
            </svg>
            <div className="mt-2 flex flex-wrap justify-center gap-3 text-xs text-slate-600">
              <span className="text-blue-600">— 存款准备金</span><span className="text-green-600">— 备付资金</span><span className="text-orange-600">— 信贷</span><span className="text-violet-600">— 投资用款</span><span className="text-red-600">— 吸收存款</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-12 grid gap-5 lg:col-span-4">
        <Card className="rounded-2xl bg-white/90 p-5">
          <CardContent className="p-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-3xl font-bold text-slate-800">同业市场报价</h3>
              <button className="text-sm font-medium text-rose-500">查看更多 <ChevronDown className="ml-1 inline h-3 w-3" /></button>
            </div>
            <svg viewBox="0 0 560 180" className="h-36 w-full">
              <polyline fill="none" stroke="#ec4899" strokeWidth="4" points="12,30 70,35 128,40 186,43 244,47 302,52 360,58 418,63 476,68 544,72" />
              {Array.from({ length: 10 }).map((_, i) => (
                <circle key={i} cx={12 + i * 58} cy={30 + i * 4.8} r="4" fill="#fff" stroke="#ec4899" strokeWidth="3" />
              ))}
            </svg>
            <div className="grid grid-cols-6 text-xs text-slate-500">
              {quoteTicks.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white/90 p-5">
          <CardContent className="p-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-3xl font-bold text-slate-800">市场行情</h3>
              <button className="text-sm font-medium text-rose-500">查看更多 <ChevronDown className="ml-1 inline h-3 w-3" /></button>
            </div>
            <svg viewBox="0 0 560 180" className="h-36 w-full">
              <polyline fill="none" stroke="#ef4444" strokeWidth="3" points="10,18 80,28 150,38 220,48 290,72 360,88 430,105 500,114 550,120" />
              <polyline fill="none" stroke="#2563eb" strokeWidth="3" points="10,20 80,26 150,36 220,44 290,68 360,86 430,103 500,112 550,118" />
            </svg>
            <div className="grid grid-cols-6 text-xs text-slate-500">
              {marketTicks.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
            <p className="mt-3 text-center text-xs"><span className="text-red-500">-●- SHIBOR隔夜</span> <span className="ml-4 text-blue-500">-●- LPR 1年期</span></p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
