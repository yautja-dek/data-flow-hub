import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import SideNav from "@/components/dashboard/SideNav";
import ChartCard from "@/components/dashboard/ChartCard";
import KpiCard from "@/components/dashboard/KpiCard";
import RecordDistribution from "@/components/dashboard/charts/RecordDistribution";
import FileProcessingBars from "@/components/dashboard/charts/FileProcessingBars";
import ProcessingTrend from "@/components/dashboard/charts/ProcessingTrend";
import ProcessedFilesTable from "@/components/dashboard/ProcessedFilesTable";

const Index = () => {
  return (
    <div className="theme-transition min-h-screen pb-24 pt-24">
      <DashboardHeader />
      <SideNav />

      <main className="mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:pl-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Overview of file processing activity and pipeline health.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard title="Record Processing Distribution" delay={0.05}>
            <RecordDistribution />
          </ChartCard>
          <ChartCard title="File Processing Counts (Daily)" delay={0.1}>
            <FileProcessingBars />
          </ChartCard>
          <ChartCard title="Processing Trend (Weekly)" subtitle="Total processing time" delay={0.15}>
            <ProcessingTrend />
          </ChartCard>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard label="Total Files Uploaded" value="1,245" icon="file" variant="neutral" delay={0.05} />
          <KpiCard
            label="Successfully Processed"
            value="1,180"
            icon="trend-up"
            variant="success"
            badge={{ label: "Succ", tone: "success" }}
            animateArrow
            delay={0.1}
          />
          <KpiCard
            label="Failed Records"
            value="65"
            icon="trend-down"
            variant="error"
            badge={{ label: "Error", tone: "error" }}
            animateArrow
            delay={0.15}
          />
          <KpiCard label="Processing Percentage" value="94.8%" icon="gauge" variant="info" delay={0.2} />
        </div>

        <div className="mt-6">
          <ProcessedFilesTable />
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
};

export default Index;
