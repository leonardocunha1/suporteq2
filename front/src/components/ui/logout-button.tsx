import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";

const LogoutButton = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "mt-auto p-4 flex gap-2 text-sm items-center cursor-pointer",
            isCollapsed && "justify-center"
          )}
          onClick={() => console.log("Fazer Logout")}
        >
          <LogOut />
          {!isCollapsed && <span>Sair</span>}
        </div>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">
          Sair
        </TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
);

export default LogoutButton;
