import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, UploadCloud, BarChart3, SearchCode, Menu, X } from "lucide-react";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Upload", icon: UploadCloud, to: "/upload" },
  { label: "Results", icon: BarChart3, to: "/" },
  { label: "Search", icon: SearchCode, to: "/search" },
];

export const SideNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`glass-header fixed left-4 top-28 z-30 flex flex-col rounded-2xl py-3 transition-all duration-300 ease-out ${
        open
          ? "w-52 px-3 opacity-100 shadow-[0_18px_40px_-18px_hsl(var(--primary)/0.35)]"
          : "w-14 px-2 opacity-50 hover:opacity-80"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-expanded={open}
        className="mb-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary ring-1 ring-primary/40 transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        {open && <span className="text-xs font-semibold uppercase tracking-wider">Menu</span>}
      </button>

      <nav className="flex flex-col gap-1.5">
        {items.map((it) => (
          <NavLink
            key={it.label}
            to={it.to}
            end={it.to === "/"}
            title={it.label}
            className={({ isActive }) =>
              `group flex h-10 items-center gap-3 rounded-xl px-2.5 text-sm font-medium ring-1 transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary ring-primary/40"
                  : "bg-transparent text-muted-foreground ring-transparent hover:bg-secondary hover:text-foreground hover:ring-border/60"
              } ${open ? "justify-start" : "justify-center"}`
            }
          >
            <it.icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
                open ? "w-auto opacity-100" : "w-0 opacity-0"
              }`}
            >
              {it.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideNav;
