import { LucideIcon, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface NavProps {
  links: NavLinkProps[];
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

interface NavLinkProps {
  title: string;
  label?: string;
  to: string | NavLinkAccordionProps[];
  icon: LucideIcon;
  variant: "default" | "ghost";
}

interface NavLinkAccordionProps {
  title: string;
  to: string;
  icon: LucideIcon;
}

export function Nav({ links, isCollapsed, toggleCollapse }: NavProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 transition-all duration-300",
        isCollapsed ? "w-16" : "w-[100%]"
      )}
    >
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

const NavList = ({
  links,
  isCollapsed,
}: {
  links: NavLinkProps[];
  isCollapsed: boolean;
}) => (
  <nav
    className={cn(
      "grid gap-1 overflow-y-auto overflow-x-hidden",
      isCollapsed ? "px-2" : "px-4"
    )}
  >
    {links.map((link, index) => (
      <NavItem key={index} link={link} isCollapsed={isCollapsed} />
    ))}
  </nav>
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
        {Array.isArray(link.to) ? (
          <Accordion type="single" collapsible className="border-none">
            <AccordionItem value={`accordion-${link.title}`} className="border-none">
              <AccordionTrigger
                className={cn(
                  { variant: link.variant },
                  " hover:bg-blue-500 hover:text-stone-50 rounded-md hover:no-underline py-2",
                  isCollapsed ? " [&>svg]:hidden justify-center" : "pl-4 "
                )}
              >
                <div className="flex gap-3 items-center">
                  <link.icon className="h-4 w-4" />
                  {!isCollapsed && link.title}
                </div>
              </AccordionTrigger>
              {link.to.map((item, index) => (
                <AccordionContent
                  key={index}
                  className={cn("pb-0 mb-1", isCollapsed ? "pl-0" : "pl-4")}
                >
                  <NavItemLink
                    to={item.to}
                    title={item.title}
                    icon={item.icon}
                    variant={link.variant}
                    isCollapsed={isCollapsed}
                  />
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        ) : (
          <NavItemLink
            to={link.to}
            title={link.title}
            icon={link.icon}
            variant={link.variant}
            isCollapsed={isCollapsed}
          />
        )}
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">{link.title}</TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
);

const NavItemLink = ({
  to,
  title,
  icon: Icon,
  variant,
  isCollapsed,
}: {
  to: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant: "default" | "ghost";
  isCollapsed: boolean;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        buttonVariants({ variant }),
        variant === "default" &&
          "w-full bg-transparent text-stone-800 hover:bg-blue-500 hover:text-stone-50 border-none shadow-none gap-1",
        isActive && "bg-blue-500 text-stone-50",
        isCollapsed ? "justify-center" : "justify-start"
      )
    }
  >
    {Icon && <Icon className={cn("h-4 w-4", isCollapsed ? "" : "mr-2")} />}
    {!isCollapsed && title}
  </NavLink>
);
