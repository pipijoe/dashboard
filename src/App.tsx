import { Navigate, Route, Routes } from "react-router-dom";

import { ScreenShell } from "@/components/screen-shell";
import { AccountManagementScreen } from "@/screens/account-management-screen";
import { BankRelationshipScreen } from "@/screens/bank-relationship-screen";
import { FundCockpitScreen } from "@/screens/fund-cockpit-screen";

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
    </Routes>
  );
}
