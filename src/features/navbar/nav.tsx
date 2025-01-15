import { LucideIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router";
import { BorderBeam } from "@/components/ui/border-beam";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavProps {
  links: NavLinkProps[];
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

interface NavLinkProps {
  title: string;
  label?: string;
  to: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
}

const NavHeader = ({
  isCollapsed,
  toggleCollapse,
}: {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}) => (
  <div className="border-b">
    <div
      className={cn(
        "flex items-center h-[59px] px-4",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      <Menu className="cursor-pointer" onClick={toggleCollapse} />
      {!isCollapsed && (
        <h2 className="flex items-end gap-1 px-2">
          <div className="text-blue-600 font-semibold">
            <span className="text-xl">Q</span>
            <span className="text-sm">2</span>
          </div>
          Ingressos
        </h2>
      )}
    </div>
  </div>
);

const NavItem = ({
  link,
  isCollapsed,
}: {
  link: NavLinkProps;
  isCollapsed: boolean;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <NavLink
          to={link.to}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: link.variant }),
              link.variant === "default" &&
                "w-full bg-transparent text-stone-900 font-semibold hover:bg-blue-500 hover:text-stone-50 border-none shadow-none",
              isActive && "bg-blue-500 text-stone-50",
              isCollapsed ? "justify-center" : "justify-start"
            )
          }
        >
          <link.icon className={cn("h-7 w-7", isCollapsed ? "" : "mr-2")} />
          {!isCollapsed && link.title}
          {link.label && !isCollapsed && <span>{link.label}</span>}
        </NavLink>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">
          {link.title}
        </TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
);


const NavList = ({
  links,
  isCollapsed,
}: {
  links: NavLinkProps[];
  isCollapsed: boolean;
}) => (
  <nav className={cn("grid gap-1 overflow-y-auto overflow-x-hidden", isCollapsed ? 'px-2' : 'px-4')}>
    {links.map((link, index) => (
      <NavItem key={index} link={link} isCollapsed={isCollapsed} />
    ))}
  </nav>
);

export function Nav({ links, isCollapsed, toggleCollapse }: NavProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <NavHeader isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      {!isCollapsed && (
        <div className="px-4">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-md">
            <span className="text-sm font-semibold py-3">Suporte T.I</span>
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      )}
      <NavList links={links} isCollapsed={isCollapsed} />
    </section>
  );
}
