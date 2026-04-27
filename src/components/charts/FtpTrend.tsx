"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const description = "An interactive area chart";

const chartData = [
  { date: "2024-04-01", ftp_i: 222, ftp_e: 150 },
  { date: "2024-04-02", ftp_i: 97, ftp_e: 180 },
  { date: "2024-04-03", ftp_i: 167, ftp_e: 120 },
  { date: "2024-04-04", ftp_i: 242, ftp_e: 260 },
  { date: "2024-04-05", ftp_i: 373, ftp_e: 290 },
  { date: "2024-04-06", ftp_i: 301, ftp_e: 340 },
  { date: "2024-04-07", ftp_i: 245, ftp_e: 180 },
  { date: "2024-04-08", ftp_i: 409, ftp_e: 320 },
  { date: "2024-04-09", ftp_i: 59, ftp_e: 110 },
  { date: "2024-04-10", ftp_i: 261, ftp_e: 190 },
  { date: "2024-04-11", ftp_i: 327, ftp_e: 350 },
  { date: "2024-04-12", ftp_i: 292, ftp_e: 210 },
  { date: "2024-04-13", ftp_i: 342, ftp_e: 380 },
  { date: "2024-04-14", ftp_i: 137, ftp_e: 220 },
  { date: "2024-04-15", ftp_i: 120, ftp_e: 170 },
  { date: "2024-04-16", ftp_i: 138, ftp_e: 190 },
  { date: "2024-04-17", ftp_i: 446, ftp_e: 360 },
  { date: "2024-04-18", ftp_i: 364, ftp_e: 410 },
  { date: "2024-04-19", ftp_i: 243, ftp_e: 180 },
  { date: "2024-04-20", ftp_i: 89, ftp_e: 150 },
  { date: "2024-04-21", ftp_i: 137, ftp_e: 200 },
  { date: "2024-04-22", ftp_i: 224, ftp_e: 170 },
  { date: "2024-04-23", ftp_i: 138, ftp_e: 230 },
  { date: "2024-04-24", ftp_i: 387, ftp_e: 290 },
  { date: "2024-04-25", ftp_i: 215, ftp_e: 250 },
  { date: "2024-04-26", ftp_i: 75, ftp_e: 130 },
  { date: "2024-04-27", ftp_i: 383, ftp_e: 420 },
  { date: "2024-04-28", ftp_i: 122, ftp_e: 180 },
  { date: "2024-04-29", ftp_i: 315, ftp_e: 240 },
  { date: "2024-04-30", ftp_i: 454, ftp_e: 380 },
  { date: "2024-05-01", ftp_i: 165, ftp_e: 220 },
  { date: "2024-05-02", ftp_i: 293, ftp_e: 310 },
  { date: "2024-05-03", ftp_i: 247, ftp_e: 190 },
  { date: "2024-05-04", ftp_i: 385, ftp_e: 420 },
  { date: "2024-05-05", ftp_i: 481, ftp_e: 390 },
  { date: "2024-05-06", ftp_i: 498, ftp_e: 520 },
  { date: "2024-05-07", ftp_i: 388, ftp_e: 300 },
  { date: "2024-05-08", ftp_i: 149, ftp_e: 210 },
  { date: "2024-05-09", ftp_i: 227, ftp_e: 180 },
  { date: "2024-05-10", ftp_i: 293, ftp_e: 330 },
  { date: "2024-05-11", ftp_i: 335, ftp_e: 270 },
  { date: "2024-05-12", ftp_i: 197, ftp_e: 240 },
  { date: "2024-05-13", ftp_i: 197, ftp_e: 160 },
  { date: "2024-05-14", ftp_i: 448, ftp_e: 490 },
  { date: "2024-05-15", ftp_i: 473, ftp_e: 380 },
  { date: "2024-05-16", ftp_i: 338, ftp_e: 400 },
  { date: "2024-05-17", ftp_i: 499, ftp_e: 420 },
  { date: "2024-05-18", ftp_i: 315, ftp_e: 350 },
  { date: "2024-05-19", ftp_i: 235, ftp_e: 180 },
  { date: "2024-05-20", ftp_i: 177, ftp_e: 230 },
  { date: "2024-05-21", ftp_i: 82, ftp_e: 140 },
  { date: "2024-05-22", ftp_i: 81, ftp_e: 120 },
  { date: "2024-05-23", ftp_i: 252, ftp_e: 290 },
  { date: "2024-05-24", ftp_i: 294, ftp_e: 220 },
  { date: "2024-05-25", ftp_i: 201, ftp_e: 250 },
  { date: "2024-05-26", ftp_i: 213, ftp_e: 170 },
  { date: "2024-05-27", ftp_i: 420, ftp_e: 460 },
  { date: "2024-05-28", ftp_i: 233, ftp_e: 190 },
  { date: "2024-05-29", ftp_i: 78, ftp_e: 130 },
  { date: "2024-05-30", ftp_i: 340, ftp_e: 280 },
  { date: "2024-05-31", ftp_i: 178, ftp_e: 230 },
  { date: "2024-06-01", ftp_i: 178, ftp_e: 200 },
  { date: "2024-06-02", ftp_i: 470, ftp_e: 410 },
  { date: "2024-06-03", ftp_i: 103, ftp_e: 160 },
  { date: "2024-06-04", ftp_i: 439, ftp_e: 380 },
  { date: "2024-06-05", ftp_i: 88, ftp_e: 140 },
  { date: "2024-06-06", ftp_i: 294, ftp_e: 250 },
  { date: "2024-06-07", ftp_i: 323, ftp_e: 370 },
  { date: "2024-06-08", ftp_i: 385, ftp_e: 320 },
  { date: "2024-06-09", ftp_i: 438, ftp_e: 480 },
  { date: "2024-06-10", ftp_i: 155, ftp_e: 200 },
  { date: "2024-06-11", ftp_i: 92, ftp_e: 150 },
  { date: "2024-06-12", ftp_i: 492, ftp_e: 420 },
  { date: "2024-06-13", ftp_i: 81, ftp_e: 130 },
  { date: "2024-06-14", ftp_i: 426, ftp_e: 380 },
  { date: "2024-06-15", ftp_i: 307, ftp_e: 350 },
  { date: "2024-06-16", ftp_i: 371, ftp_e: 310 },
  { date: "2024-06-17", ftp_i: 475, ftp_e: 520 },
  { date: "2024-06-18", ftp_i: 107, ftp_e: 170 },
  { date: "2024-06-19", ftp_i: 341, ftp_e: 290 },
  { date: "2024-06-20", ftp_i: 408, ftp_e: 450 },
  { date: "2024-06-21", ftp_i: 169, ftp_e: 210 },
  { date: "2024-06-22", ftp_i: 317, ftp_e: 270 },
  { date: "2024-06-23", ftp_i: 480, ftp_e: 530 },
  { date: "2024-06-24", ftp_i: 132, ftp_e: 180 },
  { date: "2024-06-25", ftp_i: 141, ftp_e: 190 },
  { date: "2024-06-26", ftp_i: 434, ftp_e: 380 },
  { date: "2024-06-27", ftp_i: 448, ftp_e: 490 },
  { date: "2024-06-28", ftp_i: 149, ftp_e: 200 },
  { date: "2024-06-29", ftp_i: 103, ftp_e: 160 },
  { date: "2024-06-30", ftp_i: 446, ftp_e: 400 },
];

const chartConfig = {
  ftp: {
    label: "FTP",
  },
  ftp_i: {
    label: "存款FTP",
    color: "var(--chart-1)",
  },
  ftp_e: {
    label: "贷款FTP",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function FtpTrend() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>ftp报价趋势</CardTitle>
          <CardDescription>展示最近一段时间的ftp报价趋势</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="最近3个月" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              最近3个月
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              最近30天
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              最近7天
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFtpI" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ftp_i)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ftp_i)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillFtpE" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ftp_e)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ftp_e)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="ftp_e"
              type="natural"
              fill="url(#fillFtpE)"
              stroke="var(--color-ftp_e)"
              stackId="a"
            />
            <Area
              dataKey="ftp_i"
              type="natural"
              fill="url(#fillFtpI)"
              stroke="var(--color-ftp_i)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
