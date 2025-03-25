import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { LogOut } from "lucide-react";

const LogoutButton = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { logout } = useAuthStore();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "mt-auto p-4 flex gap-2 text-sm items-center cursor-pointer",
              isCollapsed && "justify-center"
            )}
            onClick={() => logout()}
          >
            <LogOut />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">Sair</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

export default LogoutButton;
