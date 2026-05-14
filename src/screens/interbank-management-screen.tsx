import { BlockGrid } from "@/components/block-grid";

const blocks = ["同业资产总览", "同业负债总览", "同业授信", "同业交易", "同业风险监测", "同业机构分布"];

export function InterbankManagementScreen() {
  return <BlockGrid blocks={blocks} />;
}
