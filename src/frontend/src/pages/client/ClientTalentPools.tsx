import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Users } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import CandidateCard from "../../components/CandidateCard";
import {
  type SampleTalentPool,
  sampleTalentPools,
  sampleTeachers,
} from "../../sampleData";

export default function ClientTalentPools() {
  const [selectedPool, setSelectedPool] = useState<SampleTalentPool | null>(
    null,
  );
  const [poolSearch, setPoolSearch] = useState("");

  const getPoolCandidates = (pool: SampleTalentPool) => {
    try {
      const filters = JSON.parse(pool.filters);
      return sampleTeachers.filter((t) => {
        if (
          filters.subjects &&
          !filters.subjects.some((s: string) => t.subjects.includes(s))
        )
          return false;
        if (
          filters.grades &&
          !filters.grades.some((g: string) => t.grades.includes(g))
        )
          return false;
        if (
          filters.availabilityStatus &&
          t.availabilityStatus !== filters.availabilityStatus
        )
          return false;
        if (
          filters.certifications &&
          !filters.certifications.some((c: string) =>
            t.certifications.includes(c),
          )
        )
          return false;
        return t.profileVisible;
      });
    } catch {
      return [];
    }
  };

  const poolCandidates = selectedPool ? getPoolCandidates(selectedPool) : [];
  const filteredPoolCandidates = poolSearch
    ? poolCandidates.filter(
        (t) =>
          t.name.toLowerCase().includes(poolSearch.toLowerCase()) ||
          t.subjects.some((s) =>
            s.toLowerCase().includes(poolSearch.toLowerCase()),
          ),
      )
    : poolCandidates;

  if (selectedPool) {
    return (
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedPool(null);
              setPoolSearch("");
            }}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm underline"
          >
            ← Back to pools
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{selectedPool.icon}</span>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {selectedPool.name}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              {selectedPool.description}
            </p>
          </div>
          <div className="bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-lg text-sm shrink-0">
            {filteredPoolCandidates.length} candidates
          </div>
        </div>

        {/* Search within pool */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={poolSearch}
            onChange={(e) => setPoolSearch(e.target.value)}
            placeholder="Search within this pool..."
            className="pl-9"
          />
        </div>

        {filteredPoolCandidates.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border rounded-xl">
            <Users className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              No candidates match your search
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPoolCandidates.map((teacher, i) => (
              <CandidateCard
                key={teacher.id}
                teacher={teacher}
                index={i}
                onRequestContact={() => toast.success("Contact request sent!")}
                onViewProfile={() => toast("Profile preview coming soon")}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Talent Pools
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Pre-curated groups of qualified teachers by subject and availability
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sampleTalentPools.map((pool, i) => {
          const count = getPoolCandidates(pool).length;
          return (
            <motion.div
              key={pool.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedPool(pool)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{pool.icon}</div>
                <div className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  {count} candidates
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1">
                {pool.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {pool.description}
              </p>
              <div className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                Browse pool <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
