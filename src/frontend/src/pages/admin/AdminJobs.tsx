import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { JobStatusBadge, TagChip } from "../../components/Badges";
import { sampleJobListings } from "../../sampleData";

export default function AdminJobs() {
  const [jobs, setJobs] = useState(sampleJobListings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = jobs.filter((j) => {
    const matchSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.country.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || j.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleClose = (id: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "Closed" as const } : j)),
    );
    toast.success("Listing closed");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            All Job Listings
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {filtered.length} listings across all schools
          </p>
        </div>
        <Button
          className="gap-2 bg-primary text-primary-foreground"
          onClick={() => toast("Create listing form coming soon")}
        >
          <Plus className="h-4 w-4" /> Create Listing
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings..."
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="Filled">Filled</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-card transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <JobStatusBadge status={job.status} />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.region}, {job.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5" />
                    {job.schoolType}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {Math.floor(Math.random() * 10) + 1} applicants
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {job.subjectsNeeded.map((s) => (
                    <TagChip key={s} label={s} />
                  ))}
                  {job.gradesNeeded.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 shrink-0"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => toast("View applicants coming soon")}
                  >
                    View Applicants
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toast("Edit listing coming soon")}
                  >
                    Edit Listing
                  </DropdownMenuItem>
                  {job.status === "Open" && (
                    <DropdownMenuItem
                      onClick={() => handleClose(job.id)}
                      className="text-destructive"
                    >
                      Close Listing
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
