import { Link, useLocation } from "react-router-dom";
import { Landmark, LayoutDashboard, LogOut } from "lucide-react";

export const DashboardHeader = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/";

  return (
    <header className="glass-header fixed inset-x-4 top-4 z-40 rounded-2xl px-4 py-3 md:inset-x-6 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/70 ring-1 ring-border/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:ring-primary/50 group-hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.4)]">
            <Landmark className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
          </span>
          <span className="hidden lg:block">
            <p className="text-sm font-semibold tracking-tight text-foreground">Trade Pipeline</p>
            <p className="text-[11px] text-muted-foreground">Operations Console</p>
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {!isDashboard && (
            <Link
              to="/"
              aria-label="Go to Dashboard"
              title="Dashboard"
              className="group flex h-10 items-center gap-2 rounded-xl bg-primary/10 px-3 text-sm font-semibold text-primary ring-1 ring-primary/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)]"
            >
              <LayoutDashboard className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 text-foreground ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-destructive/10 hover:text-destructive hover:ring-destructive/50 hover:shadow-[0_0_24px_-6px_hsl(var(--destructive)/0.5)]"
          >
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;