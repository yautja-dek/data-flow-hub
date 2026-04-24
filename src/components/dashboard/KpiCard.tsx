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
  neutral: "ring-border hover:ring-foreground/20 hover:shadow-[0_12px_40px_-12px_hsl(var(--foreground)/0.18)]",
  success: "ring-success/40 shadow-[0_8px_30px_-12px_hsl(var(--success)/0.35)] hover:shadow-[0_14px_44px_-12px_hsl(var(--success)/0.45)]",
  error: "ring-error/40 shadow-[0_8px_30px_-12px_hsl(var(--error)/0.30)] hover:shadow-[0_14px_44px_-12px_hsl(var(--error)/0.4)]",
  info: "ring-border hover:ring-primary/40 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.25)]",
};

const iconTone: Record<Variant, string> = {
  neutral: "text-muted-foreground",
  success: "text-success",
  error: "text-error",
  info: "text-foreground/70",
};

const iconWrapTone: Record<Variant, string> = {
  neutral:
    "bg-secondary ring-border group-hover:ring-foreground/30 group-hover:shadow-[0_0_24px_-6px_hsl(var(--foreground)/0.25)]",
  success:
    "bg-success-soft ring-success/40 group-hover:ring-success group-hover:shadow-[0_0_28px_-6px_hsl(var(--success)/0.55)]",
  error:
    "bg-error-soft ring-error/40 group-hover:ring-error group-hover:shadow-[0_0_28px_-6px_hsl(var(--error)/0.5)]",
  info: "bg-secondary ring-border group-hover:ring-primary/50 group-hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.45)]",
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