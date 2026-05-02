export const DashboardFooter = () => {
  return (
    <footer className="glass-header fixed inset-x-4 bottom-4 z-30 rounded-2xl px-6 py-3 md:inset-x-6">
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Trade Pipeline. All rights reserved.
      </p>
    </footer>
  );
};

export default DashboardFooter;