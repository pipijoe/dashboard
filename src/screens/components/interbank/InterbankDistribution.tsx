import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, FileText } from "lucide-react";

// --- 类型定义 ---
interface BankItem {
    name: string;
    amount: number;
}

interface DistributionProps {
    title: string;
    data: BankItem[];
}

// --- 模拟数据 ---
const interbankCDData: BankItem[] = [
    { name: "北京", amount: 1.00 },
    { name: "工商", amount: 2.00 },
    { name: "光大", amount: 0.30 },
    { name: "广发", amount: 1.90 },
    { name: "广州", amount: 8.30 },
    { name: "杭州", amount: 7.30 },
    { name: "华夏", amount: 9.00 },
];

const interbankTermData: BankItem[] = [
    { name: "招商", amount: 5.50 },
    { name: "中信", amount: 3.20 },
    { name: "浦发", amount: 4.10 },
    { name: "民生", amount: 2.80 },
    { name: "兴业", amount: 6.00 },
    { name: "平安", amount: 1.50 },
];

// --- 核心组件：分布概览卡片 ---
const BankDistributionCard: React.FC<DistributionProps> = ({ title, data }) => {
    const [open, setOpen] = useState(false);

    // 计算最大值用于简单的进度条展示（可选的视觉优化）
    const maxAmount = Math.max(...data.map((item) => item.amount));

    return (
        <Card className="w-full border-none shadow-sm bg-white h-fit font-sans">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    {title}
                </CardTitle>
                {/* 右上角按钮 */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-sm text-gray-500 hover:text-rose-600 hover:bg-rose-50">
                            查看明细
                            <FileText className="ml-2 h-4 w-4" />
                        </Button>
                    </DialogTrigger>

                    {/* 详情弹窗 */}
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-rose-600" />
                                {title} - 详细列表
                            </DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[400px] pr-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">银行名称</TableHead>
                                        <TableHead className="text-right">持有存单账面总计</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell className="text-right font-mono">{item.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b-2 border-gray-100">
                            <TableHead className="w-[30%] text-gray-500 font-medium">银行</TableHead>
                            <TableHead className="text-right text-gray-500 font-medium">汇总金额</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index} className="group hover:bg-rose-50/50 transition-colors">
                                <TableCell className="font-medium text-gray-700 pl-2 border-l-2 border-transparent group-hover:border-rose-500">
                                    {item.name}
                                </TableCell>
                                <TableCell className="text-right font-mono text-gray-900">
                                    {item.amount.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

// --- 页面容器 ---
export default function DashboardSection() {
    return (
        <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
            {/* 同业存单分布 */}
            <BankDistributionCard title="同业存单分布" data={interbankCDData} />

            {/* 同业定期分布 */}
            <BankDistributionCard title="同业定期分布" data={interbankTermData} />
        </div>
    );
}