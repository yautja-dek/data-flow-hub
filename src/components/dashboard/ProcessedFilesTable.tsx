import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, FileText, Download, Copy, CheckCircle2, Calendar, Database, Hash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

type Row = {
  file: string;
  date: string;
  size: string;
  records: number;
  headers: string[];
  preview: string[][];
};

const rows: Row[] = [
  {
    file: "trade_data_20231026.csv",
    date: "Apr 12, 2023, 1:30:57 PM",
    size: "2.4 MB",
    records: 12480,
    headers: ["Trade ID", "Symbol", "Side", "Quantity", "Price", "Timestamp"],
    preview: [
      ["TRD-00012", "AAPL", "BUY", "150", "$182.45", "2023-10-26 09:32:11"],
      ["TRD-00013", "MSFT", "SELL", "80", "$329.10", "2023-10-26 09:33:05"],
      ["TRD-00014", "GOOGL", "BUY", "45", "$138.22", "2023-10-26 09:35:48"],
      ["TRD-00015", "TSLA", "SELL", "120", "$212.78", "2023-10-26 09:38:12"],
      ["TRD-00016", "NVDA", "BUY", "60", "$455.90", "2023-10-26 09:41:29"],
      ["TRD-00017", "AMZN", "BUY", "30", "$128.55", "2023-10-26 09:44:02"],
      ["TRD-00018", "META", "SELL", "75", "$305.40", "2023-10-26 09:47:15"],
    ],
  },
  {
    file: "trade_data_20231102.csv",
    date: "Apr 13, 2023, 11:15:22 AM",
    size: "3.1 MB",
    records: 15820,
    headers: ["Trade ID", "Symbol", "Side", "Quantity", "Price", "Timestamp"],
    preview: [
      ["TRD-00112", "AAPL", "SELL", "200", "$184.10", "2023-11-02 09:30:45"],
      ["TRD-00113", "MSFT", "BUY", "100", "$331.25", "2023-11-02 09:32:18"],
      ["TRD-00114", "GOOGL", "SELL", "60", "$140.05", "2023-11-02 09:35:30"],
      ["TRD-00115", "TSLA", "BUY", "150", "$215.40", "2023-11-02 09:38:55"],
      ["TRD-00116", "NVDA", "SELL", "40", "$460.20", "2023-11-02 09:42:11"],
    ],
  },
  {
    file: "trade_data_20231105.csv",
    date: "Apr 14, 2023, 09:05:41 AM",
    size: "1.8 MB",
    records: 9420,
    headers: ["Trade ID", "Symbol", "Side", "Quantity", "Price", "Timestamp"],
    preview: [
      ["TRD-00212", "AAPL", "BUY", "90", "$185.75", "2023-11-05 09:31:02"],
      ["TRD-00213", "MSFT", "BUY", "120", "$333.50", "2023-11-05 09:33:44"],
      ["TRD-00214", "GOOGL", "SELL", "55", "$141.80", "2023-11-05 09:36:19"],
      ["TRD-00215", "TSLA", "SELL", "100", "$217.95", "2023-11-05 09:39:27"],
    ],
  },
  {
    file: "trade_data_20231105.csv",
    date: "Apr 14, 2023, 09:05:41 AM",
    size: "1.8 MB",
    records: 9420,
    headers: ["Trade ID", "Symbol", "Side", "Quantity", "Price", "Timestamp"],
    preview: [
      ["TRD-00312", "AAPL", "SELL", "110", "$186.20", "2023-11-05 13:01:14"],
      ["TRD-00313", "MSFT", "BUY", "70", "$334.10", "2023-11-05 13:04:22"],
      ["TRD-00314", "GOOGL", "BUY", "85", "$142.45", "2023-11-05 13:07:38"],
    ],
  },
];

export const ProcessedFilesTable = () => {
  const [selected, setSelected] = useState<Row | null>(null);

  const handleCopy = () => {
    if (!selected) return;
    const csv = [selected.headers.join(","), ...selected.preview.map((r) => r.join(","))].join("\n");
    navigator.clipboard.writeText(csv);
    toast({ title: "Copied to clipboard", description: `${selected.file} preview data copied.` });
  };

  return (
    <section className="glass-card rounded-2xl p-6">
      <header className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Successfully Processed Files</h2>
      </header>

      <div className="overflow-hidden rounded-xl border border-border/50">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">File Name</th>
              <th className="px-5 py-3 font-medium">Upload Date &amp; Time</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-t border-border/40 transition hover:bg-secondary/30"
              >
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setSelected(row)}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {row.file}
                  </button>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{row.date}</td>
                <td className="px-5 py-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-semibold text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Success
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <TooltipProvider delayDuration={150}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setSelected(row)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary hover:text-primary hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.6)]"
                        >
                          <Eye className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-110" />
                          View
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        Preview file contents
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
        <span>Pages</span>
        <span className="rounded-md border border-border/60 bg-secondary/60 px-2.5 py-1 text-foreground">1</span>
        <span>of 25</span>
        <button
          type="button"
          className="ml-1 flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-secondary/40 text-foreground transition hover:bg-secondary"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border/60 bg-secondary/40 text-foreground transition hover:bg-secondary"
          aria-label="Next page"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-4xl border-border/60 bg-popover/95 p-0 backdrop-blur-xl">
          {selected && (
            <>
              <DialogHeader className="border-b border-border/50 p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <DialogTitle className="truncate text-lg font-semibold text-foreground">
                      {selected.file}
                    </DialogTitle>
                    <DialogDescription className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {selected.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Database className="h-3 w-3" />
                        {selected.size}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Hash className="h-3 w-3" />
                        {selected.records.toLocaleString()} records
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2 py-0.5 font-semibold text-success">
                        <CheckCircle2 className="h-3 w-3" />
                        Success
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="px-6 pb-2 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Preview · First {selected.preview.length} rows
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_-6px_hsl(var(--primary)/0.6)]"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_-6px_hsl(var(--primary)/0.8)]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>

                <ScrollArea className="h-[400px] rounded-xl border border-border/50">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-secondary/80 text-left text-xs uppercase tracking-wide text-muted-foreground backdrop-blur">
                      <tr>
                        <th className="px-4 py-3 font-medium">#</th>
                        {selected.headers.map((h) => (
                          <th key={h} className="px-4 py-3 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selected.preview.map((row, i) => (
                        <tr
                          key={i}
                          className="border-t border-border/40 transition hover:bg-secondary/30"
                        >
                          <td className="px-4 py-3 text-xs text-muted-foreground">{i + 1}</td>
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-foreground">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </div>

              <div className="flex items-center justify-between border-t border-border/50 px-6 py-3 text-xs text-muted-foreground">
                <span>
                  Showing {selected.preview.length} of {selected.records.toLocaleString()} records
                </span>
                <span className="font-mono">CSV · UTF-8</span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProcessedFilesTable;