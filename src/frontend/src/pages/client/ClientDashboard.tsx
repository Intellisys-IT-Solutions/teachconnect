import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  FileText,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { AvailabilityBadge } from "../../components/Badges";
import { useGetCallerUserProfile } from "../../hooks/useQueries";
import { sampleJobListings, sampleTeachers } from "../../sampleData";

export default function ClientDashboard() {
  const { data: userProfile } = useGetCallerUserProfile();
  const availableTeachers = sampleTeachers.filter(
    (t) => t.availabilityStatus === "Available",
  ).length;

  const stats = [
    {
      label: "Active Job Requests",
      value: "2",
      icon: <FileText className="h-4 w-4" />,
      color: "text-primary",
      bg: "bg-primary/10",
      accentColor: "oklch(0.24 0.09 255)",
    },
    {
      label: "Available Teachers",
      value: availableTeachers.toString(),
      icon: <Users className="h-4 w-4" />,
      color: "text-emerald-700",
      bg: "bg-emerald-100",
      accentColor: "oklch(0.60 0.18 145)",
    },
    {
      label: "Shortlisted",
      value: "4",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-teal",
      bg: "bg-teal/10",
      accentColor: "oklch(0.65 0.18 195)",
    },
    {
      label: "Avg. Response Time",
      value: "24h",
      icon: <Clock className="h-4 w-4" />,
      color: "text-amber",
      bg: "bg-amber/10",
      accentColor: "oklch(0.78 0.17 65)",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome, {userProfile?.name?.split(" ")[0] || "School"} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Find and hire exceptional teachers for your institution.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/client/search">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-gradient-to-br from-primary/5 to-primary/12 border border-primary/20 rounded-xl p-5 hover:shadow-card-hover transition-all cursor-pointer group"
            style={{ borderTop: "4px solid oklch(0.24 0.09 255)" }}
          >
            <div className="bg-primary/10 text-primary rounded-lg p-2.5 w-fit mb-3 group-hover:bg-primary/15 transition-colors">
              <Search className="h-7 w-7" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Search Teachers
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Advanced filters by subject, grade, and location
            </p>
            <div className="flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all">
              Start searching <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>
        </Link>
        <Link to="/client/talent-pools">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-teal-light/40 to-accent/30 border border-teal/20 rounded-xl p-5 hover:shadow-card-hover transition-all cursor-pointer group"
            style={{ borderTop: "4px solid oklch(0.65 0.18 195)" }}
          >
            <div className="bg-teal/10 text-teal rounded-lg p-2.5 w-fit mb-3 group-hover:bg-teal/15 transition-colors">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Talent Pools
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Browse curated subject-specific teacher groups
            </p>
            <div
              className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
              style={{ color: "oklch(0.55 0.16 195)" }}
            >
              Browse pools <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>
        </Link>
        <Link to="/client/hire-request">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100/40 border border-purple-200 rounded-xl p-5 hover:shadow-card-hover transition-all cursor-pointer group"
            style={{ borderTop: "4px solid oklch(0.5 0.2 295)" }}
          >
            <div className="bg-purple-100 text-purple-700 rounded-lg p-2.5 w-fit mb-3 group-hover:bg-purple-200/70 transition-colors">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">
              Assign Agency
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Let us source and present the best candidates
            </p>
            <div className="flex items-center gap-1 text-xs text-purple-700 font-semibold group-hover:gap-2 transition-all">
              Submit request <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-card border border-border rounded-xl p-4 shadow-stat"
            style={{ borderLeft: `4px solid ${stat.accentColor}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">
                {stat.label}
              </span>
              <div className={`${stat.bg} ${stat.color} p-1.5 rounded-md`}>
                {stat.icon}
              </div>
            </div>
            <div className="font-display text-2xl font-extrabold text-foreground">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Available Teachers */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground">
            Recently Available Teachers
          </h2>
          <Link to="/client/search">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Search all <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {sampleTeachers
            .filter((t) => t.availabilityStatus === "Available")
            .slice(0, 5)
            .map((teacher) => {
              const displayName = `${teacher.name.split(" ")[0]} ${teacher.name.split(" ").slice(-1)[0][0]}.`;
              return (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-0 gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: "oklch(0.65 0.18 195 / 0.12)",
                        color: "oklch(0.35 0.14 195)",
                      }}
                    >
                      {teacher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {displayName}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {teacher.subjects.slice(0, 3).join(", ")} ·{" "}
                        {teacher.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <AvailabilityBadge status={teacher.availabilityStatus} />
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      {teacher.yearsExperience}y exp
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>

      {/* Active Job Listings */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-foreground">
            Your Active Listings
          </h2>
          <Link to="/client/jobs">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              Manage <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {sampleJobListings
            .filter((j) => j.status === "Open")
            .slice(0, 3)
            .map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {job.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {job.country} · {job.schoolType}
                  </div>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                  style={{
                    background: "oklch(0.60 0.18 145 / 0.12)",
                    color: "oklch(0.32 0.14 145)",
                    borderColor: "oklch(0.60 0.18 145 / 0.28)",
                  }}
                >
                  Open
                </span>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
