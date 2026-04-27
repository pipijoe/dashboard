import { Navigate, Route, Routes } from "react-router-dom";

import { ScreenShell } from "@/components/screen-shell";
import { AccountManagementScreen } from "@/screens/account-management-screen";
import { BankDirectoryScreen } from "@/screens/bank-directory-screen";
import { BankRelationshipScreen } from "@/screens/bank-relationship-screen";
import { FundCockpitScreen } from "@/screens/fund-cockpit-screen";
import { FundConfigurationScreen } from "@/screens/fund-configuration-screen";
import { InterbankQuoteScreen } from "@/screens/interbank-quote-screen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/screens/bank-relationship" replace />} />
      <Route
        path="/screens/bank-relationship"
        element={
          <ScreenShell title="银行关系大屏" currentPath="/screens/bank-relationship">
            <BankRelationshipScreen />
          </ScreenShell>
        }
      />
      <Route
        path="/screens/bank-directory"
        element={
          <ScreenShell title="合作银行名录" currentPath="/screens/bank-relationship">
            <BankDirectoryScreen />
          </ScreenShell>
        }
      />
      <Route
        path="/screens/fund-cockpit"
        element={
          <ScreenShell title="资金驾驶舱大屏" currentPath="/screens/fund-cockpit">
            <FundCockpitScreen />
          </ScreenShell>
        }
      />
      <Route
        path="/screens/account-management"
        element={
          <ScreenShell title="账户管理大屏" currentPath="/screens/account-management">
            <AccountManagementScreen />
          </ScreenShell>
        }
      />
      <Route
        path="/screens/interbank-quote"
        element={
          <ScreenShell title="市场行情" currentPath="/screens/interbank-quote">
            <InterbankQuoteScreen />
          </ScreenShell>
        }
      />
      <Route
        path="/screens/fund-configuration"
        element={
          <ScreenShell title="资金配置" currentPath="/screens/fund-configuration">
            <FundConfigurationScreen />
          </ScreenShell>
        }
      />
    </Routes>
  );
}
