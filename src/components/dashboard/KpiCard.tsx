import { motion } from "framer-motion";
import { FileText, TrendingUp, TrendingDown, Gauge, type LucideIcon } from "lucide-react";

type Variant = "neutral" | "success" | "error" | "info";

interface KpiCardProps {
  label: string;
  value: string;
  variant?: Variant;
  icon?: "file" | "trend-up" | "trend-down" | "gauge";
  badge?: { label: string; tone: "success" | "error" };
  animateArrow?: boolean;
  delay?: number;
}

const iconMap: Record<NonNullable<KpiCardProps["icon"]>, LucideIcon> = {
  file: FileText,
  "trend-up": TrendingUp,
  "trend-down": TrendingDown,
  gauge: Gauge,
};

const variantRing: Record<Variant, string> = {
  neutral: "ring-border/60",
  success: "ring-success/30 shadow-[0_0_40px_-10px_hsl(var(--success)/0.35)]",
  error: "ring-error/30 shadow-[0_0_40px_-10px_hsl(var(--error)/0.30)]",
  info: "ring-border/60",
};

const iconTone: Record<Variant, string> = {
  neutral: "text-muted-foreground",
  success: "text-success",
  error: "text-error",
  info: "text-foreground/70",
};

const iconWrapTone: Record<Variant, string> = {
  neutral:
    "bg-secondary/60 ring-border/60 group-hover:bg-secondary group-hover:ring-foreground/30 group-hover:shadow-[0_0_24px_-6px_hsl(210_40%_98%/0.25)]",
  success:
    "bg-success-soft/60 ring-success/30 group-hover:bg-success-soft group-hover:ring-success/60 group-hover:shadow-[0_0_28px_-6px_hsl(var(--success)/0.55)]",
  error:
    "bg-error-soft/60 ring-error/30 group-hover:bg-error-soft group-hover:ring-error/60 group-hover:shadow-[0_0_28px_-6px_hsl(var(--error)/0.5)]",
  info: "bg-secondary/60 ring-border/60 group-hover:bg-secondary group-hover:ring-foreground/30 group-hover:shadow-[0_0_24px_-6px_hsl(199_89%_70%/0.45)]",
};

export const KpiCard = ({
  label,
  value,
  variant = "neutral",
  icon = "file",
  badge,
  animateArrow = false,
  delay = 0,
}: KpiCardProps) => {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`glass-card group relative overflow-hidden rounded-2xl p-5 ring-1 transition-all duration-300 hover:-translate-y-0.5 ${variantRing[variant]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${iconWrapTone[variant]}`}
        >
          <Icon
            className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${iconTone[variant]}`}
          />
        </div>
      </div>
      {badge && (
        <div className="mt-3 inline-flex">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              badge.tone === "success"
                ? "bg-success-soft text-success"
                : "bg-error-soft text-error"
            }`}
          >
            {badge.label}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default KpiCard;