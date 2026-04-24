import { Landmark, Github, Twitter, Linkedin } from "lucide-react";

const links = {
  product: [
    { label: "Dashboard", href: "#" },
    { label: "Results", href: "#" },
    { label: "Logs", href: "#" },
    { label: "Settings", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Status", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Security", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export const DashboardFooter = () => {
  return (
    <footer className="mx-4 mt-10 md:mx-6">
      <div className="glass-card rounded-2xl px-6 py-8 md:px-10 md:py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary ring-1 ring-border">
                <Landmark className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Trade Pipeline</p>
                <p className="text-[11px] text-muted-foreground">Operations Console</p>
              </div>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Real-time monitoring and processing analytics for enterprise data pipelines.
            </p>
          </div>

          <FooterColumn title="Product" items={links.product} />
          <FooterColumn title="Resources" items={links.resources} />
          <FooterColumn title="Company" items={links.company} />
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Trade Pipeline. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <SocialIcon Icon={Github} label="GitHub" />
            <SocialIcon Icon={Twitter} label="Twitter" />
            <SocialIcon Icon={Linkedin} label="LinkedIn" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) => (
  <div>
    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
      {title}
    </h4>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({
  Icon,
  label,
}: {
  Icon: typeof Github;
  label: string;
}) => (
  <a
    href="#"
    aria-label={label}
    className="group flex h-9 w-9 items-center justify-center rounded-xl bg-secondary ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:ring-primary/50 hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.5)]"
  >
    <Icon className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
  </a>
);

export default DashboardFooter;