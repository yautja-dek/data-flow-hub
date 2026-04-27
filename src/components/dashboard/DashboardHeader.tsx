import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, Landmark, ChevronDown, LayoutDashboard, BarChart3, FileText, Settings, LogOut, Sun, Moon, UploadCloud } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Upload", icon: UploadCloud, to: "/upload" },
  { label: "Results", icon: BarChart3, to: "/" },
  { label: "Logs", icon: FileText, to: "/" },
  { label: "Settings", icon: Settings, to: "/" },
];

export const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="glass-header sticky top-4 z-30 mx-4 rounded-2xl px-4 py-3 md:mx-6 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-secondary/70 ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:ring-primary/50 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.4)]"
          >
            <Landmark className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
          </Link>
          <div className="hidden md:block">
            <p className="text-sm font-semibold tracking-tight text-foreground">Trade Pipeline</p>
            <p className="text-[11px] text-muted-foreground">Operations Console</p>
          </div>
        </div>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files, records, batches…"
            className="h-10 rounded-xl border-border/60 bg-secondary/40 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-primary/40"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 text-foreground ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:ring-primary/50 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.5)]"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            )}
          </button>

          <button
            type="button"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 text-foreground ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:ring-warning/50 hover:shadow-[0_0_24px_-6px_hsl(var(--warning)/0.5)]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:text-warning" />
            <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              1
            </span>
          </button>

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-3 rounded-xl bg-secondary/40 px-2 py-1.5 ring-1 ring-border/60 transition hover:bg-secondary/70"
              >
                <Avatar className="h-9 w-9 ring-2 ring-primary/30">
                  <AvatarImage src="https://i.pravatar.cc/80?img=47" alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-semibold leading-tight text-foreground">Sarah Chen</p>
                  <p className="text-[11px] leading-tight text-muted-foreground">Admin</p>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-56 rounded-xl border-border/60 bg-popover/90 p-1.5 backdrop-blur-xl"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                Navigation
              </DropdownMenuLabel>
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => navigate(item.to)}
                  className="cursor-pointer rounded-lg px-2 py-2 text-sm focus:bg-secondary"
                >
                  <item.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  {item.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-1 bg-border/60" />
              <DropdownMenuItem className="cursor-pointer rounded-lg px-2 py-2 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;