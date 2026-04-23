import { BlockGrid } from "@/components/block-grid";

const blocks = ["集团授信结构", "银行合作分布", "区域授信热力", "重点行额度趋势", "担保结构", "风险提示"];

export function BankRelationshipScreen() {
  return <BlockGrid blocks={blocks} />;
}
