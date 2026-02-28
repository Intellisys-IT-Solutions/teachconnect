import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { sampleJobListings, samplePipelineEntries } from "../../sampleData";

const STAGES = [
  "Sourced",
  "Screening",
  "Interview",
  "Offer",
  "Placed",
  "Rejected",
] as const;
type Stage = (typeof STAGES)[number];

const stageColors: Record<
  Stage,
  { bg: string; border: string; badge: string }
> = {
  Sourced: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    badge: "bg-gray-100 text-gray-700",
  },
  Screening: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
  },
  Interview: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  Offer: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    badge: "bg-purple-100 text-purple-800",
  },
  Placed: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-800",
  },
  Rejected: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
  },
};

interface PipelineEntry {
  id: string;
  candidateId: string;
  jobId: string;
  stage: Stage;
  candidateName: string;
  jobTitle: string;
}

export default function AdminPipeline() {
  const [entries, setEntries] = useState<PipelineEntry[]>(
    samplePipelineEntries.map((e) => ({ ...e, stage: e.stage as Stage })),
  );
  const [jobFilter, setJobFilter] = useState("all");

  const filteredEntries =
    jobFilter === "all"
      ? entries
      : entries.filter((e) =>
          e.jobTitle.toLowerCase().includes(jobFilter.toLowerCase()),
        );

  const getEntriesForStage = (stage: Stage) =>
    filteredEntries.filter((e) => e.stage === stage);

  const moveToNextStage = (entry: PipelineEntry) => {
    const currentIdx = STAGES.indexOf(entry.stage);
    if (currentIdx < STAGES.length - 2) {
      // Don't auto-move to Rejected
      const nextStage = STAGES[currentIdx + 1];
      setEntries((prev) =>
        prev.map((e) => (e.id === entry.id ? { ...e, stage: nextStage } : e)),
      );
      toast.success(`${entry.candidateName} moved to ${nextStage}`);
    }
  };

  const moveToPrevStage = (entry: PipelineEntry) => {
    const currentIdx = STAGES.indexOf(entry.stage);
    if (currentIdx > 0 && entry.stage !== "Rejected") {
      const prevStage = STAGES[currentIdx - 1];
      setEntries((prev) =>
        prev.map((e) => (e.id === entry.id ? { ...e, stage: prevStage } : e)),
      );
      toast.success(`${entry.candidateName} moved to ${prevStage}`);
    }
  };

  const rejectEntry = (entry: PipelineEntry) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entry.id ? { ...e, stage: "Rejected" as Stage } : e,
      ),
    );
    toast.success(`${entry.candidateName} rejected`);
  };

  const uniqueJobs = Array.from(new Set(entries.map((e) => e.jobTitle)));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Recruitment Pipeline
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Track all candidates through the hiring process
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={jobFilter} onValueChange={setJobFilter}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filter by listing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Listings</SelectItem>
              {uniqueJobs.map((j) => (
                <SelectItem key={j} value={j}>
                  {j}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto scrollbar-thin pb-4">
        <div className="flex gap-4 min-w-max">
          {STAGES.map((stage) => {
            const stageEntries = getEntriesForStage(stage);
            const colors = stageColors[stage];
            return (
              <div key={stage} className="w-56 shrink-0">
                {/* Column Header */}
                <div
                  className={`${colors.badge} px-3 py-1.5 rounded-full text-xs font-semibold mb-3 flex items-center justify-between`}
                >
                  <span>{stage}</span>
                  <span className="font-bold">{stageEntries.length}</span>
                </div>
                {/* Cards */}
                <div className="space-y-2">
                  {stageEntries.map((entry, i) => (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`${colors.bg} border ${colors.border} rounded-lg p-3 shadow-xs`}
                    >
                      <div className="font-medium text-foreground text-sm mb-0.5">
                        {entry.candidateName}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {entry.jobTitle}
                      </div>
                      <div className="flex gap-1">
                        {stage !== "Sourced" &&
                          stage !== "Rejected" &&
                          stage !== "Placed" && (
                            <button
                              type="button"
                              onClick={() => moveToPrevStage(entry)}
                              className="flex-1 flex items-center justify-center gap-0.5 py-1 text-xs text-muted-foreground hover:text-foreground bg-white/60 hover:bg-white rounded border border-white/80 transition-colors"
                              title="Move back"
                            >
                              <ChevronLeft className="h-3 w-3" />
                            </button>
                          )}
                        {stage !== "Placed" && stage !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() => moveToNextStage(entry)}
                            className="flex-1 flex items-center justify-center gap-0.5 py-1 text-xs text-primary hover:text-primary/80 bg-white/60 hover:bg-white rounded border border-white/80 transition-colors font-medium"
                            title="Advance stage"
                          >
                            <ChevronRight className="h-3 w-3" /> Advance
                          </button>
                        )}
                        {stage !== "Rejected" && stage !== "Placed" && (
                          <button
                            type="button"
                            onClick={() => rejectEntry(entry)}
                            className="py-1 px-1.5 text-xs text-red-500 hover:text-red-700 bg-white/60 hover:bg-white rounded border border-white/80 transition-colors"
                            title="Reject"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {stageEntries.length === 0 && (
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-xs text-muted-foreground/60">
                      No candidates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
