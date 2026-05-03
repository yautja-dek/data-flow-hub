import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, FileText, Info, Sparkles, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import SideNav from "@/components/dashboard/SideNav";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

type FileStatus = "queued" | "uploading" | "done" | "error";

interface QueuedFile {
  id: string;
  file: File;
  progress: number;
  status: FileStatus;
}

const MAX_SIZE = 100 * 1024 * 1024; // 100MB

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndAdd = useCallback((incoming: FileList | File[]) => {
    const accepted: QueuedFile[] = [];
    Array.from(incoming).forEach((f) => {
      const isCsv = f.type === "text/csv" || f.name.toLowerCase().endsWith(".csv");
      if (!isCsv) {
        toast({ title: "Unsupported file", description: `${f.name} is not a CSV.`, variant: "destructive" });
        return;
      }
      if (f.size > MAX_SIZE) {
        toast({ title: "File too large", description: `${f.name} exceeds 100MB.`, variant: "destructive" });
        return;
      }
      accepted.push({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file: f,
        progress: 0,
        status: "queued",
      });
    });
    if (accepted.length) setFiles((prev) => [...prev, ...accepted]);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files?.length) validateAndAdd(e.dataTransfer.files);
    },
    [validateAndAdd],
  );

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const startUpload = () => {
    const queued = files.filter((f) => f.status === "queued");
    if (!queued.length) {
      toast({ title: "Nothing to upload", description: "Add at least one CSV file first." });
      return;
    }
    queued.forEach((qf) => {
      setFiles((prev) => prev.map((p) => (p.id === qf.id ? { ...p, status: "uploading" } : p)));
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((p) => {
            if (p.id !== qf.id) return p;
            const next = Math.min(100, p.progress + Math.random() * 18 + 6);
            const done = next >= 100;
            if (done) clearInterval(interval);
            return { ...p, progress: next, status: done ? "done" : "uploading" };
          }),
        );
      }, 250);
    });
  };

  const totalSize = files.reduce((s, f) => s + f.file.size, 0);

  return (
    <div className="theme-transition min-h-screen pb-24 pt-24">
      <DashboardHeader />
      <SideNav />

      <main className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:pl-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card relative overflow-hidden rounded-3xl px-6 py-10 md:px-12 md:py-14"
        >
          {/* Decorative gradient blobs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-warning/10 blur-3xl" />

          {/* Header */}
          <div className="relative mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Upload New Trade Files
            </h1>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4 text-primary" />
              <span>Securely upload your trade data for processing.</span>
            </div>
          </div>

          {/* Dropzone */}
          <div className="relative mx-auto w-full max-w-3xl">
            <motion.div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              animate={{ scale: isDragging ? 1.01 : 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className={`group relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 md:p-14 ${
                isDragging
                  ? "border-primary bg-primary/5 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]"
                  : "border-primary/40 bg-secondary/30 hover:border-primary/70 hover:bg-secondary/50"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && validateAndAdd(e.target.files)}
              />

              <motion.div
                animate={{ y: isDragging ? -6 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:ring-primary/60"
              >
                <CloudUpload className="h-10 w-10 text-primary" />
              </motion.div>

              <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Drag &amp; Drop your files here
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Supporting CSV files only (max 100MB per file).
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                browse
              </button>
            </motion.div>
          </div>

          {/* File list */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="relative mx-auto mt-8 w-full max-w-3xl"
              >
                <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {files.length} file{files.length > 1 ? "s" : ""} • {formatBytes(totalSize)}
                  </span>
                  <button
                    onClick={() => setFiles([])}
                    className="text-xs font-medium text-muted-foreground hover:text-destructive"
                  >
                    Clear all
                  </button>
                </div>

                <ul className="space-y-2">
                  {files.map((f) => (
                    <motion.li
                      key={f.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="glass-card flex items-center gap-3 rounded-xl px-4 py-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-success-soft text-success">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-medium text-foreground">{f.file.name}</p>
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {formatBytes(f.file.size)}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <Progress value={f.progress} className="h-1.5 flex-1" />
                          <span className="w-20 text-right text-[11px] font-medium">
                            {f.status === "done" && (
                              <span className="inline-flex items-center gap-1 text-success">
                                <CheckCircle2 className="h-3 w-3" /> Done
                              </span>
                            )}
                            {f.status === "uploading" && (
                              <span className="inline-flex items-center gap-1 text-primary">
                                <Loader2 className="h-3 w-3 animate-spin" /> {Math.round(f.progress)}%
                              </span>
                            )}
                            {f.status === "queued" && (
                              <span className="text-muted-foreground">Queued</span>
                            )}
                            {f.status === "error" && (
                              <span className="inline-flex items-center gap-1 text-destructive">
                                <AlertCircle className="h-3 w-3" /> Error
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(f.id)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button */}
          <div className="relative mt-8 flex justify-center">
            <Button
              onClick={startUpload}
              size="lg"
              className="group relative h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-8 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_hsl(var(--primary)/0.7)]"
            >
              <FileText className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Upload Files
            </Button>
          </div>

          {/* Sparkle accent */}
          <div className="pointer-events-none absolute bottom-6 right-6 hidden md:block">
            <Sparkles className="h-6 w-6 text-primary/60" />
          </div>
        </motion.div>
      </main>

      <DashboardFooter />
    </div>
  );
};

export default Upload;