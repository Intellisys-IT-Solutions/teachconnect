import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { BookmarkX, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CandidateCard from "../../components/CandidateCard";
import { sampleTeachers } from "../../sampleData";

export default function ClientShortlist() {
  // Mock shortlist: first 4 available teachers
  const [shortlisted, setShortlisted] = useState(
    sampleTeachers
      .filter((t) => t.availabilityStatus === "Available")
      .slice(0, 4),
  );
  const [search, setSearch] = useState("");

  const filtered = shortlisted.filter(
    (t) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(search.toLowerCase())),
  );

  const removeFromShortlist = (id: string) => {
    setShortlisted((prev) => prev.filter((t) => t.id !== id));
    toast.success("Removed from shortlist");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Shortlist
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          {shortlisted.length} candidates saved for review
        </p>
      </div>

      {shortlisted.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <BookmarkX className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
          <h3 className="font-semibold text-foreground mb-1">
            Your shortlist is empty
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Search for teachers and save candidates to review later
          </p>
          <Link to="/client/search">
            <Button className="gap-2">
              <Search className="h-4 w-4" /> Find Teachers
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search shortlist..."
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 text-xs"
              onClick={() => toast("Export coming soon")}
            >
              Export Shortlist
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((teacher, i) => (
              <div key={teacher.id} className="relative">
                <CandidateCard
                  teacher={teacher}
                  index={i}
                  onRequestContact={() =>
                    toast.success("Contact request sent!")
                  }
                  onViewProfile={() => toast("Profile preview coming soon")}
                />
                <button
                  type="button"
                  onClick={() => removeFromShortlist(teacher.id)}
                  className="absolute top-3 right-3 h-7 w-7 bg-white border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors shadow-xs"
                  aria-label="Remove from shortlist"
                >
                  <BookmarkX className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
