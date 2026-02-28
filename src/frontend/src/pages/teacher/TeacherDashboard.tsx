import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookmarkCheck,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Upload,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import {
  ApplicationStatusBadge,
  AvailabilityBadge,
} from "../../components/Badges";
import { useGetCallerUserProfile } from "../../hooks/useQueries";
import { sampleJobListings } from "../../sampleData";

const mockApplications = [
  {
    id: "a1",
    jobTitle: "Senior Mathematics Teacher",
    school: "Private Independent",
    status: "Shortlisted",
    date: "2 days ago",
  },
  {
    id: "a2",
    jobTitle: "Primary English Teacher",
    school: "International School",
    status: "Pending",
    date: "5 days ago",
  },
  {
    id: "a3",
    jobTitle: "IB Computer Science Teacher",
    school: "IB School",
    status: "Rejected",
    date: "1 week ago",
  },
];

export default function TeacherDashboard() {
  const { data: userProfile } = useGetCallerUserProfile();

  const profileCompletion = 65;

  const stats = [
    {
      label: "Applications Sent",
      value: "3",
      icon: <Briefcase className="h-4 w-4" />,
      color: "text-primary",
      bg: "bg-primary/10",
      accentColor: "oklch(0.24 0.09 255)",
    },
    {
      label: "Shortlisted",
      value: "1",
      icon: <CheckCircle className="h-4 w-4" />,
      color: "text-emerald-700",
      bg: "bg-emerald-100",
      accentColor: "oklch(0.60 0.18 145)",
    },
    {
      label: "Saved Jobs",
      value: "4",
      icon: <BookmarkCheck className="h-4 w-4" />,
      color: "text-teal",
      bg: "bg-teal/10",
      accentColor: "oklch(0.65 0.18 195)",
    },
    {
      label: "Profile Views",
      value: "12",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-purple-600",
      bg: "bg-purple-100",
      accentColor: "oklch(0.5 0.2 295)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Welcome back, {userProfile?.name?.split(" ")[0] || "Teacher"} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's what's happening with your profile and applications.
          </p>
        </div>
        <AvailabilityBadge status="Available" />
      </motion.div>

      {/* Profile completion */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-gradient-to-r from-primary/5 to-teal-light/50 border border-primary/20 rounded-xl p-5"
        style={{ borderLeft: "4px solid oklch(0.65 0.18 195)" }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-display font-semibold text-foreground">
              Profile Completion
            </div>
            <div className="text-sm text-muted-foreground mt-0.5">
              Complete your profile to appear in more searches
            </div>
          </div>
          <div
            className="font-display text-2xl font-extrabold"
            style={{ color: "oklch(0.65 0.18 195)" }}
          >
            {profileCompletion}%
          </div>
        </div>
        <Progress value={profileCompletion} className="h-2 mb-3" />
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { label: "Basic Info", done: true },
            { label: "Subjects & Grades", done: true },
            { label: "Qualifications", done: true },
            { label: "Upload CV", done: false },
            { label: "Employment History", done: false },
            { label: "References", done: false },
          ].map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs"
              style={
                item.done
                  ? {
                      background: "oklch(0.60 0.18 145 / 0.12)",
                      color: "oklch(0.32 0.14 145)",
                      borderColor: "oklch(0.60 0.18 145 / 0.28)",
                    }
                  : {
                      background: "oklch(0.94 0.008 240)",
                      color: "oklch(0.42 0.025 240)",
                      borderColor: "oklch(0.87 0.014 240)",
                    }
              }
            >
              {item.done ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {item.label}
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Link to="/teacher/profile">
            <Button
              size="sm"
              className="gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <User className="h-3.5 w-3.5" /> Complete Profile
            </Button>
          </Link>
          <Link to="/teacher/documents">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs hover:border-teal/40"
            >
              <Upload className="h-3.5 w-3.5" /> Upload Documents
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="bg-card border border-border rounded-xl p-4 shadow-stat"
            style={{ borderLeft: `4px solid ${stat.accentColor}` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              Recent Applications
            </h2>
            <Link to="/teacher/applications">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {mockApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
              >
                <div>
                  <div className="text-sm font-medium text-foreground truncate max-w-[200px]">
                    {app.jobTitle}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {app.school} · {app.date}
                  </div>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Suggested Jobs */}
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card border border-border rounded-xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              Open Positions
            </h2>
            <Link to="/teacher/jobs">
              <Button variant="ghost" size="sm" className="text-xs gap-1">
                Browse all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {sampleJobListings
              .filter((j) => j.status === "Open")
              .slice(0, 3)
              .map((job) => (
                <div
                  key={job.id}
                  className="flex items-start justify-between py-2.5 border-b border-border last:border-0 gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {job.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {job.country} · {job.schoolType}
                    </div>
                    {job.salaryRange && (
                      <div
                        className="text-xs font-semibold mt-0.5"
                        style={{ color: "oklch(0.35 0.14 195)" }}
                      >
                        {job.salaryRange}
                      </div>
                    )}
                  </div>
                  <Link to="/teacher/jobs">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs shrink-0 hover:border-teal/40 hover:text-teal"
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
