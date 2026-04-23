import { BlockGrid } from "@/components/block-grid";

const blocks = ["账户总览", "账户分类", "账户余额趋势", "久悬账户", "开户销户统计", "账户风险分级"];

export function AccountManagementScreen() {
  return <BlockGrid blocks={blocks} />;
}
