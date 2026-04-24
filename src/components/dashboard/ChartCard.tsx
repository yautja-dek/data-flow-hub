import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  delay?: number;
}

export const ChartCard = ({ title, subtitle, children, delay = 0 }: ChartCardProps) => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card rounded-2xl p-5"
  >
    <header className="mb-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </header>
    {children}
  </motion.section>
);

export default ChartCard;