import { type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

const menuItems = [
  { label: "银行关系大屏", path: "/screens/bank-relationship" },
  { label: "资金驾驶舱大屏", path: "/screens/fund-cockpit" },
  { label: "账户管理大屏", path: "/screens/account-management" }
];

interface ScreenShellProps extends PropsWithChildren {
  title: string;
  currentPath: string;
}

export function ScreenShell({ title, currentPath, children }: ScreenShellProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-red-50 p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card/80 p-4 backdrop-blur">
        <h1 className="text-2xl font-bold text-primary">{title}</h1>
        <nav className="flex flex-wrap gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm transition-colors",
                currentPath === item.path
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </main>
  );
}
