import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Landmark,
  LayoutDashboard,
  BarChart3,
  Settings,
  LogOut,
  UploadCloud,
  SearchCode,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Upload", icon: UploadCloud, to: "/upload" },
  { label: "Results", icon: BarChart3, to: "/" },
  { label: "Search", icon: SearchCode, to: "/search" },
  { label: "Settings", icon: Settings, to: "/" },
];

export const DashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isDashboard = pathname === "/";

  return (
    <header className="glass-header fixed inset-x-4 top-4 z-40 rounded-2xl px-4 py-3 md:inset-x-6 md:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo + Hamburger group with hover-reveal nav */}
        <div
          className="group/nav relative flex items-center gap-2"
          onMouseLeave={() => setMenuOpen(false)}
        >
          <Link
            to="/"
            className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-secondary/70 ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:ring-primary/50 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.4)]"
          >
            <Landmark className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
          </Link>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold tracking-tight text-foreground">Trade Pipeline</p>
            <p className="text-[11px] text-muted-foreground">Operations Console</p>
          </div>

          {/* Hamburger trigger — prominent, label visible */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            onMouseEnter={() => setMenuOpen(true)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
            className={`ml-2 flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold ring-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)] ${
              menuOpen
                ? "bg-primary text-primary-foreground ring-primary/60"
                : "bg-primary/10 text-primary ring-primary/40 hover:bg-primary/15"
            }`}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Hover/click reveal navigation panel */}
          <div
            className={`absolute left-0 top-full z-50 mt-2 min-w-[240px] origin-top-left rounded-xl border border-border/60 bg-popover/95 p-1.5 shadow-xl backdrop-blur-xl transition-all duration-200 ${
              menuOpen
                ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
            }`}
            onMouseEnter={() => setMenuOpen(true)}
          >
            <p className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </p>
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = pathname === item.to;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(item.to);
                        setMenuOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-md ring-1 transition-colors ${
                          active
                            ? "bg-primary/15 ring-primary/40"
                            : "bg-secondary/70 ring-border/60 group-hover:bg-primary/10 group-hover:ring-primary/40"
                        }`}
                      >
                        <item.icon
                          className={`h-3.5 w-3.5 transition-colors ${
                            active ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                          }`}
                        />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            aria-label="Logout"
            title="Logout"
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/60 text-foreground ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-0.5 hover:bg-destructive/10 hover:text-destructive hover:ring-destructive/50 hover:shadow-[0_0_24px_-6px_hsl(var(--destructive)/0.5)]"
          >
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </button>

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
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;