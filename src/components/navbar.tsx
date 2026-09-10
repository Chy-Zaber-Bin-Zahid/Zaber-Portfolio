import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { navIcons, type NavIconKey } from "@/components/nav-icons";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface NavLink {
  href: string;
  label: string;
  icon: NavIconKey;
}

interface NavbarProps {
  items: readonly NavLink[];
  socials: readonly NavLink[];
}

const ICON_BUTTON_CLASS =
  "rounded-3xl cursor-pointer size-full bg-background p-0 text-muted-foreground hover:text-foreground hover:bg-muted backdrop-blur-3xl border border-border transition-colors";

const TOOLTIP_CLASS =
  "rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]";

function DockLink({ href, label, icon }: NavLink) {
  const isExternal = href.startsWith("http");
  const Icon = navIcons[icon];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          aria-label={label}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          <DockIcon className={ICON_BUTTON_CLASS}>
            <Icon className="size-full rounded-sm overflow-hidden object-contain" />
          </DockIcon>
        </a>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

function DockSeparator() {
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      className="h-2/3 m-auto w-px shrink-0 bg-border"
    />
  );
}

export default function Navbar({ items, socials }: NavbarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
        <Dock className="z-50 pointer-events-auto relative h-14 p-2 w-fit mx-auto flex gap-2 border bg-card/90 backdrop-blur-3xl shadow-[0_0_10px_3px] shadow-primary/5">
          {items.map((item) => (
            <DockLink key={item.href} {...item} />
          ))}
          <DockSeparator />
          {socials.map((social) => (
            <DockLink key={social.href} {...social} />
          ))}
          <DockSeparator />
          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon className={ICON_BUTTON_CLASS}>
                <ModeToggle className="size-full cursor-pointer" />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className={TOOLTIP_CLASS}>
              <p>Theme</p>
              <TooltipArrow className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </Dock>
      </div>
    </TooltipProvider>
  );
}
