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
      className={`glass-card relative overflow-hidden rounded-2xl p-5 ring-1 ${variantRing[variant]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div className={`flex items-center gap-2`}>
          <Icon
            className={`h-6 w-6 ${iconTone[variant]} ${animateArrow ? "animate-soft-bounce" : ""}`}
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