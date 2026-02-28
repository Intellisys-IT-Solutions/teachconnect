import { Briefcase, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { ApplicationStatusBadge } from "../../components/Badges";

const mockApplications = [
  {
    id: "a1",
    jobTitle: "Senior Mathematics Teacher",
    region: "Johannesburg North",
    country: "South Africa",
    schoolType: "Private Independent",
    status: "Shortlisted",
    appliedDate: "15 Jan 2025",
    notes:
      "Agency has reviewed your profile and shortlisted you for interview.",
  },
  {
    id: "a2",
    jobTitle: "Primary English Teacher",
    region: "Dubai",
    country: "United Arab Emirates",
    schoolType: "International School",
    status: "Pending",
    appliedDate: "18 Jan 2025",
    notes: "Your application is being reviewed by the agency.",
  },
  {
    id: "a3",
    jobTitle: "IB Computer Science Teacher",
    region: "Singapore",
    country: "Singapore",
    schoolType: "International Baccalaureate",
    status: "Rejected",
    appliedDate: "10 Jan 2025",
    notes:
      "Thank you for your application. This position has been filled by another candidate.",
  },
  {
    id: "a4",
    jobTitle: "Life Sciences Teacher",
    region: "Cape Town",
    country: "South Africa",
    schoolType: "Private Independent",
    status: "Pending",
    appliedDate: "20 Jan 2025",
    notes: "Your application has been received.",
  },
];

const statusOrder: Record<string, number> = {
  Shortlisted: 0,
  Pending: 1,
  Hired: 2,
  Rejected: 3,
};

export default function TeacherApplications() {
  const sorted = [...mockApplications].sort(
    (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            My Applications
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track the status of all your job applications
          </p>
        </div>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />{" "}
            {sorted.filter((a) => a.status === "Shortlisted").length}{" "}
            Shortlisted
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-yellow-500 inline-block" />{" "}
            {sorted.filter((a) => a.status === "Pending").length} Pending
          </span>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Briefcase className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-1">
            No applications yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Browse available positions and apply to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {app.jobTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {app.region}, {app.country}
                    </span>
                    <span>{app.schoolType}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Applied {app.appliedDate}
                    </span>
                  </div>
                </div>
                <ApplicationStatusBadge status={app.status} />
              </div>

              {/* Status note */}
              {app.notes && (
                <div
                  className={`p-3 rounded-lg text-xs ${
                    app.status === "Shortlisted"
                      ? "bg-blue-50 text-blue-800 border border-blue-200"
                      : app.status === "Rejected"
                        ? "bg-red-50 text-red-800 border border-red-200"
                        : "bg-muted/50 text-muted-foreground border border-border"
                  }`}
                >
                  {app.notes}
                </div>
              )}

              {/* Progress indicator */}
              <div className="mt-4 flex items-center gap-2">
                {[
                  "Applied",
                  "Under Review",
                  "Shortlisted",
                  "Interview",
                  "Decision",
                ].map((step, si) => {
                  const _stepMap: Record<string, number> = {
                    Applied: 0,
                    "Under Review": 1,
                    Shortlisted: 2,
                    Interview: 3,
                    Decision: 4,
                  };
                  const currentStep =
                    app.status === "Pending"
                      ? 1
                      : app.status === "Shortlisted"
                        ? 2
                        : app.status === "Hired"
                          ? 4
                          : 1;
                  const isActive = si <= currentStep;
                  const isCurrent = si === currentStep;
                  return (
                    <div key={step} className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full transition-colors ${
                          app.status === "Rejected" && si > 1
                            ? "bg-red-300"
                            : isCurrent
                              ? "bg-primary"
                              : isActive
                                ? "bg-primary/60"
                                : "bg-border"
                        }`}
                      />
                      <span
                        className={`text-xs hidden sm:block ${isCurrent ? "text-primary font-medium" : "text-muted-foreground"}`}
                      >
                        {step}
                      </span>
                      {si < 4 && (
                        <div
                          className={`flex-1 h-px w-4 ${isActive && si < currentStep ? "bg-primary/40" : "bg-border"}`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
