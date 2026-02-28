import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  CheckCircle,
  Clock,
  GitBranch,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { AvailabilityBadge } from "../../components/Badges";
import {
  sampleJobListings,
  samplePipelineEntries,
  sampleTeachers,
} from "../../sampleData";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Candidates",
      value: sampleTeachers.length.toString(),
      icon: <Users className="h-5 w-5" />,
      color: "text-primary",
      bg: "bg-primary/10",
      change: "+4 this week",
      accentColor: "oklch(0.24 0.09 255)",
    },
    {
      label: "Active Listings",
      value: sampleJobListings
        .filter((j) => j.status === "Open")
        .length.toString(),
      icon: <Briefcase className="h-5 w-5" />,
      color: "text-emerald-700",
      bg: "bg-emerald-100",
      change: "Across 4 countries",
      accentColor: "oklch(0.60 0.18 145)",
    },
    {
      label: "Placements This Month",
      value: "3",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-teal",
      bg: "bg-teal/10",
      change: "+12% vs last month",
      accentColor: "oklch(0.65 0.18 195)",
    },
    {
      label: "Pending Approvals",
      value: "2",
      icon: <Clock className="h-5 w-5" />,
      color: "text-amber",
      bg: "bg-amber/10",
      change: "Schools awaiting review",
      accentColor: "oklch(0.78 0.17 65)",
    },
  ];

  const quickActions = [
    {
      label: "Candidate DB",
      icon: <Users className="h-4 w-4" />,
      to: "/admin/candidates",
      color: "text-primary",
      iconBg: "bg-primary/10",
    },
    {
      label: "School Approvals",
      icon: <Building2 className="h-4 w-4" />,
      to: "/admin/clients",
      color: "text-amber",
      iconBg: "bg-amber/10",
    },
    {
      label: "Pipeline",
      icon: <GitBranch className="h-4 w-4" />,
      to: "/admin/pipeline",
      color: "text-teal",
      iconBg: "bg-teal/10",
    },
    {
      label: "Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      to: "/admin/analytics",
      color: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      label: "Activity Log",
      icon: <Activity className="h-4 w-4" />,
      to: "/admin/activity-log",
      color: "text-muted-foreground",
      iconBg: "bg-muted",
    },
    {
      label: "Talent Pools",
      icon: <TrendingUp className="h-4 w-4" />,
      to: "/admin/talent-pools",
      color: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Agency control center — manage candidates, schools, and placements.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-xl p-5 relative overflow-hidden shadow-stat"
            style={{ borderLeft: `4px solid ${stat.accentColor}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </span>
              <div className={`${stat.bg} ${stat.color} p-2.5 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
            <div className="font-display text-4xl font-extrabold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground">{stat.change}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <h2 className="font-display font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link key={action.to} to={action.to}>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all text-center group cursor-pointer">
                <div
                  className={`${action.iconBg} ${action.color} p-2.5 rounded-lg group-hover:scale-110 transition-transform`}
                >
                  {action.icon}
                </div>
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Candidates */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              Recent Candidates
            </h2>
            <Link to="/admin/candidates">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {sampleTeachers.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center gap-3 py-2 border-b border-border last:border-0"
              >
                <div
                  className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: "oklch(0.24 0.09 255 / 0.12)",
                    color: "oklch(0.24 0.09 255)",
                  }}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t.subjects.slice(0, 2).join(", ")} · {t.country}
                  </div>
                </div>
                <AvailabilityBadge status={t.availabilityStatus} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pipeline Activity */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              Pipeline Activity
            </h2>
            <Link to="/admin/pipeline">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Full pipeline <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {samplePipelineEntries.map((entry) => {
              const stageStyles: Record<string, { bg: string; color: string }> =
                {
                  Sourced: {
                    bg: "oklch(0.94 0.008 240)",
                    color: "oklch(0.40 0.02 240)",
                  },
                  Screening: {
                    bg: "oklch(0.78 0.17 65 / 0.15)",
                    color: "oklch(0.45 0.12 65)",
                  },
                  Interview: {
                    bg: "oklch(0.24 0.09 255 / 0.12)",
                    color: "oklch(0.24 0.09 255)",
                  },
                  Offer: {
                    bg: "oklch(0.5 0.2 295 / 0.12)",
                    color: "oklch(0.4 0.15 295)",
                  },
                  Placed: {
                    bg: "oklch(0.60 0.18 145 / 0.14)",
                    color: "oklch(0.35 0.14 145)",
                  },
                  Rejected: {
                    bg: "oklch(0.57 0.22 27 / 0.12)",
                    color: "oklch(0.45 0.18 27)",
                  },
                };
              const style = stageStyles[entry.stage] || stageStyles.Sourced;
              return (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {entry.candidateName}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {entry.jobTitle}
                    </div>
                  </div>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                    style={{ backgroundColor: style.bg, color: style.color }}
                  >
                    {entry.stage}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
