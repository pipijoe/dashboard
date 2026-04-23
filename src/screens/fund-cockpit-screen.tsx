import { BlockGrid } from "@/components/block-grid";

const blocks = ["日资金头寸", "收支流量", "在途资金", "融资成本", "资金计划达成", "异常预警"];

export function FundCockpitScreen() {
  return <BlockGrid blocks={blocks} />;
}
