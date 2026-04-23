import { createContext, useContext, useMemo, useState, type ButtonHTMLAttributes, type ComponentPropsWithoutRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TabsContextValue = {
  value: string;
  setValue: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used inside <Tabs>");
  }
  return context;
}

type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
};

const Tabs = ({ defaultValue, children, className }: TabsProps) => {
  const [value, setValue] = useState(defaultValue);
  const contextValue = useMemo(() => ({ value, setValue }), [value]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("inline-flex h-9 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-600", className)} {...props} />
);

type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

const TabsTrigger = ({ className, value, ...props }: TabsTriggerProps) => {
  const context = useTabsContext();
  const isActive = context.value === value;

  return (
    <button
      type="button"
      onClick={() => context.setValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-600",
        className
      )}
      {...props}
    />
  );
};

type TabsContentProps = ComponentPropsWithoutRef<"div"> & {
  value: string;
};

const TabsContent = ({ className, value, ...props }: TabsContentProps) => {
  const context = useTabsContext();
  if (context.value !== value) {
    return null;
  }

  return <div className={cn("mt-3", className)} {...props} />;
};

export { Tabs, TabsContent, TabsList, TabsTrigger };
