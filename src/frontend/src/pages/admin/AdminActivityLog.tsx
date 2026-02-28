import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Briefcase,
  FileCheck,
  Search,
  User,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { TableRowSkeleton } from "../../components/LoadingSkeletons";
import { useGetActivityLogs } from "../../hooks/useQueries";

const mockLogs = [
  {
    id: "log1",
    actor: "Admin",
    action: "Verified document for candidate James Okonkwo",
    target: "James Okonkwo",
    timestamp: "28 Jan 2025, 14:32",
    type: "verification",
  },
  {
    id: "log2",
    actor: "School: Reddam House",
    action: "Submitted recruitment request for Mathematics teacher",
    target: "Job Request #R-2025-08",
    timestamp: "28 Jan 2025, 11:15",
    type: "request",
  },
  {
    id: "log3",
    actor: "Admin",
    action: "Moved Emma van der Berg to Offer stage",
    target: "Life Sciences Teacher listing",
    timestamp: "27 Jan 2025, 16:45",
    type: "pipeline",
  },
  {
    id: "log4",
    actor: "Teacher: Sarah Mitchell",
    action: "Applied for Senior Mathematics Teacher position",
    target: "Listing J-2025-001",
    timestamp: "27 Jan 2025, 09:22",
    type: "application",
  },
  {
    id: "log5",
    actor: "Admin",
    action: "Approved school account: Singapore American School",
    target: "Singapore American School",
    timestamp: "26 Jan 2025, 15:10",
    type: "approval",
  },
  {
    id: "log6",
    actor: "Teacher: Marcus Chen",
    action: "Updated profile availability to Available",
    target: "Teacher Profile",
    timestamp: "26 Jan 2025, 10:05",
    type: "profile",
  },
  {
    id: "log7",
    actor: "Admin",
    action: "Created talent pool: High School Mathematics",
    target: "Talent Pool",
    timestamp: "25 Jan 2025, 13:30",
    type: "pool",
  },
  {
    id: "log8",
    actor: "School: GEMS Wellington",
    action: "Shortlisted candidate Priya Nair",
    target: "Priya Nair",
    timestamp: "25 Jan 2025, 09:45",
    type: "shortlist",
  },
  {
    id: "log9",
    actor: "Admin",
    action: "Rejected application for IB Computer Science Teacher",
    target: "Application #A-2025-12",
    timestamp: "24 Jan 2025, 16:20",
    type: "rejection",
  },
  {
    id: "log10",
    actor: "Teacher: Thomas Müller",
    action: "Uploaded SAFE Certificate document",
    target: "Document Upload",
    timestamp: "24 Jan 2025, 08:55",
    type: "upload",
  },
];

const actionTypeIcons: Record<string, React.ReactNode> = {
  verification: <FileCheck className="h-4 w-4 text-green-600" />,
  request: <Briefcase className="h-4 w-4 text-purple-600" />,
  pipeline: <Activity className="h-4 w-4 text-blue-600" />,
  application: <FileCheck className="h-4 w-4 text-primary" />,
  approval: <Users className="h-4 w-4 text-green-600" />,
  profile: <User className="h-4 w-4 text-teal-600" />,
  pool: <Users className="h-4 w-4 text-orange-600" />,
  shortlist: <Users className="h-4 w-4 text-primary" />,
  rejection: <Activity className="h-4 w-4 text-red-500" />,
  upload: <FileCheck className="h-4 w-4 text-muted-foreground" />,
};

export default function AdminActivityLog() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const { isLoading } = useGetActivityLogs();

  const filtered = mockLogs.filter((log) => {
    const matchSearch =
      !search ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.actor.toLowerCase().includes(search.toLowerCase()) ||
      log.target.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || log.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Activity Log
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Full audit trail of all platform activity
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search logs..."
            className="pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="verification">Document Verification</SelectItem>
            <SelectItem value="application">Applications</SelectItem>
            <SelectItem value="pipeline">Pipeline Changes</SelectItem>
            <SelectItem value="approval">Approvals</SelectItem>
            <SelectItem value="upload">File Uploads</SelectItem>
            <SelectItem value="request">Job Requests</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Log Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                Action
              </th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden md:table-cell">
                Actor
              </th>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide hidden lg:table-cell">
                Target
              </th>
              <th className="text-right px-4 py-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading
              ? [1, 2, 3, 4, 5].map((i) => (
                  <TableRowSkeleton key={i} cols={4} />
                ))
              : filtered.map((log, i) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2.5">
                        <div className="shrink-0 mt-0.5">
                          {actionTypeIcons[log.type] || (
                            <Activity className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <span className="text-foreground leading-snug">
                          {log.action}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground whitespace-nowrap">
                      {log.actor}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">
                      {log.target}
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground whitespace-nowrap">
                      {log.timestamp}
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No activity logs match your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
