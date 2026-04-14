import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Activity, AlertTriangle, BrainCircuit, Menu, X, Wifi, ChevronRight } from "lucide-react";
import vitalTagLogo from "@/assets/vital-tag-logo.png";

const navItems = [
  { label: "Herd Overview", path: "/dashboard", icon: LayoutDashboard },
  { label: "Alerts", path: "/alerts", icon: AlertTriangle },
  { label: "AI Insights", path: "/ai-insights", icon: BrainCircuit },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumb = pathSegments.map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border/50 bg-card/40 backdrop-blur-xl shrink-0">
        <div className="h-16 flex items-center px-5 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <img src={vitalTagLogo} alt="VITAL-TAG" className="w-12 h-12 object-contain" />
          </Link>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Wifi className="w-3 h-3 text-primary" />
            <span>
              Gateway: <span className="text-primary font-medium">Online</span>
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="md:hidden fixed inset-0 bg-background/80 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 z-50 flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-5 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <img src={vitalTagLogo} alt="VITAL-TAG" className="w-10 h-10 object-contain" />
                  <span className="text-lg font-bold text-foreground">
                    VITAL<span className="text-primary">-TAG</span>
                  </span>
                </div>
                <button onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 space-y-1">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border/50 flex items-center px-4 md:px-6 gap-4 shrink-0 bg-card/40 backdrop-blur-xl">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground overflow-hidden">
            <Activity className="w-4 h-4 shrink-0" />
            {breadcrumb.map((seg, i) => (
              <span key={i} className="flex items-center gap-1 truncate">
                <ChevronRight className="w-3 h-3 shrink-0" />
                <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium truncate" : "truncate"}>{seg}</span>
              </span>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="hidden sm:inline">Live</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
