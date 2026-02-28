import { cn } from "@/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface SidebarItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  items: SidebarItem[];
  title?: string;
}

export default function Sidebar({ items, title }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "relative hidden md:flex flex-col sidebar-gradient shadow-sidebar transition-all duration-300 shrink-0",
        collapsed ? "w-16" : "w-60",
      )}
    >
      {/* Brand accent dot at top */}
      <div
        className={cn(
          "flex items-center px-4 pt-5 pb-2",
          collapsed && "justify-center",
        )}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{
              background: "oklch(0.65 0.18 195)",
              boxShadow: "0 0 8px oklch(0.65 0.18 195 / 0.5)",
            }}
          />
          {!collapsed && title && (
            <span className="text-sidebar-foreground/55 text-xs font-bold uppercase tracking-widest">
              {title}
            </span>
          )}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {items.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium group relative",
                active
                  ? "bg-sidebar-primary/90 text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/65 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              )}
              style={
                active
                  ? {
                      borderLeft: "2.5px solid oklch(0.65 0.18 195)",
                      paddingLeft: "0.625rem",
                    }
                  : {}
              }
            >
              <span
                className={cn(
                  "shrink-0",
                  active
                    ? "text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/55 group-hover:text-sidebar-foreground",
                )}
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </span>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Active dot in collapsed mode */}
              {collapsed && active && (
                <span
                  className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ background: "oklch(0.65 0.18 195)" }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-border rounded-full p-1 shadow-xs hover:shadow-sm transition-shadow z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </button>
    </aside>
  );
}
