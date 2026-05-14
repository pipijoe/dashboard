import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, TrendingUp, Wallet, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// 模拟数据：基于图片内容
const assetData = [
    {
        name: "同业存单",
        earnings: 0.01,
        rate: "1.57%",
        principal: "1.00",
        color: "#e11d48", // Rose 600
    },
    {
        name: "同业定期",
        earnings: 1.00,
        rate: "1.64%",
        principal: "100.00",
        color: "#fb7185", // Rose 400
    },
    {
        name: "同业活期",
        earnings: 0.90,
        rate: "-", // 图片中未显示具体收益率，假设为空
        principal: "-",
        color: "#fda4af", // Rose 300
    },
];

// 图表数据适配
const chartData = assetData.map(item => ({
    name: item.name,
    value: item.earnings
}));

const AssetOverview = () => {
    return (
        <Card className="w-full bg-white border-none shadow-sm text-slate-900 font-sans h-fit">
            {/* --- 头部区域 --- */}
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
                <div className="flex items-center gap-2">
                    <div className="bg-rose-100 p-1.5 rounded-md">
                        <Wallet className="h-5 w-5 text-rose-600" />
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight text-slate-800">
                        同业资产概览
                    </CardTitle>
                </div>

                {/* 右上角：查看明细 */}
                <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium text-sm">
                    查看明细
                    <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
            </CardHeader>

            {/* --- 日期范围显示 --- */}
            <div className="px-6 pb-2">
                <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-100 rounded-full px-3 py-1 text-xs font-medium">
                    <FileText className="mr-1.5 h-3 w-3" />
                    计算周期: 2026/1/1 - 2026/1/31
                </Badge>
            </div>

            <CardContent className="px-6 py-4">
                <div className="flex flex-col lg:flex-row gap-8 items-end">

                    {/* --- 左侧：关键指标大字展示 --- */}
                    <div className="flex-1 w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {assetData.map((item) => (
                                <div key={item.name} className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-rose-100 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-slate-500 text-sm font-medium">{item.name}</span>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider">计算期本金总计</p>
                                        <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-slate-900 tracking-tight">
                        {item.principal}
                      </span>
                                        </div>

                                        <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between items-center">
                                            <span className="text-xs text-slate-500">计算期收益率</span>
                                            <span className={`text-sm font-bold ${item.rate === '-' ? 'text-slate-400' : 'text-rose-600'}`}>
                         {item.rate}
                       </span>
                                        </div>
                                        <div className="pt-2 mt-2 border-slate-200 flex justify-between items-center">
                                            <span className="text-xs text-slate-500">计算期收益总计</span>
                                            <span className={`text-sm font-bold text-rose-600`}>
                         {item.earnings}
                       </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};

export default AssetOverview;