import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import CandidateCard from "../../components/CandidateCard";
import { CandidateCardSkeleton } from "../../components/LoadingSkeletons";
import { type SampleTeacher, sampleTeachers } from "../../sampleData";

const SUBJECTS = [
  "Mathematics",
  "English",
  "Life Sciences",
  "Biology",
  "Chemistry",
  "Physics",
  "Social Sciences",
  "History",
  "Geography",
  "Computer Science",
  "French",
  "Arabic",
  "Business Studies",
  "Economics",
  "Foundation Phase",
  "Physical Education",
];
const GRADES = [
  "Grade R",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];
const COUNTRIES = [
  "South Africa",
  "United Arab Emirates",
  "Singapore",
  "United Kingdom",
  "Germany",
  "France",
  "India",
];

interface SearchFilters {
  subjects: string[];
  grades: string[];
  minExperience: number;
  workPermitStatus: string;
  country: string;
  availability: string;
  employmentType: string;
  qualifications: string;
}

function computeMatchScore(
  teacher: SampleTeacher,
  filters: SearchFilters,
): number {
  let totalCriteria = 0;
  let matched = 0;

  if (filters.subjects.length > 0) {
    totalCriteria += filters.subjects.length;
    matched += filters.subjects.filter((s) =>
      teacher.subjects.includes(s),
    ).length;
  }
  if (filters.grades.length > 0) {
    totalCriteria += filters.grades.length;
    matched += filters.grades.filter((g) => teacher.grades.includes(g)).length;
  }
  if (filters.availability && filters.availability !== "all") {
    totalCriteria += 1;
    if (teacher.availabilityStatus === filters.availability) matched += 1;
  }
  if (filters.country && filters.country !== "all") {
    totalCriteria += 1;
    if (teacher.country === filters.country) matched += 1;
  }
  if (filters.minExperience > 0) {
    totalCriteria += 1;
    if (teacher.yearsExperience >= filters.minExperience) matched += 1;
  }
  if (filters.workPermitStatus && filters.workPermitStatus !== "all") {
    totalCriteria += 1;
    if (teacher.workPermitStatus === filters.workPermitStatus) matched += 1;
  }
  if (filters.employmentType && filters.employmentType !== "all") {
    totalCriteria += 1;
    if (teacher.employmentType === filters.employmentType) matched += 1;
  }

  if (totalCriteria === 0) return 100;
  return Math.round((matched / totalCriteria) * 100);
}

function matchesAllFilters(
  teacher: SampleTeacher,
  filters: SearchFilters,
): boolean {
  if (
    filters.subjects.length > 0 &&
    !filters.subjects.some((s) => teacher.subjects.includes(s))
  )
    return false;
  if (
    filters.grades.length > 0 &&
    !filters.grades.some((g) => teacher.grades.includes(g))
  )
    return false;
  if (
    filters.availability &&
    filters.availability !== "all" &&
    teacher.availabilityStatus !== filters.availability
  )
    return false;
  if (
    filters.country &&
    filters.country !== "all" &&
    teacher.country !== filters.country
  )
    return false;
  if (
    filters.minExperience > 0 &&
    teacher.yearsExperience < filters.minExperience
  )
    return false;
  if (
    filters.workPermitStatus &&
    filters.workPermitStatus !== "all" &&
    teacher.workPermitStatus !== filters.workPermitStatus
  )
    return false;
  if (
    filters.employmentType &&
    filters.employmentType !== "all" &&
    teacher.employmentType !== filters.employmentType
  )
    return false;
  if (!teacher.profileVisible) return false;
  return true;
}

const defaultFilters: SearchFilters = {
  subjects: [],
  grades: [],
  minExperience: 0,
  workPermitStatus: "all",
  country: "all",
  availability: "all",
  employmentType: "all",
  qualifications: "",
};

export default function ClientSearch() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const setFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: "subjects" | "grades", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setHasSearched(true);
  };

  const results = useMemo(() => {
    if (!hasSearched) return [];
    return sampleTeachers
      .filter((t) => matchesAllFilters(t, filters))
      .map((t) => ({ teacher: t, score: computeMatchScore(t, filters) }))
      .sort((a, b) => b.score - a.score);
  }, [filters, hasSearched]);

  const activeFilterCount = [
    filters.subjects.length > 0,
    filters.grades.length > 0,
    filters.availability !== "all",
    filters.country !== "all",
    filters.minExperience > 0,
    filters.workPermitStatus !== "all",
    filters.employmentType !== "all",
  ].filter(Boolean).length;

  const FiltersPanel = () => (
    <div className="space-y-5">
      {/* Subjects */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Subjects</Label>
        <div className="flex flex-wrap gap-1.5">
          {SUBJECTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleArrayFilter("subjects", s)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                filters.subjects.includes(s)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grades */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">Grade Levels</Label>
        <div className="flex flex-wrap gap-1.5">
          {GRADES.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => toggleArrayFilter("grades", g)}
              className={`px-2 py-1 rounded text-xs font-medium border transition-all ${
                filters.grades.includes(g)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Min Experience */}
      <div>
        <Label className="text-sm font-semibold mb-2 block">
          Min. Years Experience: {filters.minExperience}
        </Label>
        <Slider
          value={[filters.minExperience]}
          onValueChange={([v]) => setFilter("minExperience", v)}
          min={0}
          max={20}
          step={1}
          className="mt-2"
        />
      </div>

      {/* Availability */}
      <div>
        <Label className="text-sm font-semibold mb-1.5 block">
          Availability
        </Label>
        <Select
          value={filters.availability}
          onValueChange={(v) => setFilter("availability", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Status</SelectItem>
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="Interviewing">Interviewing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Country */}
      <div>
        <Label className="text-sm font-semibold mb-1.5 block">Country</Label>
        <Select
          value={filters.country}
          onValueChange={(v) => setFilter("country", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Country</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employment Type */}
      <div>
        <Label className="text-sm font-semibold mb-1.5 block">
          Employment Type
        </Label>
        <Select
          value={filters.employmentType}
          onValueChange={(v) => setFilter("employmentType", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Type</SelectItem>
            <SelectItem value="Full-Time">Full-Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Work Permit */}
      <div>
        <Label className="text-sm font-semibold mb-1.5 block">
          Work Permit Status
        </Label>
        <Select
          value={filters.workPermitStatus}
          onValueChange={(v) => setFilter("workPermitStatus", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Status</SelectItem>
            <SelectItem value="Citizen">Citizen</SelectItem>
            <SelectItem value="Permanent Resident">
              Permanent Resident
            </SelectItem>
            <SelectItem value="Work Permit Holder">
              Work Permit Holder
            </SelectItem>
            <SelectItem value="EU Citizen">EU Citizen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      {activeFilterCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setFilters(defaultFilters);
            setHasSearched(false);
          }}
          className="w-full gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" /> Reset All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Find Teachers
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Search our verified teacher database with advanced filters
        </p>
      </div>

      <div className="flex gap-6">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                    {activeFilterCount}
                  </span>
                )}
              </div>
            </div>
            <FiltersPanel />
            <Button
              onClick={handleSearch}
              className="w-full mt-4 gap-2 bg-primary text-primary-foreground"
            >
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile filter sheet */}
          <div className="lg:hidden mb-4 flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Search Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 pr-1">
                  <FiltersPanel />
                </div>
              </SheetContent>
            </Sheet>
            <Button
              onClick={handleSearch}
              className="flex-1 gap-2 bg-primary text-primary-foreground"
            >
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>

          {/* Results */}
          {!hasSearched && !loading ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <Search className="h-10 w-10 text-primary/30 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">
                Set your filters and search
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Select subjects, grades, and other criteria to find the perfect
                candidates
              </p>
              <Button onClick={handleSearch} className="mt-4 gap-2">
                <Search className="h-4 w-4" /> Show All Teachers
              </Button>
            </div>
          ) : loading ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CandidateCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16 bg-card border border-border rounded-xl">
              <Search className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">
                No matching teachers found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try broadening your search criteria
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters(defaultFilters)}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {results.length}
                  </span>{" "}
                  teachers found
                  {activeFilterCount > 0 && " (sorted by match score)"}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {results.map(({ teacher, score }, i) => (
                  <CandidateCard
                    key={teacher.id}
                    teacher={teacher}
                    matchScore={activeFilterCount > 0 ? score : undefined}
                    index={i}
                    onRequestContact={() =>
                      toast.success(
                        "Contact request sent! Our team will be in touch within 24 hours.",
                      )
                    }
                    onViewProfile={() => toast("Profile preview coming soon")}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
