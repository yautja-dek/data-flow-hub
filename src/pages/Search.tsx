import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search as SearchIcon,
  RotateCcw,
  ChevronRight,
  FileText,
  Calendar as CalendarIcon,
  FileSearch,
  Eye,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

type ResultStatus = "completed" | "processing" | "failed" | "queued";

interface FileResult {
  id: string;
  name: string;
  uploadDate: string;
  status: ResultStatus;
}

const MOCK_DATA: FileResult[] = [
  { id: "FP-1042", name: "trades_2024_q4.csv", uploadDate: "2024-12-18 09:14", status: "completed" },
  { id: "FP-1041", name: "fx_settlements_dec.csv", uploadDate: "2024-12-17 17:42", status: "processing" },
  { id: "FP-1040", name: "equity_book_eod.csv", uploadDate: "2024-12-17 16:05", status: "completed" },
  { id: "FP-1039", name: "swaps_reconciliation.csv", uploadDate: "2024-12-16 11:28", status: "failed" },
  { id: "FP-1038", name: "cash_ladder_nov.csv", uploadDate: "2024-12-15 08:51", status: "queued" },
  { id: "FP-1037", name: "options_expiries.csv", uploadDate: "2024-12-14 14:33", status: "completed" },
];

const statusBadge = (status: ResultStatus) => {
  const map = {
    completed: {
      label: "Completed",
      icon: CheckCircle2,
      cls: "bg-success-soft text-success ring-success/30",
    },
    processing: {
      label: "Processing",
      icon: Loader2,
      cls: "bg-primary/10 text-primary ring-primary/30",
      spin: true,
    },
    failed: {
      label: "Failed",
      icon: AlertCircle,
      cls: "bg-error-soft text-error ring-destructive/30",
    },
    queued: {
      label: "Queued",
      icon: Clock,
      cls: "bg-secondary text-muted-foreground ring-border/60",
    },
  } as const;
  return map[status];
};

const Search = () => {
  const [fileId, setFileId] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<string>("any");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<FileResult[]>([]);

  const reset = () => {
    setFileId("");
    setFileName("");
    setStatus("any");
    setStartDate("");
    setEndDate("");
    setResults([]);
    setHasSearched(false);
  };

  const filtered = useMemo(() => {
    return MOCK_DATA.filter((r) => {
      if (fileId && !r.id.toLowerCase().includes(fileId.toLowerCase())) return false;
      if (fileName && !r.name.toLowerCase().includes(fileName.toLowerCase())) return false;
      if (status !== "any" && r.status !== status) return false;
      if (startDate && r.uploadDate.slice(0, 10) < startDate) return false;
      if (endDate && r.uploadDate.slice(0, 10) > endDate) return false;
      return true;
    });
  }, [fileId, fileName, status, startDate, endDate]);

  const onSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setResults(filtered);
      setHasSearched(true);
      setIsSearching(false);
      toast({
        title: "Search complete",
        description: `${filtered.length} result${filtered.length === 1 ? "" : "s"} found.`,
      });
    }, 450);
  };

  return (
    <div className="theme-transition min-h-screen pb-24 pt-24">
      <DashboardHeader />

      <main className="mx-auto w-full max-w-[1400px] px-4 md:px-6">
        {/* Page header / breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6 flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Search Files
          </h1>
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-primary">Search</span>
          </nav>
        </motion.div>

        {/* Filters card */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="glass-card relative overflow-hidden rounded-2xl p-5 md:p-7"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* File ID */}
            <div className="space-y-2">
              <Label htmlFor="file-id" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                File ID
              </Label>
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="file-id"
                  value={fileId}
                  onChange={(e) => setFileId(e.target.value)}
                  placeholder="Enter File ID"
                  className="h-11 rounded-xl border-border/60 bg-secondary/40 pl-9 text-sm focus-visible:ring-primary/40"
                />
              </div>
            </div>

            {/* File Name */}
            <div className="space-y-2">
              <Label htmlFor="file-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                File Name
              </Label>
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="file-name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Enter File Name"
                  className="h-11 rounded-xl border-border/60 bg-secondary/40 pl-9 text-sm focus-visible:ring-primary/40"
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                File Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-11 rounded-xl border-border/60 bg-secondary/40 text-sm focus:ring-primary/40">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="any">Any Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="queued">Queued</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Start Date
              </Label>
              <div className="relative">
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-secondary/40 pl-9 text-sm focus-visible:ring-primary/40"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                End Date
              </Label>
              <div className="relative">
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-secondary/40 pl-9 text-sm focus-visible:ring-primary/40"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-end gap-3">
              <Button
                onClick={onSearch}
                disabled={isSearching}
                className="group h-11 flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_hsl(var(--primary)/0.7)]"
              >
                {isSearching ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <SearchIcon className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                )}
                Search
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="h-11 flex-1 rounded-xl border-border/60 bg-secondary/30 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-secondary/60 hover:text-primary"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Results card */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card mt-6 overflow-hidden rounded-2xl p-5 md:p-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Search Results</h2>
              <p className="text-xs text-muted-foreground">
                {hasSearched ? `${results.length} result${results.length === 1 ? "" : "s"} found` : "Run a search to view results"}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60 bg-secondary/20">
            <Table>
              <TableHeader>
                <TableRow className="border-border/60 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    File ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    File Name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Upload Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </TableHead>
                  <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="wait">
                  {hasSearched && results.length > 0 ? (
                    results.map((r, idx) => {
                      const badge = statusBadge(r.status);
                      const Icon = badge.icon;
                      return (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.03 }}
                          className="border-b border-border/40 transition-colors hover:bg-secondary/40"
                        >
                          <TableCell className="font-mono text-xs font-medium text-foreground">
                            {r.id}
                          </TableCell>
                          <TableCell className="text-sm font-medium text-foreground">
                            {r.name}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {r.uploadDate}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${badge.cls}`}
                            >
                              <Icon className={`h-3 w-3 ${"spin" in badge && badge.spin ? "animate-spin" : ""}`} />
                              {badge.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                className="group flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                                aria-label="View"
                              >
                                <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                              </button>
                              <button
                                className="group flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                                aria-label="Download"
                              >
                                <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
                              </button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center px-6 py-16 text-center"
                        >
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                            <FileSearch className="h-8 w-8 text-primary/70" />
                          </div>
                          <p className="text-base font-semibold text-foreground">
                            {hasSearched ? "No matching results" : "No results to display"}
                          </p>
                          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            {hasSearched
                              ? "Try adjusting your filters or resetting the search."
                              : "Enter search criteria and click Search to view results."}
                          </p>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </motion.section>
      </main>

      <DashboardFooter />
    </div>
  );
};

export default Search;