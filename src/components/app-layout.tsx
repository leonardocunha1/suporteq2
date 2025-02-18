import { useState } from "react";
import { Nav } from "@/features/navbar/nav";
import { EqualNot, HomeIcon, Sigma, Table2 } from "lucide-react";
import { Outlet } from "react-router";
import { DataCollaborator } from "./avatar";
import LogoutButton from "./ui/logout-button";

export function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`grid transition-all duration-300 text-sm ${
        isCollapsed ? "grid-cols-[4rem_1fr]" : "grid-cols-[18rem_1fr]"
      }`}
    >
      <header className="flex flex-col bg-stone-100 border-r border-stone-200">
        <Nav
          links={[
            {
              title: "Home",
              icon: HomeIcon,
              variant: "default",
              to: "home",
            },
            {
              title: "Divergências",
              icon: EqualNot,
              variant: "default",
              to: [
                {
                  title: "Transações Divergentes",
                  to: "divergences/procv",
                  icon: Table2,
                },
                {
                  title: "Valores Divergentes",
                  to: "divergences/somase",
                  icon: Sigma,
                },
              ],
            },
          ]}
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <LogoutButton isCollapsed={isCollapsed} />
      </header>
      <div>
        <aside className="flex bg-stone-100 justify-end px-4 h-[60px] border-b">
          <DataCollaborator />
        </aside>
        <main className="flex flex-col bg-stone-50 h-[calc(100dvh-60px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
