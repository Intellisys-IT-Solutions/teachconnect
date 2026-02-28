import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bookmark,
  Building2,
  DollarSign,
  MapPin,
  Search,
  Send,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { JobStatusBadge, TagChip } from "../../components/Badges";
import { JobCardSkeleton } from "../../components/LoadingSkeletons";
import { useGetJobListings } from "../../hooks/useQueries";
import { type SampleJobListing, sampleJobListings } from "../../sampleData";

export default function TeacherJobs() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const { data: backendJobs, isLoading } = useGetJobListings();

  const allJobs = [
    ...sampleJobListings,
    ...(backendJobs || []).map((j) => ({
      id: j.id.toString(),
      title: j.title,
      region: j.region,
      country: j.country,
      schoolType: j.schoolType,
      roleOverview: j.roleOverview,
      subjectsNeeded: j.subjectsNeeded,
      gradesNeeded: j.gradesNeeded,
      status: j.status as "Open" | "Filled" | "Closed",
    })),
  ];

  const countries = Array.from(new Set(allJobs.map((j) => j.country)));
  const allSubjects = Array.from(
    new Set(allJobs.flatMap((j) => j.subjectsNeeded)),
  );

  const filtered = allJobs.filter((job) => {
    const matchSearch =
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.roleOverview.toLowerCase().includes(search.toLowerCase()) ||
      job.subjectsNeeded.some((s) =>
        s.toLowerCase().includes(search.toLowerCase()),
      );
    const matchCountry =
      countryFilter === "all" || job.country === countryFilter;
    const matchSubject =
      subjectFilter === "all" || job.subjectsNeeded.includes(subjectFilter);
    return matchSearch && matchCountry && matchSubject;
  });

  const handleSave = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
    toast.success(
      savedJobs.includes(jobId) ? "Job removed from saved" : "Job saved!",
    );
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    if (appliedJobs.includes(jobId)) return;
    setAppliedJobs((prev) => [...prev, jobId]);
    toast.success(`Application submitted for "${jobTitle}"`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Browse Jobs
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          {filtered.length} positions available across {countries.length}{" "}
          countries
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, subject..."
              className="pl-9"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {allSubjects.slice(0, 20).map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-1">
            No positions found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCountryFilter("all");
              setSubjectFilter("all");
            }}
            className="mt-4"
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((job, i) => (
            <JobCard
              key={job.id}
              job={job}
              index={i}
              isSaved={savedJobs.includes(job.id)}
              isApplied={appliedJobs.includes(job.id)}
              onSave={() => handleSave(job.id)}
              onApply={() => handleApply(job.id, job.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface JobCardProps {
  job: SampleJobListing;
  index: number;
  isSaved: boolean;
  isApplied: boolean;
  onSave: () => void;
  onApply: () => void;
}

function JobCard({
  job,
  index,
  isSaved,
  isApplied,
  onSave,
  onApply,
}: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl p-5 hover:shadow-card-hover transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground leading-tight">
            {job.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {job.region}, {job.country}
          </div>
        </div>
        <JobStatusBadge status={job.status} />
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          {job.schoolType}
        </div>
        {job.salaryRange && (
          <div className="flex items-center gap-1 text-primary font-medium">
            <DollarSign className="h-3.5 w-3.5" />
            {job.salaryRange}
          </div>
        )}
      </div>

      {/* Role overview */}
      <p
        className={`text-sm text-muted-foreground mb-3 leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}
      >
        {job.roleOverview}
      </p>
      {job.roleOverview.length > 120 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-primary hover:underline mb-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
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
        {job.gradesNeeded.length > 3 && (
          <span className="text-xs text-muted-foreground self-center">
            +{job.gradesNeeded.length - 3}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={onSave}
          className={`gap-1.5 text-xs ${isSaved ? "border-primary text-primary" : ""}`}
        >
          <Bookmark
            className={`h-3.5 w-3.5 ${isSaved ? "fill-primary" : ""}`}
          />
          {isSaved ? "Saved" : "Save"}
        </Button>
        <Button
          size="sm"
          onClick={onApply}
          disabled={isApplied || job.status !== "Open"}
          className="flex-1 gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="h-3.5 w-3.5" />
          {isApplied
            ? "Applied ✓"
            : job.status === "Open"
              ? "Apply Now"
              : "Position Filled"}
        </Button>
      </div>
    </motion.div>
  );
}
